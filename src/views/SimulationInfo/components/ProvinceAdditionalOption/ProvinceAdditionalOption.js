import React from 'react';
import { SingleSelect, MultiSelect } from '..';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import { 
  Grid, 
  Card, 
  Button,
} from '@material-ui/core';

const ProvinceAdditionalOption = (props) => {
  const classes = useStyles();
  const { 
    provinceValue,
    showChartModeValue,
    handleSelectedProvince,
    handleSelectedShowChartsMode,
    provinceList,
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
              Wybierz województwo
            </div>
            <MultiSelect value={provinceValue} handleChange={handleSelectedProvince} list={provinceList} allIn={allIn} setAllIn={setAllIn}/>
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

export default withRouter(ProvinceAdditionalOption);
