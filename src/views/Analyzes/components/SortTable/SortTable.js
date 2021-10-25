import React, { useEffect, useState } from 'react';
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
import dateUtil from '../../../../utils/moment';
import DeleteModal from '../DeleteModal';

const SortTable = (props) => {
  const classes = useStyles();
  const {history} = props;
  const { sortBy, sortOrder, requestSort, total, rows, page, selectedCount, categoryList, handleDelete } = props;
  const [selectedItem, setSelectedItem] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
  }, []);

  const handleGotoSimulation = (indx) => {
    history.push({
      pathname: '/forecasting_module/simulation_info/edit',
      state: {item: rows[indx]
    }});
  }

  const convert = (str) => {
    let arr = str.split(',');
    let result = [];
    for (let i = 0; i < categoryList.length ; i ++) {
      for (let j = 0; j < arr.length; j ++) {
        if (categoryList[i].id == arr[j]) {
          result.push(categoryList[i].name);
        }
      }
    }
    return result.join(", ");
  }

  const handleCloseModal = () => {
    setOpenModal(false);
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
          <TableCell width="15%">
            <TableSortLabel
              active={sortBy === 1}
              direction={sortOrder}
              onClick={() => requestSort(1)}
            >
              Nazwa
            </TableSortLabel>
          </TableCell>
          <TableCell width="25%">
            <TableSortLabel
              active={sortBy === 2}
              direction={sortOrder}
              onClick={() => requestSort(2)}
            >
              Kategoria
            </TableSortLabel>
          </TableCell>
          <TableCell width="15%">
            <TableSortLabel
              active={sortBy === 3}
              direction={sortOrder}
              onClick={() => requestSort(3)}
            >
              Data utworzenia
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
              <TableCell>{item.name}</TableCell>
              <TableCell>{convert(item.id_category)}</TableCell>
              <TableCell>{dateUtil.getStringFromDate(new Date(item.created_at))}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" className={classes.btnOpen} onClick={() => handleGotoSimulation(indx)}>
                  Otwórz
                </Button>
                <Button variant="contained" color="secondary" className={classes.btnDelete} onClick={() => {setSelectedItem(item.id_analyze); setOpenModal(true);}}>
                  Usuń
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <DeleteModal
        openModal={openModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
        selectedIndex={selectedItem}
      />
    </Table>
  );
};

export default withRouter(SortTable);
