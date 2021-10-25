import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid, Card, Button
} from '@material-ui/core';
import {
  ChartArea, SortTable
} from '..'

import { withRouter } from 'react-router-dom';
import useStyles from './style';

const ChartTableArea = (props) => {
  const { chartData, selectedChartType, selectedCategory, selectedSection, requestSort, field_list, sortOption, setTableData, tableData, data, chart_title, bottom_title, list, sub_list } = props;
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
            selectedCategory={selectedCategory}
            selectedSection={selectedSection}
          />
          <div style={{marginTop: '90px'}}>
            <div className={classes.chart_title}>
              {bottom_title}
            </div>
            <div className={classes.chart_title}>
              {list.join('; ')}
            </div>
          </div>
          {
            sub_list.length > 0 &&
            <>
              <div className={classes.chart_title}>
                Uwzględniono następujące grupy zawodowe:
              </div>
              <div className={classes.chart_title}>
                {sub_list.join('; ')}
              </div>
            </>
          }
        </Card>
      </Grid>
    </>
  );
};

export default withRouter(ChartTableArea);
