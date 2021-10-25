import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  logoBlock: {
    backgroundColor: theme.palette.black_white,
		borderTop: theme.palette.card_border
  },
  logo: {
    maxWidth: '100%',
    maxHeight: '100%',
    height: '80%'
  },
  min_contain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    width: '100%',
    margin: '0px'
  },
	wcag_footer: {
		color: theme.palette.text.primary,
		textTransform: 'initial',
		fontFamily: 'roboto',
	},
	wcag_container: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	declaration: {
		fontFamily: 'roboto',

		color: theme.palette.color,
		fontWeight: '500',
		marginBottom: '20px'
	},
}));

const Footer = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.logoBlock}>
      <Grid container spacing={3} className={classes.logoContainer}>
        <Grid item xs={3} className={classes.min_contain}>
          <img className={classes.logo} src="/images/bottom_logo/1.svg" alt="Logo Fundusze Europejskie Wiedza Edukacja Rozwój"/>
        </Grid>
        <Grid item xs={3} className={classes.min_contain}>
          <img className={classes.logo} src="/images/bottom_logo/2.svg" alt="Logo Rzeczpospolita Polska"/>
        </Grid>
        <Grid item xs={3} className={classes.min_contain}>
          <img className={classes.logo} src="/images/bottom_logo/3.svg" alt="Logo Państwowy Fundusz Rehabilitacji Osób Niepełnosprawnych" />
        </Grid>
        <Grid item xs={3} className={classes.min_contain}>
          <img className={classes.logo} src="/images/bottom_logo/4.svg" alt="Logo Zakład Ubezpieczeń Społecznych" />
        </Grid>
      </Grid>
    </div>
  );
};

Footer.propTypes = {
  children: PropTypes.node
};

export default Footer;
