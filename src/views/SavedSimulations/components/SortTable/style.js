import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    
    btnCreate: {
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
        width: '100%',
        lineHeight: '1',
        padding: '10px',
        '&:disabled': {
          backgroundColor: theme.palette.pink_disable,
          color: 'darkgray'
        }
      },

}));

export default useStyles;