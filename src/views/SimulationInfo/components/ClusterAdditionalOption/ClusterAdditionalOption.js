import React from 'react';
import { MultiSelect, SingleSelect } from '..';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import { 
  Grid, 
  Card, 
  Button,
} from '@material-ui/core';
import OccupationSelectionModal from '../OccupationSelectionModal';
const ClusterAdditionalOption = (props) => {
  const classes = useStyles();
  const { 
    clusterValue,
    showChartModeValue,
    handleSelectedCluster,
    handleSelectedShowChartsMode,
    clusterList,
    showChartsMode,
    allIn,
    setAllIn
  } = props;

  return (
    <>
      <Card className={classes.secondContainer}>
        <Grid container spacing={2} className={classes.mainContainer}>
          <Grid item xs={12}>
            <div className={classes.mainHeader}>
              Dodatkowe opcje
            </div>
          </Grid>
          <Grid item md={8} xs={12}>
            <div className={classes.secondTitleHeader}>
              Wybierz klaster powiatów
            </div>
            <MultiSelect value={clusterValue} handleChange={handleSelectedCluster} list={clusterList} allIn={allIn} setAllIn={setAllIn}/>
          </Grid>
          {showChartsMode.length > 1 ?
            <Grid item md={4} xs={12}>
              <div className={classes.secondTitleHeader}>
                Wyniki
              </div>
              <SingleSelect value={showChartModeValue} handleChange={handleSelectedShowChartsMode} list={showChartsMode}/>
            </Grid>
            :
            <></>
          }
        </Grid>
      </Card>
    </>
  );
};

export default withRouter(ClusterAdditionalOption);
