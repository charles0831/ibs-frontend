import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Drawer, Button } from '@material-ui/core';
import {
	KokpitIcon,
	JobIcon,
	ModuleIcon,
	HelpIcon,
	ProfileIcon,
	LogoutIcon,
	SavedAnalyzeIcon,
	SimulationIcon,
	SavedSimulationIcon
} from './svgs/icons';
import storage from '../../../../utils/storage';
import { SidebarNav } from './components';
import { withRouter, Link } from 'react-router-dom';
import useStyles from './style';

const Sidebar = props => {
  const { open, variant, history, onClose, className, ...rest } = props;
  const [pages, setPages] = useState([]);
  const classes = useStyles();
  const items = [
    {
      title: 'Kokpit',
      href: '/cockpit',
      icon: <KokpitIcon/>
    },
    {
      title: 'Moduł prognostyczny',
      href: '/forecasting_module',
      tooltip: 'Moduł pozwala przeglądać szczegółowe prognozy popytu na pracę, podaży pracy i luki popytowo-podażowej na polskim rynku pracy w horyzoncie do roku 2050. Prognozy oraz dane historyczne dostępne są w 8 przekrojach ',
      icon: <ModuleIcon/>
    },
    {
      title: 'Własne symulacje',
      href: '/own_simulations',
      tooltip: 'Moduł pozwala dostosowywać prognozy rynku pracy do wybranych założeń ekonomicznych i demograficznych',
      icon: <SimulationIcon/>
    },
    {
      title: 'Zapisane symulacje',
      href: '/saved_simulations',
      tooltip: 'W tej zakładce znajdują się domyślne scenariusze oraz własne symulacje stworzone przez użytkownika',
      icon: <SavedSimulationIcon/>
    },
    {
      title: 'Zapisane analizy',
      href: '/analyzes',
      tooltip: 'W tej zakładce znajdują się zapisane wyniki analiz dla wcześniej wybranych symulacji',
      icon: <SavedAnalyzeIcon/>
    },
    {
      title: 'Moduł Internetowych Ofert Pracy',
      href: '/job_offer',
      tooltip: 'Moduł gromadzi dane o ofertach pracy zamieszczanych na dedykowanych portalach rekrutacyjnych, uzupełniając informacje o niezrealizowanym popycie na pracę oraz wskazując jego bieżące trendy.',
      icon: <JobIcon/>
    },
    {
      title: 'Pomoc',
      href: '/help',
      icon: <HelpIcon/>
    },
    // {
    //   title: 'Twój Profil',
    //   href: '/profile',
    //   icon: <TextFieldsIcon />
    // },
    {
      title: 'Wyloguj',
      href: '/login',
      icon: <LogoutIcon/>
    },
  ];

  const items_admin = [
    {
      title: 'Kokpit',
      href: '/cockpit',
      icon: <KokpitIcon/>
    },
    {
      title: 'Moduł prognostyczny',
      href: '/forecasting_module',
      tooltip: 'Moduł pozwala przeglądać szczegółowe prognozy popytu na pracę, podaży pracy i luki popytowo-podażowej na polskim rynku pracy w horyzoncie do roku 2050. Prognozy oraz dane historyczne dostępne są w 8 przekrojach ',
      icon: <ModuleIcon/>
    },
    {
      title: 'Własne symulacje',
      href: '/own_simulations',
      tooltip: 'Moduł pozwala dostosowywać prognozy rynku pracy do wybranych założeń ekonomicznych i demograficznych',
      icon: <SimulationIcon/>
    },
    {
      title: 'Zapisane symulacje',
      href: '/saved_simulations',
      tooltip: 'W tej zakładce znajdują się domyślne scenariusze oraz własne symulacje stworzone przez użytkownika',
      icon: <SavedSimulationIcon/>
    },
    {
      title: 'Zapisane analizy',
      href: '/analyzes',
      tooltip: 'W tej zakładce znajdują się zapisane wyniki analiz dla wcześniej wybranych symulacji',
      icon: <SavedAnalyzeIcon/>
    },
    {
      title: 'Moduł Internetowych Ofert Pracy',
      href: '/job_offer',
      tooltip: 'Moduł gromadzi dane o ofertach pracy zamieszczanych na dedykowanych portalach rekrutacyjnych, uzupełniając informacje o niezrealizowanym popycie na pracę oraz wskazując jego bieżące trendy.',
      icon: <JobIcon/>
    },
    {
      title: 'Pomoc',
      href: '/help',
      icon: <HelpIcon/>
    },
    // {
    //   title: 'Twój Profil',
    //   href: '/profile',
    //   icon: <TextFieldsIcon />
    // },
    {
      title: 'Wyloguj',
      href: '/login',
      icon: <LogoutIcon/>
    },
    {
      title: 'Zarządzanie',
      href: '#',
      icon: <ProfileIcon/>,
      sub: [{
        title: 'Zarządzanie treścią',
        href: '/content_management',
        icon: <HelpIcon/>
      },
      {
        title: 'Import Ofert Pracy',
        href: '/import_job_offer',
        icon: <JobIcon/>
      }]
    },
  ];
  const logout = () => {
    storage.removeStorage('token');
    history.push('/login');
  };

  useEffect(() => {
    if (storage.getStorage('role') === '1') {
      setPages(items_admin);
    } else {
      setPages(items);
    }
  }, []);
  

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Link to="/cockpit"><img src="/images/logos/main-logo.png" className={classes.main_logo} style={{width: '100%', height: '100%'}}/></Link>
        <SidebarNav
          className={classes.nav}
          pages={pages}
          history={history}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default withRouter(Sidebar);
