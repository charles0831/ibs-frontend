import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid, Card, Button, Menu, MenuItem
} from '@material-ui/core';
import {
  NameModal, YearSelect
} from '../'

import { withRouter } from 'react-router-dom';
import useStyles from './style';

const ControllerArea = (props) => {
  const { setSelectedYear, selectedYear, setSelectedToYear, selectedToYear, handleExport, handleSave, openModal, handleCloseModal, setName, handleSaveAnalyze, name, yearList, selectedChartType, handleRender } = props;
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
      <Grid item sm={7} xs={12} className={classes.controlContainer}>
        <Card className={classes.controlBlock}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <YearSelect
                value={selectedYear}
                handleChange={setSelectedYear}
                list={yearList}
              />
            </Grid>
            {
              parseInt(selectedChartType) === 1 ?
                <Grid item xs={6}>
                  <YearSelect
                    value={selectedToYear}
                    handleChange={setSelectedToYear}
                    list={yearList}
                  />
                </Grid>
                :
                <></>
            }

          </Grid>
        </Card>
      </Grid>
      <Grid item sm={5} xs={12} className={classes.controlContainer}>
        <Card className={classes.controlBlock}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <Button variant="contained" color="secondary" className={classes.btnSave} onClick={handleSave}>
                Zapisz wybór
              </Button>
              <NameModal
                openModal={openModal}
                handleClose={handleCloseModal}
                name={name}
                handleChangeName={(e) => setName(e.target.value)}
                handleSave={handleSaveAnalyze}
              />
            </Grid>
            <Grid item xs={12}>
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
