import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    drawer: {
      width: 300,
      backgroundColor: theme.palette.sidebar_background
    },
    root: {
      backgroundColor: theme.palette.sidebar_background,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    divider: {
      margin: theme.spacing(2, 0)
    },
    nav: {
      marginBottom: theme.spacing(2)
    },
    main_logo: {
    },
    icon: {
      color: theme.palette.sidebar_color,
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(3),
      '&:hover': {
        color: theme.palette.sidebar_active_color
      },
    },
    logout: {
      padding: '20px 16px 20px 56px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: 400,
      
      color: theme.palette.sidebar_color,
      lineHeight: '1em',
      '&:hover': {
        backgroundColor: theme.palette.sidebar_active_background,
        color: theme.palette.sidebar_active_color,
      },
      position: 'absolute',
      bottom: '0px'
    },
  }));
  export default useStyles;