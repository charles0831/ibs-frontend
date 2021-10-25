import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: theme.palette.topbar_background
    },
    mainContainer: {
        padding: '30px 20px 30px 20px',
    },
    titleBlock: {
        display: 'flex',
    },
    mainHeader: {
        color: theme.palette.gray,
        
        fontFamily: 'roboto',
        marginBottom: '15px',
        fontWeight: 400        
    },
    titleHeader: {
        color: theme.palette.gray,
        
        fontFamily: 'roboto',
        marginBottom: '5px',
        fontWeight: 400
    },

    secondTitleHeader: {
        color: theme.palette.gray,
        fontFamily: 'roboto',
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            marginBottom: '15px',
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: '39px',
        },
    },

    subHeader: {
        color: theme.palette.gray,
        fontSize: '0.8125em',
        fontFamily: 'roboto',
        marginBottom: '20px',
        fontWeight: 400,
        fontStyle: 'italic'
    },

    multiTitleHeader: {
        color: theme.palette.gray,
        
        fontFamily: 'roboto',
        marginBottom: '5px',
        fontWeight: 400
    },

    titleInfo: {
        color: theme.palette.pink,
        
        fontFamily: 'roboto',
        marginBottom: '5px',
        marginLeft: '10px',
        fontWeight: 400
    },
    btnOpen: {
        '& .MuiButton-label': {
            textTransform: 'none',
            fontSize: '0.9375em',
        },
        '& .MuiButton-containedSecondary:hover': {

        },
        '&:hover': {
            backgroundColor: theme.palette.blue
        },
        padding: '4px',
        border: 'none',
        fontWeight: '400',
        backgroundColor: theme.palette.blue,
        color: theme.palette.black_white,
        width: '100%',
        height: '50px'
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
        marginTop: '20px',
        border: theme.palette.contrastColor
    },
}));

export default useStyles;