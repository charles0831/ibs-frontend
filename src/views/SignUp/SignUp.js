import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Grid
} from '@material-ui/core';
import {
  AlertDialog
} from 'components';
import useStyles from './style';
import auth from '../../apis/auth';
import { useToasts } from 'react-toast-notifications';
import constants from '../../utils/constants';

const SignUp = props => {

  const classes = useStyles();
  const [checkStatus, setCheckStatus] = useState(false);
  const [privacyStatus, setPrivacyStatus] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [registered, setRegistered] = useState(false);
  const { addToast } = useToasts()
  const [progressStatus, setProgressStatus] = useState(false);

  const handleError = (input) => {
    let arr = JSON.parse(JSON.stringify(error));
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (input["email"] && !pattern.test(input["email"])) {
      arr["email"] = constants.ENTER_VALID_EMAIL;
    } else {
      arr["email"] = "";
    }
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
  }

  const handleChange = event => {
    let arr = JSON.parse(JSON.stringify(input));
    arr[event.target.name] = event.target.value;
    setInput(arr);
    handleError(arr);
  };

  const handleRememberMe = event => {
    setCheckStatus(!checkStatus);
    setContent(constants.GOVERNMENT_DOC);
    setTitle('Rządowe regulacje biznesowe');
    setDialogOpen(true);
  };

  const handleCheckPrivacy = event => {
    setPrivacyStatus(!privacyStatus);
    setContent(constants.PRIVACY_DOC);
    setTitle('Przepisy dotyczące prywatności danych osobowych');
    setDialogOpen(true);
  }

  const handleSignUp = event => {
    setRegistered(true);
    if ((error && ((error.email && error.email.length > 0) || (error.password && error.password.length > 0) || (error.reset_password && error.reset_password.length > 0)))
      || !input.email || !input.password || !input.reset_password) {
      addToast(constants.CHECK_ALL_FIELDS, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    } else if (!checkStatus) {
      addToast(constants.CHECk_POLICY, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    } else if (!privacyStatus) {
      addToast(constants.CHECK_PERSONAL_PRIVACY, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    }
    else {
      setProgressStatus(true);
      auth
        .register(input.email, input.password, false)
        .then(response => {
          if (response.code === 200) {
            addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
          } else {
            addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
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
                  <input className={classes.input_box} type="email" value={input.email} name="email" placeholder="E-mail" onChange={handleChange} onKeyPress={handleKeyPress} />
                  <div className={classes.error_log}>{registered && error["email"] && error["email"].length > 0 && error.email}</div>
                  <div className={classes.notify}>Hasło musi zawierać minimum 8 znaków, małe i wielkie litery oraz cyfry, a dodatkowo posiadać minimum jeden znak specjalny: !,@,#,?</div>
                  <input className={classes.input_box} type="password" value={input.password} name="password" placeholder="Hasło" onChange={handleChange} onKeyPress={handleKeyPress} />
                  <div className={classes.error_log}>{registered && error["password"] && error["password"].length > 0 && error.password}</div>
                  <input className={classes.input_box} type="password" value={input.reset_password} name="reset_password" placeholder="Powtórz hasło" onChange={handleChange} onKeyPress={handleKeyPress} />
                  <div className={classes.error_log}>{registered && error["reset_password"] && error["reset_password"].length > 0 && error.reset_password}</div>
                  <Grid container>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        className={classes.personalPrivacy}
                        control={
                          <Checkbox
                            checked={privacyStatus}
                            onChange={handleCheckPrivacy}
                            color="theme.palette.pink"
                          />
                        }
                        label="Akceptuję politykę przetwarzania danych osobowych"
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className={classes.buttonContainer}>
                <div className={classes.btnRegisterContainer}>
                  <Button variant="contained" color="secondary" className={classes.btnRegister} onClick={handleSignUp}>
                    Zarejestruj się
                  </Button>
                  <AlertDialog open={dialogOpen} setOpen={setDialogOpen} content={content} title={title}/>
                  {/* <Link to="/registerAsAdvanced" component={RouterLink} className={classes.registerAsAdvanced}>
                  <div className={classes.registerAsAdvanced_firstline}>
                    Zarejestruj się jako
                  </div>
                  <div className={classes.registerAsAdvanced_secondline}>
                    użytkownik zaawansowany
                  </div>
                </Link> */}
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
              <CircularProgress className={classes.progress} />
            </div>
          </>
          :
          <></>
      }
    </>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
