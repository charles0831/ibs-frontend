import { makeStyles, useTheme } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    backgroundColor: theme.palette.mainBackground,
    width: '576px',
    height: '100%',
    boxShadow: '0px 0px 20px grey',
  },
  public: {
    '& .ql-align-right': {
      textAlign: 'right'
    },
    '& .ql-align-left': {
      textAlign: 'left'
    },
    '& .ql-align-center': {
      textAlign: 'center'
    },
    '& .ql-video': {
      width: '100%',
      height: '180px'
    },
    '& video': {

    },
    '& .ql-size-small': {
      fontSize: '0.75em'
    },
    color: theme.palette.gray,
    fontSize: '0.9375em',
    fontFamily: 'roboto',
    fontWeight: 400,
  },
  normalBlock: {
    padding: '30px 30px 30px 30px',
    '& img': {
      width: '100%'
    },
    border: theme.palette.contrastColor
  },
  downloadBlock: {
    padding: '30px 30px 30px 30px',
    border: theme.palette.contrastColor
  },
  controlBlock: {
    padding: '30px 30px 70px 30px',
    height: '100%',
    textAlign: 'center'
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    color: theme.palette.gray,
    fontSize: '1.375em',
    fontFamily: 'roboto',
    fontWeight: 400
  },
  subHeader: {
    color: theme.palette.gray,
    fontSize: '0.9375em',
    fontFamily: 'roboto',
    fontWeight: 400,
    marginTop: '60px',
    marginBottom: '30px'
  },
  btnOpen: {
    '& .MuiButton-label': {
        textTransform: 'none',
        fontSize: '0.9375em',
    },
    '& .MuiButton-containedSecondary:hover': {

    },
    '&:hover': {
        backgroundColor: theme.palette.pink
    },
    padding: '4px',
    border: '1px solid #D6324B',
    fontWeight: '300',
    backgroundColor: theme.palette.pink,
    color: theme.palette.black_white,
    marginLeft: '20px',
    marginRight: '20px',
    paddingLeft: '40px',
    paddingRight: '40px',
    width: '25%'
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
}));

export default useStyles;
