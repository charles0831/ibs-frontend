import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './style';
import { findIndex } from 'underscore';

const DateArea = (props) => {
  const classes = useStyles();
  const { fromDate, toDate, setFromDate, setToDate, yearList, chartType } = props;
  // const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState(['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU']);

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div className={classes.title} style={{width: '50%'}}>
          {
            parseInt(chartType) != 1 ?
              'Wybierz czas'
            :
              'Wybierz czas od'
          }

        </div>
        {
          parseInt(chartType) === 1 ?
          <div className={classes.title} style={{width: '50%'}}>
            Wybierz czas do
          </div>
          :
          <></>
        }

      </div>
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', width: '100%' }}>
        
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            native
            value={fromDate.year}
            onChange={(event) => setFromDate({year: event.target.value, month: fromDate.month})}
            inputProps={{
              name: 'a',
              id: 'c',
            }}
            className={classes.input_box}
          >
            {
              yearList.map((item, index) =>
                <option key={index} value={item}>{item}</option>
              )
            }
          </Select>
        </FormControl>
        {
          parseInt(chartType) === 1 ?
          <FormControl variant="outlined" className={classes.formControl}>
          <Select
            native
            value={monthList[fromDate.month]}
            onChange={(event) => {
              let index = -1;
              for (let i = 0; i < monthList.length; i ++) {
                if (monthList[i] === event.target.value) {
                  index = i;
                }
              } 
              setFromDate({year: fromDate.year, month: index})
            }}
            inputProps={{
              name: 'b',
              id: 'b',
            }}
            className={classes.input_box}
          >
            {
              monthList.map((item, index) =>
                <option key={index} value={item}>{item}</option>
              )
            }
          </Select>
        </FormControl>
        :
        <></>
        }
        
      </div>
      {
        parseInt(chartType) === 1 ?
        <div style={{ display: 'flex', width: '100%' }}>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            native
            value={toDate.year}
            onChange={(event) => setToDate({year: event.target.value, month: toDate.month})}
            inputProps={{
              name: 'c',
              id: 'a',
            }}
            className={classes.input_box}
          >
            {
              yearList.map((item, index) =>
                <option key={index} value={item}>{item}</option>
              )
            }
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            native
            value={monthList[toDate.month]}
            onChange={(event) => {
              let index = -1;
              for (let i = 0; i < monthList.length; i ++) {
                if (monthList[i] === event.target.value) {
                  index = i;
                }
              } 
              setToDate({year: toDate.year, month: index})
            }}
            inputProps={{
              name: 'd',
              id: 'outlined-age-native-simple',
            }}
            className={classes.input_box}
          >
            {
              monthList.map((item, index) =>
                <option key={index} value={item}>{item}</option>
              )
            }
          </Select>
        </FormControl>
      </div>
      :
      <></>
      }
      
    </div>
    </div>
  );
};

export default withRouter(DateArea);
