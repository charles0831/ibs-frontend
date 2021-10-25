import React from 'react';
import { MultiSelect, SingleSelect, TooltipSingleSelect } from '..';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import { 
  Grid, 
  Card, 
  Button
} from '@material-ui/core';
import OccupationSelectionModal from '../OccupationSelectionModal';
const ProvinceOccupationAdditionalOption = (props) => {
  const classes = useStyles();
  const { 
    occupationValue,
    provinceValue, 
    occupationSizeValue,
    showChartModeValue, 
    handleSelectedProvince, 
    handleSelectedOccupation, 
    handleSelectedShowChartsMode,
    handleSelectedOccupationSize,
    provinceList,
    occupationList,
    showChartsMode,
    occupationSizeList,
    selectedChartType,
    occupationAllIn,
    setOccupationAllIn,
    provinceAllIn,
    setProvinceAllIn
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
              Wybierz województwo
            </div>
            <MultiSelect value={provinceValue} handleChange={handleSelectedProvince} list={provinceList} allIn={provinceAllIn} setAllIn={setProvinceAllIn}/>
          </Grid>
          <Grid item md={6} xs={12}>
            <OccupationSelectionModal
                node={occupationList}
                occupationSize={occupationSizeValue}
                handleSelectedOccupation={handleSelectedOccupation}
                handleSelectedOccupationSize={handleSelectedOccupationSize}
                occupationSizeList={occupationSizeList}
                selectedOccupation={occupationValue}
                allIn={occupationAllIn}
                setAllIn={setOccupationAllIn}
              // handleSave={handleSaveOccupation}
              />
          </Grid>
          {showChartsMode.length > 1 ?
            <Grid item md={2} xs={12}>
              <div className={classes.secondTitleHeader}>
                Wyniki
              </div>
              {
                Number(selectedChartType) === 3 ?
                  <SingleSelect value={showChartModeValue} handleChange={handleSelectedShowChartsMode} list={showChartsMode}/>
                :
                  <TooltipSingleSelect value={showChartModeValue} handleChange={handleSelectedShowChartsMode} list={showChartsMode}/>
              }
            </Grid>
            :
            <></>
          }
        </Grid>
      </Card>
    </>
  );
};

export default withRouter(ProvinceOccupationAdditionalOption);
