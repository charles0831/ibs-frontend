import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: theme.palette.topbar_background
    },
    mainContainer: {
        padding: '30px 20px 30px 20px',
        alignItems: 'center'
    },
    titleBlock: {
        display: 'flex',
    },
    table: {
        border: theme.palette.contrastColor
    },
    mainHeader: {
        color: theme.palette.gray,
        fontSize: '1.125em',
        fontFamily: 'roboto',
        marginBottom: '15px',
        fontWeight: '500'        
    },
    titleHeader: {
        color: theme.palette.gray,
        
        fontFamily: 'roboto',
        marginBottom: '5px',
        fontWeight: '500'
    },

    secondTitleHeader: {
        color: theme.palette.gray,
        fontSize: '1.125em',
        fontFamily: 'roboto',
        marginBottom: '15px',
        fontWeight: '500'
    },

    subHeader: {
        color: theme.palette.gray,
        fontSize: '0.8125em',
        fontFamily: 'roboto',
        marginBottom: '20px',
        fontWeight: '500',
        fontStyle: 'italic'
    },

    titleInfo: {
        color: theme.palette.pink,
        
        fontFamily: 'roboto',
        marginBottom: '5px',
        marginLeft: '10px',
        fontWeight: '500'
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
        zIndex: 0,
        padding: '4px',
        border: 'none',
        fontWeight: '400',
        backgroundColor: theme.palette.pink,
        color: theme.palette.black_white,
        width: '100%'
    },
    simulationBlock: {
        width: 'fit-content',
        marginTop: '20px'
    },
    btnChange: {
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
        padding: '4px 20px',
        fontWeight: '400',
        border: '1px solid #D6324B',
        backgroundColor: theme.palette.mainBackground,
        color: theme.palette.pink,
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
    },
    secondContainer: {
border: theme.palette.contrastColor,
        marginTop: '20px'
    },
}));

export default useStyles;