import React, { Component } from 'react';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { ToastProvider } from 'react-toast-notifications';
import AppContainer from './AppContainer';
const browserHistory = createBrowserHistory();
const SiteInfoContext = React.createContext(null);
const SiteInfoContextConsumer = SiteInfoContext.Consumer;
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  state = {
    is_contrast: false,
  }
  toggleContrast = () => {
    this.setState({is_contrast: !this.state.is_contrast});
  }
  render() {
    return (
      <ToastProvider>
        <SiteInfoContext.Provider value={{
				...this.state,
				toggleContrast: this.toggleContrast	
			}} >
          <ThemeProvider theme={theme(this.state.is_contrast)}>
            <Router history={browserHistory}>
              <AppContainer>
                <Routes />
              </AppContainer>
            </Router>
          </ThemeProvider>
        </SiteInfoContext.Provider>
      </ToastProvider>
    );
  }
}

export { SiteInfoContextConsumer };