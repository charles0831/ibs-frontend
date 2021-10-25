import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        // backgroundColor: '#E6E9EE',
        boxShadow: theme.shadows[5],
        padding: '25px',
        outline: 'none',
        color: theme.palette.gray,
        fontSize: '0.9375em',
        fontFamily: 'roboto',
        fontWeight: 400,
        width: '1000px',
        height: '576px'
    },
    closeIcon: {
        color: theme.palette.black_white,
        backgroundColor: theme.palette.pink
    },
    closeIconBlock: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export default useStyles;