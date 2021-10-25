import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CircularProgress, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import useStyles from './style';
import user from '../../apis/user';
import constants from '../../utils/constants';

const ChangePassword = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [progressStatus, setProgressStatus] = useState(false);
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const { addToast } = useToasts()
  
  const handleChangePassword = () => {
    if ((error && ((error.old_password && error.old_password.length > 0) || (error.new_password && error.new_password.length > 0 ) || (error.repeat_new_password && error.repeat_new_password.length > 0 ))) 
      || !input.old_password || !input.new_password || !input.repeat_new_password) {
      addToast(constants.CHECK_ALL_FIELDS, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    } else {
      setProgressStatus(true);
      user
      .changePassword(input.old_password, input.new_password)
      .then(response => {
        if (response.code === 200) {
          addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true});
          setTimeout(function(){history.push('/profile');}, 1000);
        } else {
          addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true})
        }
        setProgressStatus(false);
      })
    }
  }

  const handleChange = event => {
    let arr = JSON.parse(JSON.stringify(input));
    arr[event.target.name] = event.target.value;
    setInput(arr);
    handleError(arr);
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleChangePassword();
    }
  }

  const handleError = (input) => {
    let arr = JSON.parse(JSON.stringify(error));
    if (input["old_password"] && input["old_password"].length <= 5) {
      arr["old_password"] = constants.ENTER_PASSWORD;
    } else {
      arr["old_password"] = "";
    }
    var pass_pattern = new RegExp(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/);
    if (!pass_pattern.test(input["new_password"])) {
      arr["new_password"] = constants.ENTER_PASSWORD;
    } else {
      arr["new_password"] = "";
    }
    let reset_password = input["repeat_new_password"];
    let password = input["new_password"];
    if (input["repeat_new_password"] && reset_password !== password) {
      arr["repeat_new_password"] = constants.ENTER_SAME_PASSWORD;
    } else {
      arr["repeat_new_password"] = "";
    }
    setError(arr);
  };

  return (
    <>
    <Grid container spacing={4} className={classes.mainContainer}>
      <Grid item md={8} xs={12}>
        <Card className={classes.profileContainer}>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12} >
              <div className={classes.title}>
                Stare hasło
              </div>
              <input className={classes.input_box} type="password" name="old_password" value={input.old_password} onChange={handleChange} onKeyPress={handleKeyPress}/>
              <div className={classes.error_log}>{error["old_password"] && error["old_password"].length > 0 && error.old_password}</div>
              <div className={classes.notify}>Hasło musi zawierać minimum 8 znaków, małe i wielkie litery oraz cyfry, a dodatkowo posiadać minimum jeden znak specjalny: !,@,#,?</div>
              <div className={classes.title}>
                Nowe hasło
              </div>
              <input className={classes.input_box} type="password" name="new_password" value={input.new_password} onChange={handleChange} onKeyPress={handleKeyPress}/>
              <div className={classes.error_log}>{error["new_password"] && error["new_password"].length > 0 && error.new_password}</div>
              <div className={classes.title}>
                Powtórz nowe hasło
              </div>
              <input className={classes.input_box} type="password" name="repeat_new_password" value={input.repeat_new_password} onChange={handleChange} onKeyPress={handleKeyPress}/>
              <div className={classes.error_log}>{error["repeat_new_password"] && error["repeat_new_password"].length > 0 && error.repeat_new_password}</div>
              <Button variant="contained" color="secondary" className={classes.btnRegister} onClick={handleChangePassword}>
                Zmień swoje hasło
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
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

export default withRouter(ChangePassword);