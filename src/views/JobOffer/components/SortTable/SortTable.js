import React, { useEffect, useState } from 'react';
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
  const { sortBy, sortOrder, requestSort, sum, rows, field_list, handleChangeTableData } = props;

  useEffect(() => {
    let temp = rows;
    for (let i = 0; i < temp.length - 1; i ++) {
      for (let j = i + 1; j < temp.length; j ++) {
        if ((sortOrder == "desc" && temp[i][sortBy] > temp[j][sortBy]) || (sortOrder == "asc" && temp[i][sortBy] < temp[j][sortBy])) {
          let l_temp = temp[i];
          temp[i] = temp[j];
          temp[j] = l_temp;
        }
      }
    }
    handleChangeTableData(JSON.parse(JSON.stringify(temp)));
  }, [sortBy, sortOrder]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {
            field_list.map((item, indx) => (
              <TableCell>
                <TableSortLabel
                  active={sortBy === item}
                  direction={sortOrder}
                  onClick={() => requestSort(item)}
                >
                  {item}
                </TableSortLabel>
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((item, indx) => (
          <TableRow key={indx} className={classes.root}>
            {field_list.map((value, index) => (
              <TableCell>{item[value]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter />
    </Table>
  );
};

export default withRouter(SortTable);
