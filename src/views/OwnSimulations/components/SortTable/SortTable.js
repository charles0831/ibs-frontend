import React, { useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableSortLabel, 
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './style';

const SortTable = (props) => {
  const classes = useStyles();
  const { sortBy, sortOrder, requestSort, sum, rows } = props;
  useEffect(() => {
  }, []);

  return (
    <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 0}
                  direction={sortOrder}
                  onClick={() => requestSort(0)}
                >
                  Rok
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 1}
                  direction={sortOrder}
                  onClick={() => requestSort(1)}
                >
                  Wartość
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item, indx) => {
              return (
                <TableRow key={indx} className={classes.root}>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter />
        </Table>
  );
};

export default withRouter(SortTable);
