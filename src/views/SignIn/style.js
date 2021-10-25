import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.mainBackground,
    [theme.breakpoints.down('sm')]: {
      padding: '20px 20px 0px 20px'
    },
    [theme.breakpoints.up('ms')]: {
      padding: '20px 20px 0px 20px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 20px 0px 20px'
    },
    
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
    marginTop: '80px',
    display: 'flex',
    // justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('ms')]: {
      justifyContent: 'flex-end',
    },
  },
  switchTab: {
    marginBottom: '70px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0px'
    },
    [theme.breakpoints.up('ms')]: {
      paddingRight: '30px'
    },
  },
  tabLogin: {
    '&:hover': {
      textDecoration: 'none'
    },
    color: theme.palette.pink,
    fontWeight: 500,
    fontFamily: 'roboto',
    [theme.breakpoints.down('sm')]: {
      marginRight: '50px',
    },
    [theme.breakpoints.up('ms')]: {
      marginRight: '20px',
    },

  },
  tabRegister: {
    '&:hover': {
      textDecoration: 'none'
    },
    fontWeight: 500,
    fontFamily: 'roboto',
    color: theme.palette.gray,
  },
  loginMainForm: {

    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
    },
    [theme.breakpoints.up('ms')]: {
      paddingLeft: '10px',
      paddingRight: '40px',
    },
  },
  inputForm: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0px',
    },
    [theme.breakpoints.up('ms')]: {
      paddingRight: '20px',
    },

  },
  rememberMe: {
    marginTop: '30px',
    '& .MuiTypography-body1': {
      color: theme.palette.gray,

    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.checked_color,
    },
  },
  buttonContainer: {
    marginTop: '90px',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.up('ms')]: {
      display: 'flex',
    },
  },
  btnLoginContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  btnForgetContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  input_box: {
    '& svg': {
      fill: theme.palette.text.primary
    },
    padding: '12px 30px',

    marginTop: '20px',
    width: '100%',
    fontFamily: 'roboto',
    '&::placeholder': {
      color: theme.palette.gray,
      fontWeight: 500,
    }
  },
  error_log: {
    color: 'red',
    fontFamily: 'roboto'
  },
  btnLogin: {
    '& .MuiButton-label': {
      textTransform: 'none',
      fontSize: '1.0625em',
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
    textAlign: 'center',
    width: '100%',
    color: theme.palette.blue,
    fontSize: '1.0625em',
    fontFamily: 'roboto',
    fontWeight: '400',
    lineHeight: '1.75',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('ms')]: {
      marginBottom: theme.spacing(0)
    },
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
  },
  unionLogo: {
    backgroundImage: 'url(/images/logos/footer_logo.png)',
    width: '100%',
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
  }
}));

export default useStyles;
