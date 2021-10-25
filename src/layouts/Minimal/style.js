import { makeStyles, useTheme } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
  },
  content: {
    backgroundColor: theme.palette.mainBackground,
    // width: '576px',
    boxShadow: '0px 0px 20px grey',
    minHeight: '100vh',
    overflow: 'auto',
    height: '100vh'
  },
  public: {
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    fontFamily: 'roboto',
    '& .ql-align-right': {
      textAlign: 'right',
      '& img': {
        width: '60%'
      }
    },
    '& .ql-align-left': {
      textAlign: 'left'
    },
    '& .ql-align-center': {
      textAlign: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  normalBlock: {
    padding: '30px 30px 70px 30px',
    height: '100%'
  },
  progressContainer: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
      color: theme.palette.pink
  },
}));

export default useStyles;
