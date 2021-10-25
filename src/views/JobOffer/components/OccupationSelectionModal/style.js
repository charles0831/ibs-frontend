import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.white,
        boxShadow: theme.shadows[5],
        padding: '25px',
        outline: 'none',
        color: theme.palette.gray,
        fontSize: '0.9375em',
        fontFamily: 'roboto',
        fontWeight: 400,
        width: '800px',
        height: '576px'
    },
    closeIcon: {
        color: theme.palette.black_white,
        backgroundColor: theme.palette.pink
    },
    closeIconBlock: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    secondTitleHeader: {
        color: theme.palette.gray,
        
        fontFamily: 'roboto',
        fontWeight: '400'
    },
    selectAll: {
        marginLeft: '20px',
        marginBottom: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.8em',
    },
    input_box: {
        '& svg': {
            fill: theme.palette.text.primary
        },
        padding: '17px 30px',
        fontSize: '0.8750em',
        width: '100%',
        color: theme.palette.gray,
        fontWeight: '400',
        fontFamily: 'roboto',
        border: '1px solid gray',
        borderRadius: '4px',
        marginTop: '1px',
        '&::placeholder': {
          color: theme.palette.black_white,
          fontWeight: '400',
          fontStyle: 'italic'
        }
    },
    btnSave: {
        '& .MuiButton-label': {
            textTransform: 'none',
            fontSize: '0.9375em',
        },
        '& .MuiButton-containedSecondary:hover': {

        },
        '&:hover': {
            backgroundColor: theme.palette.gray
        },
        '&:disabled': {
            backgroundColor: theme.palette.gray_disable,
            color: 'darkgray'
        },
        padding: '4px',
        // border: '1px solid #44545e',
        fontWeight: '400',
        backgroundColor: theme.palette.gray,
        color: theme.palette.black_white,
        width: '100%',
        borderRadius: '0px'
    },
    checkboxblock: {
        backgroundColor: theme.palette.black_white,
        overflow: 'auto',
        height: '300px',
        fontFamily: 'roboto',
        color: theme.palette.gray,
        padding: '20px 20px 20px 10px',
    },
    occupationBlock: {
        border: '1px solid #626262',
        borderTop: '0px',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        position: 'absolute',
        background: 'white',
        zIndex: '100',
    },
    overBox: {
        opacity: '1',
        zIndex: '99',
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: '0px',
        left: '0px',
    },
    btnOpen: {
        '& .MuiButton-label': {
            textTransform: 'none',
            fontSize: '0.9375em',
        },
        '& .MuiButton-containedSecondary:hover': {

        },
        '&:hover': {
            backgroundColor: theme.palette.black_white
        },
        '&:disabled': {
            backgroundColor: theme.palette.gray_disable,
            color: 'darkgray'
        },
        padding: '13px',
        border: '1px solid #626262',
        fontWeight: '400',
        backgroundColor: theme.palette.black_white,
        color: theme.palette.text.primary,
        width: '100%',
        height: '56px',
        zIndex: '100',
        borderRadius: '0px'
    },
}));

export default useStyles;