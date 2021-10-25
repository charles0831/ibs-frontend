import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, Tooltip, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './style';

const SingleSelect = (props) => {
  const classes = useStyles();
  const { value, handleChange, list} = props;
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
  }, {
    name: 'Kolumnowy', tooltip: 'Wykres kolumnowy umożliwia porównanie wartości kilku zmiennych w jednym roku'
  }];

  const getTooltip = (name) => {
    for( let i = 0; i < tooltip_list.length; i ++) {
      if (name === tooltip_list[i].name) {
        return tooltip_list[i].tooltip;
      }
    }
    return null;
  }
  useEffect(() => {
  }, []);

  const getLabel = () => {
    for (let i = 0; i < list.length; i ++) {
      if (parseInt(list[i].id) === parseInt(value))
        return list[i].name;
    }
    return '';
  }
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple" className={classes.name_select_box} shrink={false}>
        {
          value == 0 ? 'Wybierz' : ''
        }
      </InputLabel>
      <Select
        // native
        value={value}
        onChange={(event) =>handleChange(event.target.value ? event.target.value : {})}
        inputProps={{
          name: 'age',
          id: 'outlined-age-native-simple',
        }}
        className={classes.input_box}
        renderValue={
          () => getLabel()
        }
      >
        <MenuItem value={0}>
          <em></em>
        </MenuItem>

        {
          list.map((item, index) => 
            (
              getTooltip(item.name) ?
              <Tooltip arrow title={getTooltip(item.name)} placement="right-start" value={item.id}>
                <MenuItem  key={index}>{item.name}</MenuItem >
              </Tooltip>
              :
              <MenuItem  key={index} value={item.id}>{item.name}</MenuItem >
            )

          )
        }
      </Select>
    </FormControl>
  );
};

export default withRouter(SingleSelect);
