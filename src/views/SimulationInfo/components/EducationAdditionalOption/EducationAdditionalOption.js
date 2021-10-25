import React from 'react';
import { MultiSelect, SingleSelect } from '..';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import { 
  Grid, 
  Card, 
  Button,
} from '@material-ui/core';
const EducationAdditionalOption = (props) => {
  const classes = useStyles();
  const { 
    educationValue,
    ageValue,
    showChartModeValue,
    handleSelectedEducation,
    handleSelectedAge,
    handleSelectedShowChartsMode,
    educationList,
    ageList,
    showChartsMode,
    ableRender,
    handleRender
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
          <Grid item md={4} xs={12}>
            <div className={classes.secondTitleHeader}>
              Wybierz wykształcenie
            </div>
            <MultiSelect value={educationValue} handleChange={handleSelectedEducation} list={educationList}/>
          </Grid>
          <Grid item md={4} xs={12}>
            <div className={classes.secondTitleHeader}>
              Wybierz Wiek
            </div>
            <MultiSelect value={ageValue} handleChange={handleSelectedAge} list={ageList}/>
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

export default withRouter(EducationAdditionalOption);
