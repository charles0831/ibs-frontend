import React, { useEffect, useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import useStyles from './style';
import {
  Grid,
  Card,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer ,
  TableHead ,
  TableRow ,
  Link
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications'
import contents from '../../apis/contents';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.black_white,
    color: theme.palette.text.primary,
    borderBottom: '1px solid gray'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      cursor: 'pointer'
    }
  },
}))(TableRow);

const ContentManagement = (props) => {
  const classes = useStyles();
  const { addToast } = useToasts()
  const { history } = props;

  const [progressStatus, setProgressStatus] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const handleEdit = (id) => {
    history.push(`/content_management/${id}`)
  }

  useEffect(() => {
    setProgressStatus(true);
    contents
      .getBlocks()
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          setBlocks(response.data.blocks)
        }
      })
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nazwa</StyledTableCell>
              <StyledTableCell>Opcja</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((row, index) => (
              <StyledTableRow key={index} onClick={() => handleEdit(row.id_content)}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>
                  <Button variant="contained" color="secondary" className={classes.btnOpen} onClick = {() => handleEdit(row.id_content)}>
                    Edytuj
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        progressStatus ?
          <>
            <div className={classes.progressContainer}>
              <CircularProgress className={classes.progress} />
            </div>
          </>
          :
          <></>
      }
    </>
  );
};

export default withRouter(ContentManagement);
