import React, { useState } from 'react';
import { SiteInfoContextConsumer } from "App";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './style';
import { useHistory } from "react-router-dom";
import storage from '../../../../utils/storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFont, faLink, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Topbar = props => {
  const { className, title, onSidebarOpen, onSidebarClose, openSidebar, ...rest } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarOpen, setAvatarOpen] = useState(Boolean(anchorEl));
  const classes = useStyles();
  let history = useHistory();
  const onMaxTopbar = () => {
    if (openSidebar === false)
      onSidebarOpen();
    else
      onSidebarClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
    setAvatarOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setAvatarOpen(true);
  };

  const handleProfile = () => {
    handleClose();
    history.push('/profile');
  }

  const handleLogout = () => {
    handleClose();
    storage.removeStorage('token');
    history.push('/login');
  }

  const changeFontSize = e => {
    e.preventDefault();
    let
      target = e.target,
      body = document.body,
      fontSize = parseInt(window.getComputedStyle(body).fontSize.replace("px", "")),
      fontAction;
    if (target.tagName === 'svg')
      target = target.parentElement.parentElement.parentElement;
    if (target.tagName === 'path')
      target = target.parentElement.parentElement.parentElement.parentElement;
    if (target.name === 'plus')
      fontAction = 'more';
    else if (target.name === 'minus')
      fontAction = 'less';
    else if (target.name === 'normal')
      fontAction = 'normal';
      
    if (fontAction === 'less' && fontSize > 10) fontSize -= 1;
    if (fontAction === 'more' && fontSize < 22) fontSize += 1;
    if (fontAction === 'normal') fontSize = 16;

    fontSize += "px";
    body.style.fontSize = fontSize;
  }

  const toggleUnderlineLinks = e => {
    e.preventDefault();
    document.body.classList.toggle("links-underline");
  }

  const toggleDarkContrast = (e) => {
    e.preventDefault();
  }

  return (
    <SiteInfoContextConsumer>
    { (props) => (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.toolbar}>
        <div className={classes.titlebar}>
          <Button className={classes.close_drawer_icon} onClick={onMaxTopbar}>
            <MenuIcon />
          </Button>
          <div className={classes.title}>
            {title}
          </div>
        </div>
        <div className={classes.rightControllerArea}>
          <div className={classes.controllerArea}>
            <div className={classes.vertical_separator}/>
            <Button onClick={(e) => changeFontSize(e)} name="plus">
              <div className={classes.helper} >
                <FontAwesomeIcon icon={faFont} size="2x" />
                <FontAwesomeIcon icon={faPlus} size="1x" />
              </div>
            </Button>
            <div className={classes.vertical_separator}/>
            <Button onClick={(e) => changeFontSize(e)} name="normal">
              <div href="#" className={classes.helper} >
                  <FontAwesomeIcon icon={faFont} size="2x"/>
              </div>
            </Button>
            <div className={classes.vertical_separator}/>
            <Button onClick={(e) => changeFontSize(e)} name="minus">
              <div href="#" className={classes.helper} >
                  <FontAwesomeIcon icon={faFont} size="2x"/>
                  <FontAwesomeIcon icon={faMinus} size="1x"/>
              </div>
            </Button>
            <div className={classes.vertical_separator}/>
            <Button onClick={(e) => {e.preventDefault(); props.toggleContrast();}}>
              <div href="#" className={classes.helper} >
                  <FontAwesomeIcon icon={faEye} size="2x"/>
              </div>
            </Button>
            <div className={classes.vertical_separator}/>
            <Button onClick={(e) => toggleUnderlineLinks(e)}>
              <div href="#" className={classes.helper}>
                  <FontAwesomeIcon icon={faLink} size="2x"/>
              </div>
            </Button>
            <div className={classes.vertical_separator}/>
          </div>
          <div className={classes.avatar}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle className={classes.avataricon} />
            </IconButton>
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
              open={avatarOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Ustawienia</MenuItem>
              <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </AppBar>
    )}
    </SiteInfoContextConsumer>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
