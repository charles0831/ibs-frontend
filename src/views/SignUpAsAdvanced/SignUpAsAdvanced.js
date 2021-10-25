import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications'
import {
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@material-ui/core';
import useStyles from './style';
import auth from '../../apis/auth';
import constants from '../../utils/constants';

const SignUpAsAdvanced = props => {

  const classes = useStyles();

  const [checkStatus, setCheckStatus] = useState(false);
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const { addToast } = useToasts()
  const [progressStatus, setProgressStatus] = useState(false);
  useEffect(() => {
    
  }, []);

  const handleChange = event => {
    let arr = JSON.parse(JSON.stringify(input));
    arr[event.target.name] = event.target.value;
    setInput(arr);
  };

  const handleRememberMe = event => {
    setCheckStatus(!checkStatus);
  };

  const handleSignUp = event => {
    if ((error && 
      ((error.email && error.email.length > 0 ) 
      || (error.password && error.password.length > 0) 
      || (error.reset_password && error.reset_password.length > 0 )
      || (error.first_name && error.first_name.length > 0)
      || (error.last_name && error.last_name.length > 0)))
      || !input.email || !input.password || !input.reset_password || !input.first_name || !input.last_name) {
      addToast(constants.CHECK_ALL_FIELDS, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    } else if (!checkStatus) {
      addToast(constants.CHECk_POLICY, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true})
    }
    else {
      setProgressStatus(true);
      auth
      .register(input.email, input.password, true, input.first_name, input.last_name)
      .then(response => {
        if (response.code === 200) {
          addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true})
        } else {
          addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true})
        }
        setProgressStatus(false);
      }) 
    }
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSignUp();
    }
  }

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
    let reset_password = input["reset_password"];
    let password = input["password"];
    if (input["reset_password"] && reset_password !== password) {
      arr["reset_password"] = constants.ENTER_SAME_PASSWORD;
    } else {
      arr["reset_password"] = "";
    }
    if (input["first_name"] && input["first_name"].length === 0) {
      arr["first_name"] = "Please enter the first name."
    } else {
      arr["first_name"] = "";
    }
    if (input["last_name"] && input["last_name"].length === 0) {
      arr["last_name"] = "Please enter the last name."
    } else {
      arr["last_name"] = "";
    }
    setError(arr);
  }, [input]);

  return (
    <>
    <div className={classes.root}>
      <div className={classes.mainContainer}>
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
                <input className={classes.input_box} type="email" value={input.email} name="email" placeholder="E-mail" onChange={handleChange} onKeyPress={handleKeyPress}/>
                <div className={classes.error_log}>{error["email"] && error["email"].length > 0 && error.email}</div>
                <input className={classes.input_box} type="password" value={input.password} name="password" placeholder="Hasło" onChange={handleChange} onKeyPress={handleKeyPress}/>
                <div className={classes.error_log}>{error["password"] && error["password"].length > 0 && error.password}</div>
                <input className={classes.input_box} type="password" value={input.reset_password} name="reset_password" placeholder="Powtórz hasło" onChange={handleChange} onKeyPress={handleKeyPress}/>
                <div className={classes.error_log}>{error["reset_password"] && error["reset_password"].length > 0 && error.reset_password}</div>
                <input className={classes.input_box} type="text" value={input.first_name} name="first_name" placeholder="Imię" onChange={handleChange} onKeyPress={handleKeyPress}/>
                <div className={classes.error_log}>{error["first_name"] && error["first_name"].length > 0 && error.first_name}</div>
                <input className={classes.input_box} type="text" value={input.last_name} name="last_name" placeholder="Nazwisko" onChange={handleChange} onKeyPress={handleKeyPress}/>
                <div className={classes.error_log}>{error["last_name"] && error["last_name"].length > 0 && error.last_name}</div>
                <FormControlLabel
                  className={classes.rememberMe}
                  control={
                    <Checkbox
                      checked={checkStatus}
                      onChange={handleRememberMe}
                      color="theme.palette.pink"
                    />
                  }
                  label="Akceptuję Regulamin"
                />
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <div className={classes.btnRegisterContainer}>
                <Button variant="contained" color="secondary" className={classes.btnRegister} onClick={handleSignUp}>
                  Zarejestruj się
                </Button>
              </div>
            </div>
          </div>
        </div>     
      </div>
    </div>
    <div className={classes.footerContainer}>
      <img src="/images/logos/footer_logo.png" className={classes.unionLogo} />
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

SignUpAsAdvanced.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUpAsAdvanced);
