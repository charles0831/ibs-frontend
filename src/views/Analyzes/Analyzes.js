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
import { SingleSelect, MultiSelect, SortTable, RowFilter } from './components'
import scenarios from '../../apis/scenarios';
import analyzes from '../../apis/analyze';

const Analyzes = props => {
  const [progressStatus, setProgressStatus] = useState(false);
  const [sortOption, setSortOption] = useState({ sortBy: 0, sortOrder: "asc" });
  const [countList, setCountList] = useState([25, 50, 100]);
  const [selectedCount, setSelectedCount] = useState(25);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedChartType, setSelectedChartType] = useState(0);
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [chartTypeList, setChartTypeList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const { history } = props;
  const theme = useTheme();
  const { addToast } = useToasts()
  const classes = useStyles(theme);


  useEffect(() => {
    setProgressStatus(true);
    scenarios
      .getSelectionData()
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          setChartTypeList(response.data.chart_type);
          setSectionList(response.data.sections);
          setCategoryList(response.data.categories);
          handleSearch();
        }
    })
  }, []);

  useEffect(() => {
    handleSearch();
  }, [sortOption, page]);

  useEffect(() => {
    handleSearch();
    setPage(1);
  }, [selectedCount, selectedCategory, selectedChartType, selectedSection]);

  const handleSearch = () => {
    analyzes
      .getAnalyzeByOption(sortOption.sortBy, sortOption.sortOrder, selectedCount, page, searchKey, selectedChartType, selectedSection, selectedCategory)
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          if (response.code === 200) {
            setData(response.data.analyzes);
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

  const handleForecastingModule = () => {
    history.push('/forecasting_module');
  }

  const handleSelectedChartType = (id) => {
    setSelectedChartType(id);
  }

  const handleSelectedSection = (id) => {
    setSelectedSection(id);
  }

  const handleSelectedCategory = (id) => {
    setSelectedCategory(id);
  }

  const handleDelete = (index) => {
    analyzes
      .delete(index)
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          if (response.code === 200) {
            addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true});
            handleSearch();
            setPage(1);
          }
        }
      })
  }

  return (
    <>
      <div className={classes.public}>
        <Grid container spacing={3}>
          <Grid item md={3} sm={5} xs={12} >
            <Button variant="contained" color="secondary" className={classes.btnCreate} onClick={handleForecastingModule}>
              Nowa analiza
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.filterBlock}>
              <Grid container spacing={2} className={classes.mainContainer}>
                <Grid item xs={12}>
                  <div className={classes.mainHeader}>
                    Filtruj wyniki
                  </div>
                </Grid>
                <Grid item md={4} xs={12}>
                  <div className={classes.titleHeader}>
                    Wybierz typ wykresu
                  </div>
                  <SingleSelect value={selectedChartType} handleChange={handleSelectedChartType} list={chartTypeList}/>
                </Grid>
                <Grid item md={4} xs={12}>
                  <div className={classes.titleHeader}>
                    Wybierz przekrój
                  </div>
                  <SingleSelect value={selectedSection} handleChange={handleSelectedSection} list={sectionList}/>
                </Grid>
                <Grid item md={4} xs={12}>
                  <div className={classes.titleHeader}>
                    Wybierz kategorie
                  </div>
                  <MultiSelect value={selectedCategory} handleChange={handleSelectedCategory} list={categoryList}/>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.normalBlock}>
              <Grid container spacing={3}>
                <Grid item md={5} xs={12}>
                  <div className={classes.rowsBlock}>
                    <div>Pokaż:</div>
                    <div className={classes.rowsContainer}>
                      <RowFilter value={selectedCount} handleChange={setSelectedCount} list={countList} />
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
                categoryList={categoryList}
                handleDelete={handleDelete}
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

export default Analyzes;
