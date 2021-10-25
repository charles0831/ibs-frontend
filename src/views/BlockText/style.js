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
    buttonBlock: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'right'
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
        width: '25%',
        marginLeft: '15px'
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
        border: `1px solid ${theme.palette.pink}`,
        backgroundColor: theme.palette.black_white,
        color: theme.palette.pink,
        width: '25%'
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
    qlClass: {
        '& .ql-container': {
            background: 'white',
            height: '500px',
            overflow: 'auto'
        },
        '& .ql-editor': {
            whiteSpace: 'normal !important'
        },
        '& .ql-tooltip': {
            left: '10px !important'
        }
    },
    title: {
        color: theme.palette.gray,
        fontSize: '1.125em',
        fontFamily: 'roboto',
        fontWeight: 400,
        marginBottom: '20px',
        '& span': {
            color: theme.palette.gray,
            
            fontFamily: 'roboto',
            fontWeight: 500,
            marginBottom: '15px',
        }
    }

}));

export default useStyles;