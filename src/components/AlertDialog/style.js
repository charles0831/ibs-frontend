import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  dialog: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '1000px'
    },
    '& .blank': {
      height: '20px',
    },
    '& .section': {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    }
  },
}));
  export default useStyles;