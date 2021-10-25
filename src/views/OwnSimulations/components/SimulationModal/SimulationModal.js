import React, { useEffect, useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Grid,
  Card
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tab.css';
import useStyles from './style';
import { SimulationView } from '..';

const SimulationModal = (props) => {
  const { openModal, handleClose, list } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
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
  useEffect(() => {
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Card className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={11}>
              Wartości liczbowe dla wariantów
            </Grid>
            <Grid item xs={1} className={classes.closeIconBlock}>
                <CloseIcon className={classes.closeIcon} onClick={handleClose}/>
            </Grid>
            <Grid item xs={12}>
              <Tabs onSelect={index => setTabIndex(index)}>
                <TabList>
                  <Tab>Tempo wzrostu PKB</Tab>
                  <Tab>Popyt zagraniczny</Tab>
                  <Tab>Wielkść konsumpcji publicznej</Tab>
                  <Tab>Dzietność</Tab>
                  <Tab>Saldo Migracji</Tab>
                </TabList>
                <TabPanel>
                  <SimulationView seriesLabelInfo={seriesLabelId[tabIndex]}/>
                </TabPanel>
                <TabPanel>
                  <SimulationView seriesLabelInfo={seriesLabelId[tabIndex]}/>
                </TabPanel>
                <TabPanel>
                  <SimulationView seriesLabelInfo={seriesLabelId[tabIndex]}/>
                </TabPanel>
                <TabPanel>
                  <SimulationView seriesLabelInfo={seriesLabelId[tabIndex]}/>
                </TabPanel>
                <TabPanel>
                  <SimulationView seriesLabelInfo={seriesLabelId[tabIndex]}/>
                </TabPanel>
              </Tabs>
            </Grid>
          </Grid>
        </Card>
      </Fade>
    </Modal>
  );
};

export default withRouter(SimulationModal);
