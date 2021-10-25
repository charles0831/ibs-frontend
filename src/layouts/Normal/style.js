import { makeStyles, useTheme } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  content: {
    backgroundColor: theme.palette.mainBackground,
    width: '100%',
    height: '100%',
    boxShadow: '0px 0px 20px grey',
  },
  
}));

export default useStyles;
