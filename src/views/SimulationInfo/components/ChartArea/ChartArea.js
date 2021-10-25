import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid
} from '@material-ui/core';
import {
  Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Text
} from 'recharts';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
const NotAxisTickButLabel = props => {
  let value = props.payload.value + '';
  let arr = [];
  while (value.length != 0) {
    arr.push(value.substring(0, 22));
    value = value.substring(22);
  }
  return (
    <g transform={"translate( " + props.x + "," + props.y + " )"}>
      {
        arr.map((item, index) => (
          <text x={0} y={index * 9} dy={arr.length / 2 * -5} key={index} fontFamily="Roboto" fontSize="10px" fill={props.color || "#44545e"} transform="rotate(90)">
            {item}
          </text>
        ))
      }

    </g>
  );
}

const ChartArea = (props) => {
  const { chart_data, selectedChartType, selectedCategory, selectedSection } = props;
  const classes = useStyles();
  const [chartData, setChartData] = useState([]);
  const colors = ['#155263', '#ff6f3c', '#ff9a3c', '#ffc93c', '#212121', '#7fdfd4', '#1a0841', '#000000', '#5f1854', '#5f1854'];
  useEffect(() => {
    setChartData(chart_data);
  }, [chart_data]);
  const convertData = (data) => {
    let _result = [];
    if (data === null || data === undefined || data.length === 0)
      return _result;
    for (let i = 0; i < data[0].data.length; i ++ ) {
      let _result_item = {};
      for (let j = 0; j < data.length; j ++) {
        let each = data[j];
        let item = data[j].data[i];
        let luka = null, podaz = null, popyt = null, zat = null, Rok;
        if (parseInt(item['Luka']) !== 0 || parseInt(item['Rok']) >= 2019)
          luka = item['Luka'];
        if (parseInt(item['Podaż pracy']) !== 0 || parseInt(item['Rok']) >= 2019)
          podaz = item['Podaż pracy'];
        if (parseInt(item['Popyt na pracę']) !== 0 || parseInt(item['Rok']) >= 2019)
          popyt = item['Popyt na pracę'];
        if (parseInt(item['Zatrudnienie']) !== 0 || parseInt(item['Rok']) <= 2020)
          zat = item['Zatrudnienie'];
        _result_item = {..._result_item, [`${each.name} - Luka (prawa oś)`]: luka, [`${each.name} - Podaż pracy`]: podaz, [`${each.name} - Popyt na pracę`]: popyt, [`${each.name} - Zatrudnienie`]: zat, 'Rok': item['Rok'], 'Wartość': item['Wartość']};
      }
      _result.push(_result_item);
    }
    data.map((each, index) => {
      each.data.map((item, _index) => {

      });
    })
    return _result;
  }
  return (
    <>
      <Grid container spacing={0} className={classes.simulationView}>
        {selectedChartType == 1 ?
          <div className={classes.container}>
            <ResponsiveContainer>
              <LineChart
                data={convertData(chartData)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Rok" />
                <YAxis />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                {
                  parseInt(selectedSection) !== 8 ?
                    chartData.map((item, index) => (
                      selectedCategory.map((_item, _index) => (
                        _item == 1 ?
                          <Line type="monotone" dataKey={`${item.name} - Popyt na pracę`} stroke={colors[selectedCategory.length * index + _index]} />
                          :
                          _item == 2 ?
                            <Line type="monotone" dataKey={`${item.name} - Podaż pracy`}  stroke={colors[selectedCategory.length * index + _index]} />
                            :
                            _item == 3 ?
                              <Line type="monotone" dataKey={`${item.name} - Zatrudnienie`}  stroke={colors[selectedCategory.length * index + _index]} />
                              :
                              <Line yAxisId="right" type="monotone" dataKey={`${item.name} - Luka (prawa oś)`}  stroke={colors[selectedCategory.length * index + _index]} />
                      ))
                    ))
                    :
                    <Line type="monotone" dataKey="Wartość" stroke="#30a2cb" />
                  // <Line type="monotone" dataKey="Rok" stroke="#30a2cb" />
                }
              </LineChart>
            </ResponsiveContainer>
          </div>
          :
          <div className={classes.container}>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={0} height={100} tick={<NotAxisTickButLabel />} />
                <YAxis />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                {
                  parseInt(selectedSection) !== 8
                    ?
                    selectedCategory.map((item, index) => (
                      item == 1 ?
                        <Bar dataKey="Popyt na pracę" fill="#D6324B" >
                        </Bar>
                        :
                        item == 2 ?
                          <Bar dataKey="Podaż pracy" fill="#b0a502" />
                          :
                          item == 3 ?
                            <Bar dataKey="Zatrudnienie" fill="#30a2cb" />
                            :
                            <Bar yAxisId="right" dataKey="Luka" fill="#022ba5" />
                    ))
                    :
                    <Bar dataKey="Wartość" fill="#D6324B" />
                }
              </BarChart>
            </ResponsiveContainer>
          </div>
        }
      </Grid>
    </>
  );
};

export default withRouter(ChartArea);
