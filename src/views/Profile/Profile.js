import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, Link, CircularProgress } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import useStyles from './style';
import user from '../../apis/user';
const Profile = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [progressStatus, setProgressStatus] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    setProgressStatus(true);
    user
    .getProfile()
    .then(response => {
      setProgressStatus(false);
      if (response.code === 401) {
        history.push('/login');
      } else {
        setProfile(response.data.user);
      }
    })
  }, []);
  return (
    <>
    <Grid container spacing={4} className={classes.mainContainer}>
      <Grid item className={classes.userImageBlock}>
        <Card className={classes.userImage}>
          <img className={classes.profileLogo} src="/images/avatars/org_profile.jpg" alt=""/>
        </Card>
      </Grid>
      <Grid item className={classes.profileBlock}>
        <Card className={classes.profileContainer}>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <div className={classes.title}>
                E-mail
              </div>
              <input className={classes.input_box} type="text" value={profile.email} name="email"/>
              {/* <div className={classes.title}>
                Hasło
              </div>
              <input className={classes.input_box} type="password" value={profile.password} name="password"/> */}
              <div ><Link to='/profile/change_password' component={RouterLink} className={classes.resetbtn}>zmiana hasła</Link></div>
            </Grid>
            { profile.first_name ?
            <Grid item xs="6">
              <div className={classes.title}>
                Imię
              </div>
              <input className={classes.input_box} type="text" value={profile.first_name} name="first_name"/>
              <div className={classes.title}>
                Nazwisko
              </div>
              <input className={classes.input_box} type="text" value={profile.last_name} name="last_name"/>
            </Grid>
            :
            <></>
            }
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

export default withRouter(Profile);