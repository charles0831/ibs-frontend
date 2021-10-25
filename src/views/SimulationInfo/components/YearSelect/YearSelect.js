import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './style';

const YearSelect = (props) => {
  const classes = useStyles();
  const { value, handleChange, list, disabled} = props;

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        native
        value={value}
        disabled={disabled}
        onChange={(event) =>handleChange(event.target.value ? event.target.value : {})}
        inputProps={{
          name: 'age',
          id: 'outlined-age-native-simple',
        }}
        className={classes.input_box}
      >
        {
          list.map((item, index) => 
            <option key={index} value={item}>{item}</option>
          )
        }
      </Select>
    </FormControl>
  );
};

export default withRouter(YearSelect);
