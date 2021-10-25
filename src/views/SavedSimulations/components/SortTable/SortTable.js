import React, { useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableSortLabel,
  Button
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './style';

const SortTable = (props) => {
  const classes = useStyles();
  const {history} = props;
  const { sortBy, sortOrder, requestSort, total, rows, page, selectedCount } = props;
  useEffect(() => {
  }, []);

  const handleGotoSimulation = (indx) => {
    history.push({
      pathname: '/forecasting_module/simulation_info',
      state: {item: rows[indx]
    }});
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="5%">
            <TableSortLabel
              active={sortBy === 0}
              direction={sortOrder}
              onClick={() => requestSort(0)}
            >
              ID
            </TableSortLabel>
          </TableCell>
          <TableCell width="40%">
            <TableSortLabel
              active={sortBy === 1}
              direction={sortOrder}
              onClick={() => requestSort(1)}
            >
              Nazwa
            </TableSortLabel>
          </TableCell>
          <TableCell width="5%">
            <TableSortLabel
              active={sortBy === 2}
              direction={sortOrder}
              onClick={() => requestSort(2)}
            >
              Przeliczona
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel align="right">
              Opcja
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((item, indx) => {
          return (
            <TableRow key={indx} className={classes.root}>
              <TableCell>#{total - (page-1)*selectedCount - indx}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.eval == '0' ? 'Nie' : 'Tak'}</TableCell>
              <TableCell align="right">
              {
                item.eval == '1' ? 
                  <Button variant="contained" color="secondary" className={classes.btnCreate} onClick={() => handleGotoSimulation(indx)}>
                    Przejdź do symulacji
                  </Button>
                  :
                  <></>
              }
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(SortTable);
