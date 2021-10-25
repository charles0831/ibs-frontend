import React, { useEffect, useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Grid,
  Card,
  Button
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './style';

const NameModal = (props) => {
  const { openModal, handleClose, name, handleChangeName, handleSave } = props;
  const classes = useStyles();

  useEffect(() => {
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Card className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              Wpisz swoją nazwę analizy, aby zapisać
            </Grid>
            <Grid item xs={12}>
              <input className={classes.input_box} type="text" name="name" value={name} onChange={handleChangeName} placeholder="Wpisz nazwę swojej analizy" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" className={classes.btnSave} onClick={handleSave} disabled={name.length === 0}>
                Zapisz
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Fade>
    </Modal>
  );
};

export default withRouter(NameModal);
