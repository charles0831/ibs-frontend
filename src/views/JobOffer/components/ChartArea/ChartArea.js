import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid
} from '@material-ui/core';
import {
  Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
const NotAxisTickButLabel = props=> {
  const value = props.payload.value + '';
  let arr = value.match(/.{1,11}/g);
  return (
   <g transform={"translate( " + props.x + "," + props.y + " )" }>
     {
       arr.map((item, index) => (
        <text x={-7 * item.length / 2} y={index * 16} dy={16}  fontFamily="Roboto"  fontSize="14px"  fill={props.color || "#44545e" } >
          {item}
        </text>
       ))
     }
    </g>  
  ); 
}

const renderLabel = (entry) =>  {
  return entry.name;
}

const ChartArea = (props) => {
  const { chart_data, selectedChartType } = props;
  const classes = useStyles();
  const [chartData, setChartData] = useState([]);
  const [monthList, setMonthList] = useState(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']);
  const [max, setMax] = useState(0);
  useEffect(() => {
    let m = 0;
    for (let i = 0; i < chart_data.length; i ++) {
      if (parseInt(chart_data[i].value) > m) {
        m = parseInt(chart_data[i].value);
      }
      chart_data[i]['name'] = monthList[chart_data[i].month - 1] + '/' + chart_data[i].year;
      chart_data[i]['value'] = parseInt(chart_data[i]['value']);
    }
    setMax(m);
    setChartData(chart_data);
  }, [chart_data]);
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];
  const COLORS = getColorList();

  function getColorList() {
    let list = [];
    let from_r = 214;
    let from_g = 50;
    let from_b = 75;
    let to_r = 0;
    let to_g = 0;
    let to_b = 128;

    for (let i = 0; i < 10; i ++) {
      let r = from_r + (to_r - from_r) / 10 * i;
      let g = from_g + (to_g - from_g) / 10 * i;
      let b = from_b + (to_b - from_b) / 10 * i;
      list.push('rgb(' + r + ',' + g + ',' + b +')');
    }
    return list;
  }
  
  return (
    <>
      <Grid container spacing={0} className={classes.simulationView}>
        {selectedChartType == 1 ?
          <div className={classes.container}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, parseInt(max / 1000 + 1) * 1000]}/>
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#D6324B" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        :
        selectedChartType == 3 ?
        <div className={classes.container}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} angle={0} height={100}  tick={<NotAxisTickButLabel/> }/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#D6324B" />
          </BarChart>
        </ResponsiveContainer>
        </div>
        :
        <div className={classes.container}>
          <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={chartData}
              fill="#D6324B"
              label={renderLabel}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          </ResponsiveContainer>
        </div>
        }
      </Grid>
    </>
  );
};

export default withRouter(ChartArea);
