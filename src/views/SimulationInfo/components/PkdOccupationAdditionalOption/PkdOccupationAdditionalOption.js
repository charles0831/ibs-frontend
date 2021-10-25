import React from 'react';
import { MultiSelect, SingleSelect } from '..';
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
    pkdSectionValue, 
    occupationSizeValue,
    showChartModeValue, 
    handleSelectedPkdSection, 
    handleSelectedOccupation, 
    handleSelectedShowChartsMode,
    handleSelectedOccupationSize,
    pkdSectionList,
    occupationList,
    showChartsMode,
    occupationSizeList,
    occupationAllIn,
    setOccupationAllIn,
    pkdAllIn,
    setPkdAllIn,
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
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <div className={classes.multiTitleHeader}>
                  Wybierz sekcje PKD
                </div>
                <div className={classes.subHeader}>
                  (można wybrać kilka sekcji)
                </div>
                <MultiSelect value={pkdSectionValue} handleChange={handleSelectedPkdSection} list={pkdSectionList} allIn={pkdAllIn} setAllIn={setPkdAllIn}/>
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
                  <div>
                    <SingleSelect value={showChartModeValue} handleChange={handleSelectedShowChartsMode} list={showChartsMode}/>
                  </div>
                </Grid>
                :
                <></>
              }
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default withRouter(ProvinceOccupationAdditionalOption);
