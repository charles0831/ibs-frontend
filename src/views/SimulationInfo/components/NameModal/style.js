import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        boxShadow: theme.shadows[5],
        padding: '25px',
        outline: 'none',
        color: theme.palette.gray,
        fontSize: '0.9375em',
        fontFamily: 'roboto',
        fontWeight: 400,
        width: '400px',
        height: '200px'
    },
    closeIcon: {
        color: theme.palette.black_white,
        backgroundColor: theme.palette.pink
    },
    closeIconBlock: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    input_box: {
'& svg': {
            fill: theme.palette.text.primary
        },
        padding: '12px 30px',
        
        width: '100%',
        color: theme.palette.gray,
        backgroundColor: theme.palette.black_white,
        border: `1px solid ${theme.palette.text.primary}`,
        fontWeight: '400',
        fontFamily: 'roboto',
        '&::placeholder': {
          color: theme.palette.gray,
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
            backgroundColor: theme.palette.pink
        },
        '&:disabled': {
            backgroundColor: theme.palette.pink_disable,
            color: 'darkgray'
        },
        padding: '4px',
        border: '1px solid #a52b02',
        fontWeight: '400',
        backgroundColor: theme.palette.pink,
        color: theme.palette.black_white,
        width: '100%'
    },
}));

export default useStyles;