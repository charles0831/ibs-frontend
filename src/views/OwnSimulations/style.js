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
    marginBottom: theme.spacing(2),
    position: 'relative',
    
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '90px',
    },
    [theme.breakpoints.up('md')]: {
      width: '20%',
      height: '100px',
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
    fontWeight: 400,
    marginBottom: theme.spacing(1)
  },
  subHeader: {
    color: theme.palette.gray,
    fontSize: '1.0625em',
    fontFamily: 'roboto',
    fontWeight: 400,
  },
  controlBlock: {

    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(30),
      width: '100%',
    },
  },
  singleSelect: {
    position: 'absolute',
    bottom: '0px',
    width: 'calc(100% - 16px)'
  },
  btnSimulate: {
    '& .MuiButton-label': {
        textTransform: 'none',
        fontSize: '1.2em',
    },
    '&:hover': {
        backgroundColor: theme.palette.blue
    },
    fontWeight: '300',
    backgroundColor: theme.palette.blue,
    color: theme.palette.black_white,
    width: '100%',
    height: '100%',
    lineHeight: '1',
    '&:disabled': {
      backgroundColor: theme.palette.blue_disable,
      color: theme.palette.normal_disable
    },
    padding: '15px'
  },
  btnSee: {
      '& .MuiButton-label': {
          textTransform: 'none',
          fontSize: '1.2em',
      },
      '& .MuiButton-containedSecondary:hover': {

      },
      '&:hover': {
          backgroundColor: theme.palette.blue,
          color: theme.palette.black_white,
      },
      fontWeight: '300',
      border: `1px solid ${theme.palette.blue}`,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.blue,
      width: '100%',
      height: '100%',
      lineHeight: '1',
      padding: '15px'
  },
  btnCreate: {
    '& .MuiButton-label': {
        textTransform: 'none',
        fontSize: '1.2em',
    },
    '& .MuiButton-containedSecondary:hover': {

    },
    '&:hover': {
        backgroundColor: theme.palette.pink,
        color: theme.palette.black_white,
    },
    fontWeight: '300',
    border: `1px solid ${theme.palette.pink}`,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.pink,
    width: '100%',
    height: '100%',
    lineHeight: '1',
    padding: '15px'
},
  input_box: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.black_white,
    border: `1px solid ${theme.palette.text.primary}`,
'& svg': {
            fill: theme.palette.text.primary
        },
    padding: '12px 30px',
    fontSize: '0.8750em',
    marginTop: '20px',
    width: '100%',
    fontFamily: 'roboto',
    '&::placeholder': {
      color: theme.palette.text.primary,
      fontWeight: '300',
      fontStyle: 'italic'
    },
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
