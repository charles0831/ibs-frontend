import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    controlGrid: {
        padding: '10px'
    },
    controlContainer: {
        height: '100%'
    },
    controlBlock: {
        padding: '30px 20px 30px 20px',
        height: '100%',
        border: theme.palette.contrastColor
    },
    chart_title: {
        fontFamily: 'roboto',
        fontSize: '1.2em',
        color: theme.palette.blue,
        textAlign: 'center',
        marginBottom: theme.spacing(2)
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
        padding: '4px',
        fontWeight: '400',
        backgroundColor: theme.palette.gray,
        border: '1px solid #44545e',
        color: theme.palette.black_white,
        width: '100%'
    },
    btnExport: {
        '& .MuiButton-label': {
            textTransform: 'none',
            fontSize: '0.9375em',
        },
        '& .MuiButton-containedSecondary:hover': {

        },
        '&:hover': {
            backgroundColor: theme.palette.gray,
            color: theme.palette.black_white
        },
        padding: '4px',
        fontWeight: '400',
        backgroundColor: theme.palette.mainBackground,
        border: '1px solid #44545e',
        color: theme.palette.gray,
        width: '100%'
    },
}));

export default useStyles;