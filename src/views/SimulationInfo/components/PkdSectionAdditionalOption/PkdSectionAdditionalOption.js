import React from 'react';
import { SingleSelect, MultiSelect } from '..';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import { 
  Grid, 
  Card, 
  Button
} from '@material-ui/core';

const PkdSectionAdditionalOption = (props) => {
  const classes = useStyles();
  const { 
    pkdSectionValue,  
    showChartModeValue, 
    handleSelectedPkdSection,  
    handleSelectedShowChartsMode,
    pkdSectionList,
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
            <div className={classes.multiTitleHeader}>
              Wybierz sekcje PKD
            </div>
            <div className={classes.subHeader}>
              (można wybrać kilka sekcji)
            </div>
            <MultiSelect value={pkdSectionValue} handleChange={handleSelectedPkdSection} list={pkdSectionList} allIn={allIn} setAllIn={setAllIn}/>
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

export default withRouter(PkdSectionAdditionalOption);
