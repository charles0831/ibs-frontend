import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid, Card, Button,  Menu, MenuItem
} from '@material-ui/core';
import {
  DateArea
} from '../'

import { withRouter } from 'react-router-dom';
import useStyles from './style';

const ControllerArea = (props) => {
  const { handleExport, fromDate, setFromDate, toDate, setToDate, chartType, yearList, handleRender } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(Boolean(anchorEl));

  const handleClose = () => {
    setAnchorEl(null);
    setExportDropdownOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setExportDropdownOpen(true);
  };
  return (
    <Grid container spacing={2} className={classes.controlGrid}>
      <Grid item md={7} xs={12} className={classes.controlContainer}>
        <Card className={classes.controlBlock}>
            <DateArea
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              chartType={chartType}
              yearList={yearList}
            />
        </Card>
      </Grid>
      <Grid item md={5} xs={12} className={classes.controlContainer}>
        <Card className={classes.optionBlock}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <div className={classes.avatar}>
                <Button variant="contained" color="secondary" className={classes.btnExport} onClick={handleMenu}>
                  Eksportuj
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={exportDropdownOpen}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleExport(0)}>Eksportuj do CSV</MenuItem>
                  <MenuItem onClick={() => handleExport(1)}>Eksportuj do XLSX</MenuItem>
                  <MenuItem onClick={() => handleExport(2)}>Eksportuj do PNG</MenuItem>
                  <MenuItem onClick={() => handleExport(3)}>Eksportuj do JPG</MenuItem>
                  <MenuItem onClick={() => handleExport(4)}>Eksportuj do PDF</MenuItem>
                </Menu>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button variant="contained" color="secondary" className={classes.btnSave} onClick={() => handleRender()}>
                Pokaż wyniki
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withRouter(ControllerArea);
