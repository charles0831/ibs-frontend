import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, Input, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './style';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSelect = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const { handleChange, value, list} = props;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 400,
      },
    },
  };

  useEffect(() => {
  }, []);

  const checkedAll = () => {
    if (value.length === list.length) {
      return false;
    }
    if (value.length === 0) {
      return true;
    }
    return true;
  }
  const selectAll = () => {
    if (checkedAll()) {
      let _arr = [];
      for (let i = 0; i < list.length; i++) {
        _arr.push(list[i].id);
      }
      handleChange(_arr);
    } else {
      let _arr = [];
      handleChange(_arr);
    }

  }

  const handleClickItem = (id) => {
    let _arr = JSON.parse(JSON.stringify(value));
    let index = -1;
    for (let i = 0; i < _arr.length; i ++) {
      if (_arr[i] === id) {
        index = i;
      }
    }
    if (index < 0) {
      _arr.push(id);
    } else {
      _arr.splice(index, 1);
    }
    handleChange(_arr);
  }
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple" className={classes.name_select_box} shrink={false}>
        {
          (value.length === 0 ) ? 'Wybierz' : ''
        }
      </InputLabel>
    <Select
      labelId="demo-mutiple-name-label"
      className={classes.multiple_select}
      multiple
      variant="outlined" 
      value={value}
      input={<Input />}
      MenuProps={MenuProps}
    >
       <MenuItem
          checked={true}
          value="Select all"
          onClick={selectAll}
        >
          {"Zaznacz wszystkie / Odznacz wszystkie"}
        </MenuItem> 
      {list.map((item, index) => (
        <MenuItem key={index} value={item.id} style={getStyles(item.id , value, theme)} className={classes.list_item} onClick={() => handleClickItem(item.id)}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  );
};

export default withRouter(MultiSelect);
