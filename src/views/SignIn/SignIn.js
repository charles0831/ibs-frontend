import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@material-ui/core';
import useStyles from './style';
import auth from '../../apis/auth';
import storage from 'utils/storage';
import { useToasts } from 'react-toast-notifications';
import constants from '../../utils/constants';

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();
  const { addToast } = useToasts()
  const [checkStatus, setCheckStatus] = useState(false);
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [progressStatus, setProgressStatus] = useState(false);
  const [tryLogin, setTryLogin] = useState(false);

  const handleChange = event => {
    let arr = JSON.parse(JSON.stringify(input));
    arr[event.target.name] = event.target.value;
    setInput(arr);
  };

  const handleRememberMe = event => {
    setCheckStatus(!checkStatus);
  };
  const handleSignIn = event => {
    setTryLogin(true);
    if ((error && ((error.email && error.email.length > 0 ) || (error.password && error.password.length > 0))) || !input.email || !input.password) {
      addToast(constants.CHECK_ALL_FIELDS, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    } else {
      setProgressStatus(true);
      if (checkStatus) {
        storage.setStorage('email', input.email);
        storage.setStorage('password', input.password);
      } else {
        storage.removeStorage('email');
        storage.removeStorage('password');
      }
      auth
      .login(input.email, input.password)
      .then(response => {
        if (response.code === 200) {
          setProgressStatus(false);
          addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
          setTimeout(function(){history.push('/cockpit');}, 1000);

        } else {
          setProgressStatus(false);
          addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
        }
      }) 
    }
  };
  useEffect(() => {
    let arr = JSON.parse(JSON.stringify(input));
    if (storage.getStorage('email') && storage.getStorage('email').length > 0) {
      arr['email'] = storage.getStorage('email');
    }
    if (storage.getStorage('password') && storage.getStorage('password').length > 0) {
      arr['password'] = storage.getStorage('password');
    }
    setInput(arr);
  }, []);
  useEffect(() => {
    let arr = JSON.parse(JSON.stringify(error));
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (input["email"] && !pattern.test(input["email"])) {
      arr["email"] = constants.ENTER_VALID_EMAIL;
    } else {
      arr["email"] = "";
    }
    if (input["password"] && input["password"].length <= 5) {
      arr["password"] = constants.ENTER_PASSWORD;
    } else {
      arr["password"] = "";
    }

    setError(arr);
  }, [input]);

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSignIn();
    }
  }
  return (
    <>
      <div className={classes.root}>
        <div className={classes.mainContainer}>
          <div className={classes.footerContainer}>
            <img src="/images/logos/footer_logo.png" className={classes.unionLogo} />
          </div>
          <div className={classes.logoContainer}>
            <div className={classes.logo} />
          </div>
          <div className={classes.switchContainer}>
            <div className={classes.switchTab}>
              <Link to="/login" component={RouterLink} className={classes.tabLogin}>Logowanie</Link>
              <Link to="/register" component={RouterLink} className={classes.tabRegister}>Rejestracja</Link>
            </div>
          </div>
          <div className={classes.loginForm}>
            <div>
              <div className={classes.loginMainForm}>
                <div className={classes.inputForm}>
                  <input className={classes.input_box} type="email" value={input.email} name="email" placeholder="E-mail" onChange={handleChange} onKeyPress={handleKeyPress} autocomplete='off'/>
                  <div className={classes.error_log}>{tryLogin && error["email"] && error["email"].length > 0 && error.email}</div>
                  <input className={classes.input_box} type="password" value={input.password} name="password" placeholder="Has??o" onChange={handleChange} onKeyPress={handleKeyPress}/>
                  <div className={classes.error_log}>{tryLogin && error["password"] && error["password"].length > 0 && error.password}</div>
                  <FormControlLabel
                    className={classes.rememberMe}
                    control={
                      <Checkbox
                        checked={checkStatus}
                        onChange={handleRememberMe}
                      />
                    }
                    label="Zapami??taj mnie"
                  />
                </div>
              </div>
              <div className={classes.buttonContainer}>
                <div className={classes.btnForgetContainer}>
                  <Link to="/forgotpassword" component={RouterLink} className={classes.btnForgot}>Przypomnij has??o</Link>
                </div>
                <div className={classes.btnLoginContainer}>
                  <Button variant="contained" color="secondary" className={classes.btnLogin} onClick={handleSignIn}>
                    Zaloguj si??
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {
        progressStatus ?
        <>
        <div className={classes.progressContainer}>
          <CircularProgress className={classes.progress}/>
        </div>
        </>
        :
        <></>
      }
    </>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
