import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useStyles from './style';
const Normal = props => {
  const { children } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
    <div className={classes.root}>
      <main className={classes.content}>{children}</main>
    </div>
    </>
  );
};

Normal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Normal;
