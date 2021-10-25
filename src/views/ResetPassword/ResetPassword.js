import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Link,
  CircularProgress
} from '@material-ui/core';
import useStyles from './style';
import auth from '../../apis/auth';
import { useToasts } from 'react-toast-notifications';
import {useLocation } from "react-router-dom";
import constants from '../../utils/constants';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ResetPassword = props => {
  const { history } = props;
  let query = useQuery();
  let token = query.get("token");
  const classes = useStyles();
  const { addToast } = useToasts()
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [progressStatus, setProgressStatus] = useState(false);

  const handleChange = event => {
    let arr = JSON.parse(JSON.stringify(input));
    arr[event.target.name] = event.target.value;
    setInput(arr);
  };

  const handleResetPassword = event => {
    if ((error && ((error.password && error.password.length > 0 ) || (error.reset_password && error.reset_password.length > 0))) || !input.password || !input.reset_password) {
      addToast(constants.CHECK_ALL_FIELDS, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    } else {
      setProgressStatus(true);
      auth
      .reset_password(input.password, token)
      .then(response => {
        if (response.code === 200) {
          setProgressStatus(false);
          addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
          setTimeout(function(){history.push('/login')}, 1000);
          // history.push('/login');
        } else {
          setProgressStatus(false);
          addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
        }
      }) 
    }
  };
  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleResetPassword();
    }
  }
  useEffect(() => {
  }, []);
  useEffect(() => {
    let arr = JSON.parse(JSON.stringify(error));
    var pass_pattern = new RegExp(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/);
    if (!pass_pattern.test(input["password"])) {
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
                <div className={classes.titleBlock}>
                  Ustaw nowe hasło
                </div>
                <div className={classes.notify}>Hasło musi zawierać minimum 8 znaków, małe i wielkie litery oraz cyfry, a dodatkowo posiadać minimum jeden znak specjalny: !,@,#,?</div>
                <div className={classes.inputForm}>
                  <input className={classes.input_box} type="password" value={input.password} name="password" placeholder="Hasło" onChange={handleChange} onKeyPress={handleKeyPress}/>
                  <div className={classes.error_log}>{error["password"] && error["password"].length > 0 && error.password}</div>
                  <input className={classes.input_box} type="password" value={input.reset_password} name="reset_password" placeholder="Powtórz hasło" onChange={handleChange} onKeyPress={handleKeyPress}/>
                  <div className={classes.error_log}>{error["reset_password"] && error["reset_password"].length > 0 && error.reset_password}</div>
                </div>
              </div>
              <div className={classes.buttonContainer}>
                <div className={classes.btnLoginContainer}>
                  <Button variant="contained" color="secondary" className={classes.btnLogin} onClick={handleResetPassword}>
                    Ustaw hasło
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

ResetPassword.propTypes = {
  history: PropTypes.object
};

export default withRouter(ResetPassword);
