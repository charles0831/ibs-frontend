import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useStyles from './style';
import {
  CircularProgress,
  Grid,
  Card
} from '@material-ui/core';
import contents from '../../apis/contents';
const Minimal = props => {
  const { children } = props;
  const [blocks, setBlocks] = useState([]);
  const [progressStatus, setProgressStatus] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);
  
  useEffect(() => {
    setProgressStatus(true);
    contents
    .getAllBlocks()
    .then(response => {
      setProgressStatus(false);
      if (response.code === 200) {
        setBlocks(response.data.blocks);
      }
    })
  }, []);

  return (
    <>
    <Grid container className={classes.root}>
      <Grid item lg={4} md={6} sm={12} className={classes.content}>{children}</Grid>
      {
      !progressStatus 
      ? 
      <Grid item lg={8} md={6} sm={12} className={classes.public}>
        <Grid container spacing={3}>
          <Grid item lg={6} md={12} >
            <Card className={classes.normalBlock}>
              <div dangerouslySetInnerHTML={{__html: blocks.length > 0 ? blocks[0].content : ''}}/>
            </Card>
          </Grid>
          <Grid item lg={6} md={12} >
            <Card className={classes.normalBlock}>
              <div dangerouslySetInnerHTML={{__html: blocks.length > 0 ? blocks[1].content : ''}}/>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.normalBlock}>
              <div dangerouslySetInnerHTML={{__html: blocks.length > 0 ? blocks[2].content : ''}}/>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      :
      <></>
      }
    </Grid>
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

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
