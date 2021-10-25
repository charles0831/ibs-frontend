import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    mainContainer: {
        padding: '10px 20px 25px 10px',
        border: theme.palette.contrastColor
    },
    gridBlock: {
        padding: '10px 20px 25px 10px',
    },
    title: {
        color: theme.palette.gray,
        
        fontFamily: 'roboto',
        marginBottom: '5px',
        fontWeight: 400
    },
    btnShowResult: {
        '& .MuiButton-label': {
            textTransform: 'none',
            
        },
        '&:hover': {
            backgroundColor: theme.palette.blue
        },
        padding: '6px',
        fontWeight: 300,
        backgroundColor: theme.palette.blue,
        // color: theme.palette.black_white,
        width: '100%',
        height: '100%'
    },
    simulationBlock: {
        // width: 'fit-content',
        marginTop: '20px'
    },
    btnCreateSimulation: {
        '& .MuiButton-label': {
            textTransform: 'none',
            
        },
        '&:hover': {
            backgroundColor: theme.palette.pink,
            color: theme.palette.black_white,
        },
        padding: '4px 20px',
        fontWeight: 400,
        border: `1px solid ${theme.palette.pink}`,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.pink,
        width: '100%'
    },
    name_select_box: {
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
          padding: '2px 10px',
          borderRadius: '0px',
          border: '0px'
        },
        '& fieldset': {
          border: `1px solid ${theme.palette.gray}`,
        },
        '& .MuiChip-root': {
          borderRadius: '2px',
          backgroundColor: theme.palette.gray,
          color: theme.palette.black_white,
          padding: '0px 10px',
          height: '26px'
        }, 
        '& .MuiAutocomplete-popper': {
            color: 'red',
            backgroundcolor: theme.palette.black_white
        },
        '& svg': {
            color: theme.palette.text.primary
        }
      },
    tooltip: {
        width: '100%'
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
    }
}));

export default useStyles;