import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CircularProgress,
} from '@material-ui/core';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import SortTable from '../SortTable';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import series_labels from '../../../../apis/series-labels';

const SimulationView = (props) => {
  const classes = useStyles();
  const { seriesLabelInfo, history } = props;
  const [seriesLabels, setSeriesLabels] = useState([]);
  const [selectedSeriesLabel, setSelectedSeriesLabel] = useState(-1);
  const [series, setSeries] = useState([]);
  const [sum, setSum] = useState(0);
  const [sortOption, setSortOption] = useState({ sortBy: 0, sortOrder: "asc" });
  const [chartData, setChartData] = useState([]);
  const [progressStatus, setProgressStatus] = useState(false);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  function generateChartData(rows) {
    let data = [];
    let max = 0;
    let min = 0;
    rows.map((row, index) => {
      data.push({'name': row.year, 'Wartość': row.value})
      if (max < Math.ceil(row.value)) {
        max = Math.ceil(row.value);
      }
      if (min > Math.floor(row.value)) {
        min = Math.floor(row.value);
      }
    });
    setChartData(data);
    setMaxValue(max);
    setMinValue(min);
  }

  useEffect(() => {
    setProgressStatus(true);
    series_labels
      .getSeriesLabelById(seriesLabelInfo.id_type_key)
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          setSeriesLabels(response.data.series_label);
          setSelectedSeriesLabel(0);
        }
      })
  }, []);

  useEffect(() => {
    if (seriesLabels.length > 0 && selectedSeriesLabel >= 0) {
      setProgressStatus(true);
      series_labels
        .getSeriesById(seriesLabels[selectedSeriesLabel].id_series, sortOption.sortBy, sortOption.sortOrder)
        .then(response => {
          setProgressStatus(false);
          if (response.code === 401) {
            history.push('/login');
          } else {
            setSeries(response.data.series);
            setSum(response.data.sum);
            generateChartData(response.data.series);
          }
        })
    }
  }, [selectedSeriesLabel, sortOption]);

  
  const requestSort = (pSortBy) => {
    var sortOrder = "asc";
    if (pSortBy === sortOption.sortBy) {
      sortOrder = (sortOption.sortOrder === "asc" ? "desc" : "asc");
    }
    setSortOption({ sortBy: pSortBy, sortOrder: sortOrder })
  }

  return (
    <>
      <Grid container spacing={0} className={classes.simulationView}>
        <Grid item md={7} xs={12} className={classes.gridView}>
          <Card className={classes.chartView}>
            <div className={classes.scrollBlock}>
              <div className={classes.seriesLabelBlock}>
                {seriesLabels.map((item, index) => (
                  <div
                    key={index}
                    className={clsx({
                      [classes.seriesLabelItem]: true,
                      [classes.seriesLabelItemActive]: index === selectedSeriesLabel
                    })}
                    onClick={() => setSelectedSeriesLabel(index)}
                  >
                    {item.description}
                  </div>
                ))}
              </div >
            </div>
            <div className={classes.chartBlock}>
            <ResponsiveContainer className={classes.chartArea}>
              <AreaChart data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D6324B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#D6324B" stopOpacity={0} />
                  </linearGradient>

                </defs>
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[ Math.floor(minValue / 5) * 5, Math.ceil(maxValue)]}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="Wartość" stroke="#D6324B" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
            </div>
          </Card>
        </Grid>
        <Grid item md={5} xs={12} className={classes.gridView}>
          <Card className={classes.titleView}>
            <h3>
              {seriesLabelInfo.title}
            </h3>
            <div className={classes.description}>
              {seriesLabelInfo.description}
            </div>
          </Card>
          <div className={classes.cardView}>
            <Card >
              <SortTable
                rows={series}
                requestSort={requestSort}
                sortOrder={sortOption.sortOrder}
                sortBy={sortOption.sortBy}
                sum={sum}
              />
            </Card>
          </div>

        </Grid>
      </Grid>
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

export default withRouter(SimulationView);
