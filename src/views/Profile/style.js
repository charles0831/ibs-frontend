import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  
  mainContainer: {
    display: 'flex'
  },
  userImage: {
    height: '100%'
  },
  profileContainer: {
    padding: '30px 20px 80px 30px',
    backgroundColor: theme.palette.topbar_background,
    border: theme.palette.contrastColor
  },
  input_box: {
  '& svg': {
        fill: theme.palette.text.primary
    },
    padding: '12px 30px',
    marginBottom: '20px',
    width: '100%',
    color: theme.palette.gray,
    fontWeight: '400',
    fontFamily: 'roboto',
    backgroundColor: theme.palette.mainBackground,
    border: `1px solid ${theme.palette.text.primary}`,
    '&::placeholder': {
      color: theme.palette.gray,
      fontWeight: '400'
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
    color: theme.palette.pink,
  },
  userImageBlock: {

    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    [theme.breakpoints.up('md')]: {
      width: 'fit-content',
    },    
  },
  profileBlock: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 260px)',
    },
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
  }
}));

export default useStyles;
