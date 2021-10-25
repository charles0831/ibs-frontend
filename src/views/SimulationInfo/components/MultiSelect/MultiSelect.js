import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, Input, MenuItem, Tooltip, Checkbox, FormControlLabel } from '@material-ui/core';
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
  const { handleChange, value, list, allIn, setAllIn } = props;
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

  const tooltip_list = [{
    name: 'Sektorowy', tooltip: 'umożliwia przeglądanie prognoz dla Polski w podziale na sekcje gospodarki według Polskiej Klasyfikacji Działalności.',
  }, {
    name: 'Wojewódzki', tooltip: 'umożliwia przeglądanie zagregowanych prognoz w podziale na województwa.',
  }, {
    name: 'Powiatowy', tooltip: 'umożliwia przeglądanie zagregowanych prognoz w podziale na osiem grup powiatów, o wspólnych cechach gospodarczych.',
  }, {
    name: 'Zawodowy', tooltip: 'umożliwia przeglądanie prognoz dla Polski, w podziale na grupy zawodów, według Klasyfikacji Zawodów i Specjalności.',
  }, {
    name: 'Sektorowo-zawodowy', tooltip: 'umożliwia przeglądanie prognoz dla poszczególnych grup zawodów, w ramach wybranych sekcji gospodarki. Dane są prezentowane dla całego kraju.',
  }, {
    name: 'Wojewódzko-zawodowy', tooltip: 'umożliwia przeglądanie prognoz dla poszczególnych grup zawodów w wybranych województwach.',
  }, {
    name: 'Powiatowo-zawodowy', tooltip: 'umożliwia przeglądanie prognoz dla poszczególnych grup zawodów w wybranych klastrach powiatów.',
  }, {
    name: 'Edukacja', tooltip: 'pokazuje liczbę absolwentów według dziedziny i poziomu wykształcenia oraz w podziale na grupy wieku. Dane są prezentowane dla całego kraju. Prognoza zaczyna się od roku 2019. '
  }, {
    name: 'Popyt na pracę', tooltip: 'Prognoza popytu na pracę zgłaszanego przez pracodawców',
  }, {
    name: 'Podaż pracy', tooltip: 'Prognoza sumy liczby osób pracujących i bezrobotnych'
  }, {
    name: 'Zatrudnienie', tooltip: 'Dane historyczne o zatrudnieniu'
  }, {
    name: 'Luka', tooltip: 'Prognoza różnicy między popytem na pracę a podażą pracy',
  }];

  const getTooltip = (name) => {
    for (let i = 0; i < tooltip_list.length; i++) {
      if (name === tooltip_list[i].name) {
        return tooltip_list[i].tooltip;
      }
    }
    return null;
  }

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
    for (let i = 0; i < _arr.length; i++) {
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

  const getLabel = () => {
    let _arr = [];
    for (let i = 0; i < list.length; i++)
      for (let j = 0; j < value.length; j++) {
        if (value[j] == list[i].id) {
          _arr.push(list[i].name);
        }
      }
    return _arr.join(', ');
  }

  const handleChangeAllIn = () => {
    setAllIn(!allIn);
    handleChange([]);
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple" className={!allIn ? classes.name_select_box: classes.normal} shrink={false}>
        {
          (value.length === 0 && !allIn ) ? 'Wybierz' : allIn ? 'Ogółem' : ''
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
        renderValue={
          () => getLabel()
        }
      >
        <MenuItem
          disabled={allIn}
          checked={true}
          value="Select all"
          onClick={selectAll}
        >
          {"Zaznacz wszystkie / Odznacz wszystkie"}
        </MenuItem>
        {setAllIn &&
          <MenuItem checked={true}>
            <FormControlLabel
              className={classes.rememberMe}
              control={
                <Checkbox
                  checked={allIn}
                  onChange={handleChangeAllIn} 
                />
              }
              label="Ogółem"
            />
          </MenuItem>
        }
        {list.map((item, index) => (
          getTooltip(item.name) ?
            <Tooltip arrow title={getTooltip(item.name)} placement="right-start" value={item.id}>
              <MenuItem key={index} className={classes.list_item} onClick={() => handleClickItem(item.id)} disabled={allIn}>
                {item.name}
              </MenuItem>
            </Tooltip>
            :
            <MenuItem key={index} value={item.id} style={getStyles(item.id, value, theme)} className={classes.list_item} onClick={() => handleClickItem(item.id)} disabled={allIn}>
              {item.name}
            </MenuItem>

        ))}
      </Select>
    </FormControl>
  );
};

export default withRouter(MultiSelect);
