import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid, Card, Button
} from '@material-ui/core';
import {
  ChartArea
} from '..'

import { withRouter } from 'react-router-dom';
import useStyles from './style';

const ChartTableArea = (props) => {
  const { chartData, selectedChartType, data, chart_title, bottom_title, list } = props;
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} className={classes.controlContainer}>
        <Card className={classes.controlBlock} ref={data}>
          <div className={classes.chart_title}>
            {chart_title}
          </div>
          <ChartArea
            chart_data={chartData}
            selectedChartType={selectedChartType}
          />
          <div style={{marginTop: '90px'}}>
            <div className={classes.chart_title}>
              {bottom_title}
            </div>
            <div className={classes.chart_title}>
              {list.join('; ')}
            </div>
          </div>
        </Card>
      </Grid>
    </>
  );
};

export default withRouter(ChartTableArea);
