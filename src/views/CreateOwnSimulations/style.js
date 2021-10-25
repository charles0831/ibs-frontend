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
    padding: '20px 20px 20px 20px',
    border: theme.palette.contrastColor
  },
  approveBlock: {
    display: 'flex',
    height: '100%',
    alignItems: 'flex-end'
  },
  flexBlock: {
    alignItems: 'center',
    marginBottom: '20px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  itemBlock: {
    paddingLeft: '10px',
    paddingRight: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
  },
  headerBlock: {
    padding: '20px 20px 40px 20px',
    border: theme.palette.contrastColor
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'center',
  },
  selectTitle: {
    color: theme.palette.gray,
    fontSize: '0.8750em',
    fontFamily: 'roboto',
    fontWeight: 400
  },
  subHeader: {
    color: theme.palette.gray,
    fontSize: '1.0625em',
    fontFamily: 'roboto',
    fontWeight: 400,
  },
  controlBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '100px',
    },
  },
  btnSimulate: {
    '& .MuiButton-label': {
      textTransform: 'none',
      fontSize: '0.9375em',
    },
    '& .MuiButton-containedSecondary:hover': {

    },
    '&:hover': {
      backgroundColor: theme.palette.blue
    },
    fontWeight: '300',
    backgroundColor: theme.palette.blue,
    color: theme.palette.black_white,
    width: '100%',
    height: '44px',
    lineHeight: '1'
  },
  btnCreate: {
    '& .MuiButton-label': {
      textTransform: 'none',
      fontSize: '0.9375em',
    },
    '& .MuiButton-containedSecondary:hover': {

    },
    '&:hover': {
      backgroundColor: theme.palette.gray,
      color: theme.palette.black_white,
    },
    '&:disabled': {
      backgroundColor: theme.palette.gray_disable,
      color: 'lightGray',
    },
    fontWeight: '300',
    // border: '1px solid gray',
    backgroundColor: theme.palette.gray,
    color: theme.palette.black_white,
    lineHeight: '1',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
    },
  },
  btn: {
    padding: '15px 40px'
  },

  headerMargin: {
    marginTop: '20px'
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
  seriesLabelItem: {
    width: 'auto',
    height: '60px',
    padding: '15px',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: `1px solid ${theme.palette.pink}`,
    color: theme.palette.pink,
    marginRight: '-1px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.pink,
      color: theme.palette.black_white,
    }
  },
  seriesLabelItemActive: {
    backgroundColor: theme.palette.pink,
    color: theme.palette.black_white,
  },
  scenariosDescription: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.gray,
    color: theme.palette.black_white,
    padding: '10px',
    marginTop: '30px',
    fontWeight: '300'
  },
  headerLabel: {
    textAlign: 'center',
    backgroundColor: theme.palette.gray,
    paddingBottom: '10px',
    paddingTop: '10px',
    marginBottom: '10px',
    border: '1px solid #44545e',
    color: theme.palette.black_white
  },
  whiteHeaderLabel: {
    textAlign: 'center',
    paddingBottom: '10px',
    paddingTop: '10px',
    marginBottom: '10px',
    border: '1px solid gray',
    color: theme.palette.pink
  },
  inputBlock: {
    marginLeft: '20px',
  },
  firstBlock: {
    width: '80px',
  },
  lastBlock: {
    width: '80px'
  },
  mediumBlock: {
    width: '80px'
  },
  seriesTotalBlock: {
    display: 'flex'
  },
  seriesBlock: {
    display: 'inline-flex'
  },
  input_box: {
    '& svg': {
      fill: theme.palette.text.primary
    },
    padding: '12px 10px',
    fontSize: '0.8750em',
    width: '100%',
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.black_white,
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    '&::placeholder': {
      color: theme.palette.text.primary,
      fontStyle: 'italic'
    }
  },
  input_box_black: {
    backgroundColor: theme.palette.gray,
    border: '1px solid gray',
    color: theme.palette.black_white
  },
  overflowBlock: {
    overflow: 'auto',
    marginLeft: '20px',
    width: 'calc(100% - 160px)',
    '&::-webkit-scrollbar': {
      height: '5px',              /* height of horizontal scrollbar ← You're missing this */
      border: '1px solid #d5d5d5'
    },
    '&::-webkit-scrollbar-thumb:horizontal': {
      background: theme.palette.gray,
      borderRadius: '5px'
    }
  },
  scroll_margin: {
    marginBottom: '10px',
  }
}));

export default useStyles;
