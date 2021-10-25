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

import 'react-tabs/style/react-tabs.css';
import { useToasts } from 'react-toast-notifications'
import { SimulationModal, SingleSelect } from './components'
import series_labels from '../../apis/series-labels';
import scenarios from '../../apis/scenarios';

const OwnSimulations = props => {

  const [progressStatus, setProgressStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [simulation, setSimulation] = useState('');
  const [gdpRate, setGdpRate] = useState({});
  const [foreignDemand, setForeignDemand] = useState({});
  const [publicConsumption, setPublicConsumption] = useState({});
  const [fertility, setFertility] = useState({});
  const [migrateBalance, setMigrateBalance] = useState({});

  const [gdpList, setGdpList] = useState([]);
  const [foreignDemandList, setForeignDemandList] = useState([]);
  const [publicConsumptionList, setPublicConsumptionList] = useState([]);
  const [fertilityList, setFertilityList] = useState([]);
  const [migrateBalanceList, setMigrateBalanceList] = useState([]);

  const { history } = props;
  const theme = useTheme();
  const { addToast } = useToasts()
  const classes = useStyles(theme);

  useEffect(() => {
    setProgressStatus(true);
    series_labels
      .getSeriesLabels()
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          setGdpList(response.data.gdp_growth_rate);
          setForeignDemandList(response.data.foreign_demand);
          setPublicConsumptionList(response.data.public_consumption);
          setFertilityList(response.data.fertility);
          setMigrateBalanceList(response.data.balance_migration);
        }
      })
  }, []);

  const handleSimulationChange = (e) => {
    setSimulation(e.target.value);
  }

  const handleCreate = () => {
    history.push('/own_simulations/create');
  }

  const handleCreateScenario = () => {
    if (!simulation || simulation.length === 0)
      addToast("Nazwa symulacji musi zostać wprowadzona", { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true});
    else {
      setProgressStatus(true);
      let arr = [];
      [gdpList, foreignDemandList, publicConsumptionList, fertilityList, migrateBalanceList].forEach((item, index) => {
        item.forEach((item, index) => {
          if (item.description === gdpRate || item.description === foreignDemand || item.description === publicConsumption || item.description === fertility || item.description === migrateBalance)
          arr.push(item.id_series)
        })
      })
      scenarios
        .createScenario(0, simulation, 2019, 2050, arr)
        .then(response => {
          setProgressStatus(false);
          if (response.code === 401) {
            history.push('/login');
          } else {
            if (response.code === 200) {
              addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true});
              setTimeout(function(){history.push('/saved_simulations');}, 1000);
            } else {
              addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true});
            }
          }
        })
    }
    
  }
  
  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  // function getDisabledStatus() {
  //   return 
  // }

  return (
    <>
      <div className={classes.public}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.headerBlock}>
              <Grid item xs={12}>
                <div className={classes.subHeader}>
                  Stwórz własną symulację
              </div>
              </Grid>
              <Grid item lg={6} md={9} sm={12}>
                <input className={classes.input_box} type="text" value={simulation} name="simulation" placeholder="Wprowadź nazwę symulacji"
                  onChange={handleSimulationChange} autocomplete='off' />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.normalBlock}>
              <Grid item xs={12}>
                <div className={classes.subHeader}>
                  Wybierz wartość dla każdej ze scenariuszowych zmiennych egzogenicznych
                </div>
              </Grid>
              <div className={classes.flexBlock}>
                <div item className={classes.itemBlock}>
                  <div className={classes.selectTitle}>Tempo wzrostu PKB </div>
                  <div className={classes.singleSelect}>
                    <SingleSelect value={gdpRate} handleChange={setGdpRate} list={gdpList} />
                  </div>
                </div>
                <div item className={classes.itemBlock}>
                  <div className={classes.selectTitle}>Popyt zagraniczny</div>
                  <div className={classes.singleSelect}>
                    <SingleSelect value={foreignDemand} handleChange={setForeignDemand} list={foreignDemandList} />
                  </div>
                </div>
                <div item className={classes.itemBlock}>
                  <div className={classes.selectTitle}>Wielkość konsumpcji publicznej</div>
                  <div className={classes.singleSelect}>
                    <SingleSelect value={publicConsumption} handleChange={setPublicConsumption} list={publicConsumptionList} />
                  </div>
                </div>
                <div item className={classes.itemBlock}>
                  <div className={classes.selectTitle}>Dzietność</div>
                  <div className={classes.singleSelect}>
                    <SingleSelect value={fertility} handleChange={setFertility} list={fertilityList} />
                  </div>
                </div>
                <div item className={classes.itemBlock}>
                  <div className={classes.selectTitle}>Saldo migracji</div>
                  <div className={classes.singleSelect}>
                    <SingleSelect value={migrateBalance} handleChange={setMigrateBalance} list={migrateBalanceList} />
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
        <div className={classes.controlBlock}>
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <Button variant="contained" color="secondary" className={classes.btnCreate} onClick={handleCreate}>
                Stwórz wybrany scenariusz dla własnej zmiennej
              </Button>
            </Grid>
            <Grid item md={1} xs={0}></Grid>
            <Grid item md={4} xs={12}>
              <Button variant="contained" color="secondary" className={classes.btnSee} onClick={handleOpenModal}>
                Zobacz wartości liczbowe dla wariantów
              </Button>
            </Grid>
            <Grid item md={3} xs={12}>
              <Button 
                variant="contained" 
                color="secondary" 
                className={classes.btnSimulate} 
                disabled={
                  (Object.keys(gdpRate).length === 0 && gdpRate.constructor === Object )
                  || (Object.keys(foreignDemand).length === 0 && foreignDemand.constructor === Object )
                  || (Object.keys(publicConsumption).length === 0 && publicConsumption.constructor === Object )
                  || (Object.keys(fertility).length === 0 && fertility.constructor === Object )
                  || (Object.keys(migrateBalance).length === 0 && migrateBalance.constructor === Object )
                }
                onClick={handleCreateScenario}
              >
                Uruchom symulację
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <SimulationModal handleClose={handleClose} openModal={openModal}/>
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

export default OwnSimulations;
