import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.mainBackground,
    padding: '40px 80px 30px 120px',
  },
  mainContainer: {
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    backgroundImage: 'url(/images/logos/logo.png)',
    width: '320px',
    height: '80px'
  },
  loginForm: {
  },
  switchContainer: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  switchTab: {
    marginBottom: '80px',
    paddingRight: '30px'
  },
  notify: {
    marginTop: theme.spacing(2),
    fontFamily: 'roboto',
    fontSize: '14px',
    color: 'red'
  },
  tabLogin: {
    '&:hover': {
      textDecoration: 'none'
    },
    color: theme.palette.pink,
    marginRight: '20px',
    fontWeight: '500',
    fontFamily: 'roboto',
  },
  tabRegister: {
    '&:hover': {
      textDecoration: 'none'
    },
    fontWeight: '500',
    fontFamily: 'roboto',
    color: theme.palette.gray,
  },
  loginMainForm: {
    paddingLeft: '10px',
    paddingRight: '40px',
  },
  inputForm: {
    paddingRight: '20px',
  },
  rememberMe: {
    marginTop: '30px',
    '& .MuiTypography-body1': {
      
      color: theme.palette.gray,
    },
  },
  buttonContainer: {
    marginTop: '120px',
    display: 'flex',
    paddingLeft: '10px'
  },
  btnLoginContainer: {
    width: '330px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input_box: {
'& svg': {
            fill: theme.palette.text.primary
        },
    padding: '12px 30px',
    
    marginTop: '20px',
    width: '330px',
    fontFamily: 'roboto',
    '&::placeholder': {
      color: theme.palette.gray,
      fontWeight: '500'
    }
  },
  error_log: {
    color: 'red',
    fontFamily: 'roboto',
  },
  btnLogin: {
    '& .MuiButton-label': {
      textTransform: 'none',
      fontSize: '1.0625em',
    },
    '& .MuiButton-containedSecondary:hover': {

    },
    '&:hover': {
      backgroundColor: theme.palette.blue
    },
    padding: '4px',
    fontWeight: '300',
    backgroundColor: theme.palette.blue,
    color: theme.palette.black_white,
    width: '100%'
  },
  btnForgot: {
    '&:hover': {
      textDecoration: 'none'
    },
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    color: theme.palette.blue,
    fontSize: '1.0625em',
    fontFamily: 'roboto',
    fontWeight: '400',
    lineHeight: '1.75',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
    marginBottom: '0px'
  },
  unionLogo: {
    backgroundImage: 'url(/images/logos/footer_logo.png)',
    width: '80%',
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  progressContainer: {
    position: 'absolute',
    top: '50%',
    width: '576px',
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    color: theme.palette.pink
  },
  titleBlock: {
    color: theme.palette.pink,
    fontWeight: '400',
    fontSize: '1.125em',
    fontFamily: 'roboto',
    marginBottom: '25px'
  }
}));

export default useStyles;
