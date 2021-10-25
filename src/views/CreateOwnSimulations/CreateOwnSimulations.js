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
import { useToasts } from 'react-toast-notifications'
import clsx from 'clsx';
import 'react-tabs/style/react-tabs.css';

import series from '../../apis/series-labels';
const CreateOwnSimulations = props => {
  const seriesLabelId = [
    {
      id_type_key: 'Scenariusz wzrostu PKB',
      title: 'Tempo wzrostu PKB',
      description: 'Wprowadzanie wartości dla tempa wzrostu PKB'
    },
    {
      id_type_key: 'Scenariusz popytu zagranicznego',
      title: 'Popyt zagraniczny',
      description: 'Wprowadzanie wartości dla popyt zagraniczny'
    },
    {
      id_type_key: 'Scenariusz konsumpcji publicznej',
      title: 'Wielkść konsumpcji publicznej',
      description: 'Wprowadzanie wartości dla wielkość konsumpcji publicznej'
    },
    {
      id_type_key: 'Rozrodczość całkowita',
      title: 'Dzietność',
      description: 'Wprowadzanie wartości dla dzietność'
    },
    {
      id_type_key: 'Migracje całkowite',
      title: 'Saldo Migracji',
      description: 'Wprowadzanie wartości dla saldo Migracji'
    }
  ];
  const [progressStatus, setProgressStatus] = useState(false);
  const [scenariosName, setScenariosName] = useState('');
  const [valueFrom, setValueFrom] = useState('0');
  const [valueTo, setValueTo] = useState('0');
  const [selectedSeriesId, setSelectedSeriesId] = useState(-1);
  const [seriesValue, setSeriesValue] = useState('');
  const [disableStatus, setDisableStatus] = useState(true);
  const [ctrlDown, setCtrlDown] = useState(false);
  const { history } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const { addToast } = useToasts()
  useEffect(() => {
    let array = [];

    for (let i = 0; i < 30; i++) {
      array.push(String(''));
    }
    setSeriesValue(JSON.stringify(array));
  }, []);

  const handleScenariosNameChange = (e) => {
    setScenariosName(e.target.value);
  }

  const handleCreateScenario = (e) => {
    setProgressStatus(true);
    series
    .createSeries(seriesLabelId[selectedSeriesId].id_type_key, scenariosName, 'my_unique_variable', 1, JSON.parse(seriesValue))
    .then(response => {
      setProgressStatus(false);
      if (response.code === 401) {
        history.push('/login');
      } else {
        if (response.code === 200) {
          addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true});
          setTimeout(function(){history.push('/own_simulations');}, 1000);
        } else {
          addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true});
        }
      }
    })

  }

  const handleChangeSeriesValue = (e, index) => {
    let arr = JSON.parse(seriesValue);
    if (!isNaN(e.target.value)) {
      arr[index] = e.target.value;
      setSeriesValue(JSON.stringify(arr));
    }

    for (let i = 0; i < 30; i ++) {
      if (arr[i].length === 0) {
        setDisableStatus(true);
        return;
      }
    }
    setDisableStatus(false);
  }

  const handleChangeValueFrom = (e) => {
    if (isNaN(e.target.value)) {
    } else {
      setValueFrom(e.target.value);
    }
  }
  
  const handleChangeValueTo = (e) => {
    if (isNaN(e.target.value)) {
    } else {
      setValueTo(e.target.value);
    }
  }

  const handleSyncValue = () => {
    let diff = (valueTo - valueFrom) / 29;
    let array = JSON.parse(seriesValue);
    array[0] = valueFrom;
    array[29] = valueTo;
    for (let i = 0; i < 29; i ++) {
      let value = parseFloat(array[i]) + diff;

      array[i + 1] = value.toString();
    }
    setSeriesValue(JSON.stringify(array));
    setDisableStatus(false);
  }

  const handleChangeSelectedId = (index) => {
    setSelectedSeriesId(index);
    setValueFrom('0');
    setValueTo('0');
    let array = new Array(30);
    for (let i = 0; i <= 29; i ++) {
      array[i] = '';
    }
    setSeriesValue(JSON.stringify(array));
  }

  const handleKeydown = (e) => {
    if (e.keyCode === 17 || e.keyCode === 91) {
      setCtrlDown(true);
    }
    else {
      if (ctrlDown && e.keyCode === 86) {
        navigator.clipboard.readText()
        .then(
          response => {
            var rows = response.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r|\t))+[^"]+)"/mg, function (match, p1) {
              return p1
                  .replace(/""/g, '"')
                  .replace(/\r\n|\n\r|\n|\r|\t/g, ' ');
            })
          .split(/\r\n|\n\r|\n|\r|\t/g);
          let array = JSON.parse(seriesValue);
          let i = 0;
          for(i = 0; i < rows.length; i ++) {
            if (i === 30)
              break;
            if (!isNaN(rows[i])) {
              array[i] = rows[i];
            }
          }
          if (rows.length < 30)
          for (let j = i - 1; j < 30; j ++) {
            array[j] = 0;
          }
          setSeriesValue(JSON.stringify(array));
          for (let i = 0; i < 30; i ++) {
            if (array[i].length === 0) {
              setDisableStatus(true);
              return;
            }
          }
          setDisableStatus(false);
          });
      }
      setCtrlDown(false);
    }
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 17 || e.keyCode === 91) {
      setCtrlDown(false);
    }
  }

  return (
    <>
      <div className={classes.public}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.headerBlock}>
              <Grid item xs={12}>
                <div className={classes.subHeader}>
                  Stwórz wybrany scenariusz dla własnej zmiennej
                </div>
              </Grid>
              <Grid item lg={6} md={9} sm={12}>
                <input className={clsx({
                  [classes.input_box]: true,
                  [classes.headerMargin]: true
                })} type="text" value={scenariosName} name="scenariosName" placeholder="Wprowadź nazwę scenariusza"
                  onChange={handleScenariosNameChange} autocomplete='off' />
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
                {seriesLabelId.map((item, index) => (
                  <div item className={classes.itemBlock}>
                    <div
                      key={index}
                      className={clsx({
                        [classes.itemBlock]: true,
                        [classes.seriesLabelItem]: true,
                        [classes.seriesLabelItemActive]: index === selectedSeriesId
                      })}
                      onClick={() => handleChangeSelectedId(index)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Grid>
          {
            selectedSeriesId >= 0
              ?
              <Grid item xs={12}>
                <Card className={classes.normalBlock}>
                  <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                      Wprowadź wartość roku 2020:
                      <input className={classes.input_box} type="text" value={valueFrom} name="valueFrom" placeholder="Wpisz wartość"
                        onChange={handleChangeValueFrom} autocomplete='off' />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      Wprowadź wartość roku 2050:
                      <input className={classes.input_box} type="text" value={valueTo} name="valueTo" placeholder="Wpisz wartość"
                        onChange={handleChangeValueTo} autocomplete='off' />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <div className={classes.approveBlock}>
                        <Button variant="contained" color="secondary" className={classes.btnSimulate} onClick={handleSyncValue}>
                          Zatwierdź
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <div className={classes.scenariosDescription}>
                        {seriesLabelId[selectedSeriesId].description}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>

                        <div className={classes.seriesTotalBlock}>
                          <div className={clsx({ [classes.firstBlock]: true })}>
                            <div className={classes.headerLabel}>
                              2021
                              </div>
                            <div>
                              <input className={clsx({ [classes.input_box]: true, [classes.input_box_black]: true })} type="text" value={JSON.parse(seriesValue)[0]} name="valueFrom"
                                onChange={(e) => handleChangeSeriesValue(e, 0)} autocomplete='off'  onKeyDown={handleKeydown} onKeyUp={handleKeyUp}/>
                            </div>
                          </div>
                          <div className={classes.overflowBlock}>
                            <div className={classes.seriesBlock}>
                              {
                                JSON.parse(seriesValue).map((item, index) => (
                                  index < 28 ?
                                  <div className={clsx({ [classes.mediumBlock]: true, [classes.inputBlock]: index != 0 })}>
                                    <div className={classes.whiteHeaderLabel}>
                                      {index + 2022}
                                    </div>
                                    <div>
                                      <input className={clsx({ [classes.input_box]: true, [classes.scroll_margin]: true })} type="text" value={JSON.parse(seriesValue)[index + 1]} name="valueFrom"
                                        onChange={(e) => handleChangeSeriesValue(e, index + 1)} autocomplete='off' onKeyDown={handleKeydown} onKeyUp={handleKeyUp}/>
                                    </div>
                                  </div>
                                  :
                                  <></>
                                ))
                              }
                            </div>
                          </div>
                          <div className={clsx({ [classes.lastBlock]: true, [classes.inputBlock]: true })}>
                            <div className={classes.headerLabel}>
                              2050
                              </div>
                            <div>
                              <input className={clsx({ [classes.input_box]: true, [classes.input_box_black]: true })} type="text" value={JSON.parse(seriesValue)[29]} name="valueFrom"
                                onChange={(e) => handleChangeSeriesValue(e, 29)} autocomplete='off' onKeyDown={handleKeydown} onKeyUp={handleKeyUp}/>
                            </div>
                          </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              :
              <></>
          }
        </Grid>
        <div className={classes.controlBlock}>
          <Button variant="contained" color="secondary" className={clsx(classes.btnCreate, classes.btn)} onClick={handleCreateScenario} disabled={disableStatus || !scenariosName || scenariosName.length === 0}>
            Zapisz scenariusz
          </Button>
        </div>
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

export default CreateOwnSimulations;
