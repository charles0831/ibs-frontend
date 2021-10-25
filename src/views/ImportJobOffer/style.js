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
  },
  flexBlock: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    marginTop: '20px'
  },
  itemBlock: {
    width: '20%',
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  headerBlock: {
    padding: '20px 20px 40px 20px',
    height: '100%',
    border: theme.palette.contrastColor,
    '& input': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.black_white,
      border: `1px solid ${theme.palette.text.primary}`,
      '&::placeholder': {
        color: theme.palette.text.primary,
      }
    }
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'center',
  },
  subHeader: {
    color: theme.palette.gray,
    fontSize: '1.0625em',
    fontFamily: 'roboto',
    fontWeight: 400,
    marginBottom: theme.spacing(3)
  },
  controlBlock: {
    position: 'absolute',
    bottom: '50px',
    width: 'calc(100% - 360px)'
  },
  btnSimulate: {
    '& .MuiButton-label': {
        textTransform: 'none',
        fontSize: '0.9375em',
    },
    '&:hover': {
        backgroundColor: theme.palette.pink
    },
    fontWeight: '300',
    backgroundColor: theme.palette.pink,
    color: theme.palette.black_white,
    width: '100%',
    height: '100%',
    padding: '10px',
    lineHeight: '1',
    '&:disabled': {
      backgroundColor: theme.palette.pink_disable,
      color: theme.palette.black_white
    }
  },
  btnSee: {
      '& .MuiButton-label': {
          textTransform: 'none',
          fontSize: '0.9375em',
      },
      '& .MuiButton-containedSecondary:hover': {

      },
      '&:hover': {
          backgroundColor: theme.palette.pink,
          color: theme.palette.black_white,
      },
      fontWeight: '300',
      border: '1px solid #D6324B',
      backgroundColor: theme.palette.mainBackground,
      color: theme.palette.pink,
      width: '100%',
      height: '100%',
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
    fontWeight: '300',
    border: '1px solid #44545e',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.gray,
    width: '100%',
    height: '100%',
    lineHeight: '1'
},
  input_box: {
'& svg': {
            fill: theme.palette.text.primary
        },
    padding: '12px 30px',
    fontSize: '0.8750em',
    width: '100%',
    fontFamily: 'roboto',
    '&::placeholder': {
      color: theme.palette.black_white,
      fontWeight: '300',
      fontStyle: 'italic'
    }
  },
  progressContainer: {
    position: 'absolute',
    top: '40%',
    width: 'calc(100% - 350px)',
    display: 'flex',
    justifyContent: 'center',
    zIndex: '100'
  },
  progress: {
      color: theme.palette.pink
  },
  uploadButtonBlock: {
    textAlign: 'right',
    marginTop: theme.spacing(2)
  },
  label: {
    marginRight: '20px',
    marginTop: '25px'
  }
}));

export default useStyles;
