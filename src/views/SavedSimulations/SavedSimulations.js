import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useStyles from './style';
import {
  CircularProgress,
  Grid,
  Card,
  Button,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import { useToasts } from 'react-toast-notifications'
import { SingleSelect, SortTable } from './components'
import scenarios from '../../apis/scenarios';

const SavedSimulations = props => {
  const [progressStatus, setProgressStatus] = useState(false);
  const [sortOption, setSortOption] = useState({ sortBy: 0, sortOrder: "asc" });
  const [countList, setCountList] = useState([25, 50, 100]);
  const [selectedCount, setSelectedCount] = useState(25);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const { history } = props;
  const theme = useTheme();
  const { addToast } = useToasts()
  const classes = useStyles(theme);


  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [sortOption, page]);

  useEffect(() => {
    handleSearch();
    setPage(1);
  }, [selectedCount]);
  const handleSearch = () => {
    scenarios
      .getScenariosByOption(sortOption.sortBy, sortOption.sortOrder, selectedCount, page, searchKey)
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          if (response.code === 200) {
            setData(response.data.scenarios_labels);
            setTotal(response.data.count);
          }
        }
      })
  }

  const requestSort = (pSortBy) => {
    var sortOrder = "asc";
    if (pSortBy === sortOption.sortBy) {
      sortOrder = (sortOption.sortOrder === "asc" ? "desc" : "asc");
    }
    setSortOption({ sortBy: pSortBy, sortOrder: sortOrder })
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSearch();
      setPage(1);
    }
  }

  const handleCreateSimulation = () => {
    history.push('/own_simulations');
  }

  return (
    <>
      <div className={classes.public}>
        <Grid container spacing={3}>
          <Grid item xs={5} md={3} lg={2} >
            <Button variant="contained" color="secondary" className={classes.btnCreate} onClick={handleCreateSimulation}>
              Nowa symulacja
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.normalBlock}>
              <Grid container spacing={3}>
                <Grid item md={5} xs={12}>
                  <div className={classes.rowsBlock}>
                    <div>Pokaż:</div>
                    <div className={classes.rowsContainer}>
                      <SingleSelect value={selectedCount} handleChange={setSelectedCount} list={countList} />
                    </div>
                    <div>pozycji</div>
                  </div>
                </Grid>
                <Grid item md={7} xs={12}>
                  <div className={classes.searchBlock}>
                    <div className={classes.first_block}>Wyszukaj:</div>
                    <input className={classes.input_box} type="text" value={searchKey} name="search_key"
                      onChange={(e) => setSearchKey(e.target.value)} autocomplete='off' onKeyPress={handleKeyPress}/>
                    <div className={classes.refresh_btn} onClick={handleSearch}>Odśwież</div>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <SortTable
                rows={data}
                requestSort={requestSort}
                sortOrder={sortOption.sortOrder}
                sortBy={sortOption.sortBy}
                total={total}
                page={page}
                selectedCount={selectedCount}
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Pagination 
              count={ total%selectedCount == 0 ? total / selectedCount : Math.floor(total / selectedCount) + 1} 
              onChange={(e, page) => {setPage(page)}} 
              page={page} 
              showFirstButton 
              showLastButton />
          </Grid>
        </Grid>
      </div>
      {
        progressStatus ?
          <>
            <div className={classes.progressContainer}>
              <CircularProgress className={classes.progress} />
            </div>
          </>
          :
          <></>
      }
    </>
  );
};

export default SavedSimulations;
