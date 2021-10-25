import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({

  mainContainer: {
  },
  userImage: {
    height: '100%'
  },
  profileContainer: {
    padding: '30px 20px 80px 30px',
    backgroundColor: theme.palette.topbar_background,
    border: theme.palette.contrastColor
  },
  notify: {
    marginTop: theme.spacing(2),
    fontFamily: 'roboto',
    fontSize: '14px',
    color: 'red'
  },
  input_box: {
    '& svg': {
      fill: theme.palette.text.primary
    },
    backgroundColor: theme.palette.mainBackground,
    border: `1px solid ${theme.palette.text.primary}`,
    padding: '12px 30px',

    width: '100%',
    color: theme.palette.gray,
    fontWeight: '500',
    fontFamily: 'roboto',
    '&::placeholder': {
      color: theme.palette.gray,
      fontWeight: '600'
    }
  },
  title: {
    color: theme.palette.gray,
    fontSize: '1em',
    fontFamily: 'roboto',
    marginBottom: '5px',
    fontWeight: '400'
  },
  resetbtn: {

    cursor: 'pointer',
    fontFamily: 'roboto',
    color: theme.palette.pink
  },
  profileLogo: {
    height: '100%',
    width: '100%'
  },
  imageInput: {
    display: 'none'
  },
  progressContainer: {
    position: 'absolute',
    top: '50%',
    width: 'calc(100% - 576px)',
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    color: theme.palette.pink
  },
  btnRegister: {
    '& .MuiButton-label': {
      textTransform: 'none',
      fontSize: '1.125em',
    },
    '& .MuiButton-containedSecondary:hover': {

    },
    '&:hover': {
      backgroundColor: theme.palette.pink
    },
    padding: '4px',
    fontWeight: '400',
    backgroundColor: theme.palette.pink,
    color: theme.palette.black_white,
    width: '100%',
    marginTop: '20px'
  },
  error_log: {
    color: 'red',
    fontFamily: 'roboto',
    marginBottom: '20px',
  },
}));

export default useStyles;
