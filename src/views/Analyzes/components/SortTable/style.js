import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    
  btnOpen: {
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
      height: '100%',
      width: '40%',
      lineHeight: '1',
      padding: '10px',
      marginLeft: '10px',
      marginRight: '10px',
    },
  btnDelete: {
    '& .MuiButton-label': {
        textTransform: 'none',
        fontSize: '0.9375em',
    },
    '&:hover': {
        backgroundColor: theme.palette.gray
    },
    fontWeight: '300',
    backgroundColor: theme.palette.gray,
    color: theme.palette.black_white,
    height: '100%',
    width: '40%',
    lineHeight: '1',
    padding: '10px',
    marginLeft: '10px',
    marginRight: '10px',
  },

}));

export default useStyles;