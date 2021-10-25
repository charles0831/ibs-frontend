import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, Tooltip, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './style';

const SingleSelect = (props) => {
  const classes = useStyles();
  const { value, handleChange, list} = props;
  const tooltip_list = [{
    name: 'Scenariusz bazowego wzrostu PKB', tooltip: 'Tempo wzrostu PKB zgodne z prognozą bazową Ageing Working Group przy Komisji Europejskiej.',
  }, {
    name: 'Scenariusz niskiego wzrostu PKB', tooltip: 'Tempo wzrostu PKB (oraz ogólnej produktywności) niższe o 0,25 p.p. rocznie niż w prognozie bazowej Ageing Working Group przy Komisji Europejskiej.',
  }, {
    name: 'Scenariusz wysokiego wzrostu PKB', tooltip: 'Tempo wzrostu PKB (oraz ogólnej produktywności) wyższe o 0,25 p.p. rocznie niż w prognozie bazowej Ageing Working Group przy Komisji Europejskiej.',
  }, {
    name: 'Scenariusz bazowego popytu zagranicznego', tooltip: 'Bazowa prognoza tempa wzrostu popytu zagranicznego.',
  }, {
    name: 'Scenariusz niskiego popytu zagranicznego', tooltip: 'Tempo wzrostu popytu zagranicznego niższe o 0,1 p.p. rocznie niż w prognozie bazowej.',
  }, {
    name: 'Scenariusz wysokiego popytu zagranicznego', tooltip: 'Tempo wzrostu popytu zagranicznego wyższe o 0,1 p.p. rocznie niż w prognozie bazowej.',
  }, {
    name: 'Scenariusz bazowej konsumpcji publicznej', tooltip: 'Scenariusz zakładający, że konsumpcja publiczna stanowi 18% PKB.',
  }, {
    name: 'Scenariusz niskiej konsumpcji publicznej', tooltip: 'Scenariusz zakładający, że konsumpcja publiczna stanowi 17% PKB.' 
  }, {
    name: 'Scenariusz wysokiej konsumpcji publicznej', tooltip: 'Scenariusz zakładający, że konsumpcja publiczna stanowi 19% PKB.',
  }, {
    name: 'Rozrodczość całkowita bazowa', tooltip: 'Współczynnik dzietności na poziomie mediany rozkładu rozrodczości (zob. Raport metodologiczny w zakładce Pomoc).'
  }, {
    name: 'Rozrodczość całkowita niska', tooltip: 'Współczynnik dzietności na poziomie pierwszego decyla rozkładu rozrodczości.'
  }, {
    name: 'Rozrodczość całkowita wysoka', tooltip: 'Współczynnik dzietności na poziomie dziewiątego decyla rozkładu rozrodczości.',
  }, {
    name: 'Migracje całkowite bazowe', tooltip: 'Intensywność migracji jest wynikiem równowagi w modelu migracji (zob. Raport metodologiczny w zakładce Pomoc).'
  }, {
    name: 'Migracje całkowite niskie', tooltip: 'Intensywność migracji jest dwukrotnie mniejsza niż w scenariuszu bazowym.'
  }, {
    name: 'Migracje całkowite wysokie', tooltip: 'Intensywność migracji jest dwukrotnie większa niż w scenariuszu bazowym.',
  },
];

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
    console.log(list, value);
    for (let i = 0; i < list.length; i ++) {
      if (list[i].description === value)
        return list[i].description;
    }
    return '';
  }
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple" className={classes.name_select_box} shrink={false}>
        {
          (Object.keys(value).length === 0 && value.constructor === Object ) ? 'Wybierz' : ''
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
              getTooltip(item.description) ?
              <Tooltip arrow title={getTooltip(item.description)} placement="right-start" value={item.description}>
                <MenuItem  key={index}>{item.description}</MenuItem >
              </Tooltip>
              :
              <MenuItem  key={index} value={item.description}>{item.description}</MenuItem >
            )

          )
        }
      </Select>
    </FormControl>
  );
};

export default withRouter(SingleSelect);
