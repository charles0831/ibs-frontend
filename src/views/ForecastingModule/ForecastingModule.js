import React, { useEffect, useState } from 'react';
import { Grid, TextField, Card, Button, CircularProgress, Tooltip } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications'
import { Autocomplete } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import scenarios from '../../apis/scenarios';

const ForecastingModule = (props) => {
  const classes = useStyles();
  const tooltip_list = [
    'Podstawowy scenariusz wykorzystujący bazowe wartości wszystkich zmiennych egzogenicznych (zob. Raport metodologiczny w zakładce Pomoc)',
    'Scenariusz zakładający tempo wzrostu ogólnej produktywności wyższe o 0,25 p.p. rocznie niż w scenariuszu bazowym, tempo wzrostu popytu zagranicznego wyższe o 0,1 p.p. oraz udział konsumpcji publicznej w PKB wyższy o 1 p.p.',
    'Scenariusz zakładający współczynnik dzietności (TFR) niższy niż w scenariuszu bazowym. Różnica wynosi od 0,15 (początek prognozy) do 0,30 (rok 2050).',
    'Scenariusz zakładający tempo wzrostu ogólnej produktywności wyższe o 0,25 p.p. rocznie niż w scenariuszu bazowym.',
    'Scenariusz zakładający tempo wzrostu ogólnej produktywności niższe o 0,25 p.p. rocznie niż w scenariuszu bazowym.',
    'Scenariusz zakładający dwukrotnie większy napływ imigrantów niż w scenariuszu bazowym.',
    'Scenariusz zakładający dwukrotnie mniejszy napływ imigrantów niż w scenariuszu bazowym.'
  ];
  const { addToast } = useToasts()
  const { history } = props;
  const [progressStatus, setProgressStatus] = useState(false);
  const [scenariosLabels, setScenariosLabels] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const handleShowResult = () => {
    if (Object.keys(selectedItem).length === 0 && selectedItem.constructor === Object) {
      addToast('Proszę wybrać scenariusz.', { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
    } else {
      history.push({
        pathname: '/forecasting_module/simulation_info',
        state: {item: selectedItem}});
    }
  }

  const handleCreateSimulation = () => {
    history.push('/own_simulations');
  }

  useEffect(() => {
    setProgressStatus(true);
    scenarios
      .getScenariosLabels()
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          setScenariosLabels(response.data.scenarios_labels);
        }
      })
  }, []);

  return (
    <>
      <Card className={classes.mainContainer}>
        <Grid container spacing={2} className={classes.gridBlock}>
          <Grid item xs={12}>
            <div className={classes.title}>
              Wybierz symulację do analizy wyników
            </div>
          </Grid>
          <Grid item md={5} sm={8} xs={12}>
            <Autocomplete
              className={classes.name_select_box}
              onChange={(event, value) => setSelectedItem(value ? value : {})}
              options={scenariosLabels}
              getOptionLabel={(option) => scenariosLabels && option && option.description}
              renderInput={(params) => <TextField {...params} placeholder="Wpisz nazwę" variant="outlined" InputLabelProps={{shrink: false}}
                noOptionsText={'Brak opcji'}
              />}
              renderOption={(option, { selected }) => (
                <Tooltip arrow title={option.id_scenario <= tooltip_list.length ? tooltip_list[option.id_scenario - 1] : ''} placement="right-start" value={option.id_scenario}>
                  <div className={classes.tooltip}>{option.description}</div>
                </Tooltip>
              )}
            />
          </Grid>
          <Grid item md={3} sm={8} xs={12}>
            <Button variant="contained" color="secondary" className={classes.btnShowResult} onClick={handleShowResult}>
              Przeglądaj wyniki
          </Button>
          </Grid>
        </Grid>
      </Card>
        <div className={classes.simulationBlock}>
          <Grid container spacing={2}>
            <Grid item md={5} sm={6} xs={12}>
            <Button variant="contained" color="secondary" className={classes.btnCreateSimulation} onClick={handleCreateSimulation}>
              Stwórz własna symulację
            </Button>
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

export default withRouter(ForecastingModule);
