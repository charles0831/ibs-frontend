/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, Collapse, ListItemIcon, Tooltip } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    padding: '20px 16px 20px 56px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: 400,
    
    color: theme.palette.sidebar_color,
    lineHeight: '1em',
    '& path': {
			fill: theme.palette.sidebar_title_color,
		},
    '&:hover': {
      backgroundColor: theme.palette.sidebar_active_background,
      color: theme.palette.sidebar_active_color,
      fontWeight: 400,
      borderRadius: '0px',
      
      '& $icon': {
        color: theme.palette.sidebar_hover_color,
				'& path': {
					fill: theme.palette.sidebar_active_color,
				}
      },
    },
  },
  button_sub: {
    padding: '20px 16px 20px 70px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: 400,
    
    color: theme.palette.sidebar_color,
    lineHeight: '1em',
    '& path': {
			fill: theme.palette.sidebar_title_color,
		},
    '&:hover': {
      backgroundColor: theme.palette.sidebar_active_background,
      color: theme.palette.sidebar_hover_color,
      fontWeight: 400,
      borderRadius: '0px',
      	
      '& $icon': {
        color: theme.palette.sidebar_hover_color,
				'& path': {
					fill: theme.palette.sidebar_active_color,
				}
      },
    },
  },
  icon: {
    // color: theme.palette.sidebar_color,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(3),
    // '&:hover': {
    //   color: theme.palette.sidebar_active_color,
    //   '& path': {
		// 		fill: theme.palette.sidebar_active_color,
		// 	}
    // },
  },
  active: {
    fontWeight: 400,
    '& path': {
			fill: theme.palette.sidebar_hover_color,
		},
    '& $icon': {
      color: theme.palette.sidebar_active_color
    },
    backgroundColor: theme.palette.sidebar_active_background,
    color: theme.palette.sidebar_active_color,
    borderRadius: '0px'
  },
  active_sub: {

  },
  title: {
    width: '150px'
  },
  sub_list: {
    padding: '0px'
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, history, ...rest } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClick = (page) => {
    if (page.sub) {
      setOpen(!open)
    } else {
      history.push(page.href);
    }
  }
  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <>
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
          onClick={() => handleClick(page)}
        >
          {
            page.tooltip ? 
              <Tooltip arrow title={page.tooltip} placement="right-start">
                <Button
                  activeClassName={!page.sub ? classes.active : classes.active_sub}
                  className={classes.button}
                  component={CustomRouterLink}
                  to={page.href}
                >
                  <div className={classes.icon}>{page.icon}</div>
                  <div className={classes.title}>
                    {page.title}
                  </div>
                  {
                    page.sub ?
                      open ? <ExpandLess /> : <ExpandMore />
                    :
                      <></>
                  }
                </Button>
              </Tooltip>
            :
              <Button
                activeClassName={!page.sub ? classes.active : classes.active_sub}
                className={classes.button}
                component={CustomRouterLink}
                to={page.href}
              >
                <div className={classes.icon}>{page.icon}</div>
                <div className={classes.title}>
                  {page.title}
                </div>
                {
                  page.sub ?
                    open ? <ExpandLess /> : <ExpandMore />
                  :
                    <></>
                }
              </Button>
          }
        </ListItem>
        {
          page.sub ? 
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List className={classes.sub_list}>
              {
                page.sub.map((item, index) => (
                  <ListItem
                    disableGutters
                    className={classes.item}
                  >
                    <Button
                        activeClassName={classes.active}
                        className={classes.button_sub}
                        component={CustomRouterLink}
                        to={item.href}
                      >
                        <div className={classes.icon}>{item.icon}</div>
                        {/* <div className={classes.icon}>{item.icon}</div> */}
                        <div className={classes.title}>
                          {item.title}
                        </div>
                      </Button>
                  </ListItem>
                ))
              }
            </List>
          </Collapse>
          :
          <></>
        }
        
        </>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
