import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%'
    },
    name_select_box: {
        '& svg': {
            fill: theme.palette.text.primary
        },
        '& select': {
            border: `1px solid ${theme.palette.gray}`,
        },
        // fontStyle: 'italic',
        fontWeight: '400',
        // padding: '5px 14px',
        '& .MuiInputLabel-outlined .MuiInputLabel-shrink': {
            transform: 'translate(14px -100px) scale(0.5)',
            // padding: '5px 14px'
        },
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            padding: '10px 30px 10px 20px !important'
        }
    },
}));

export default useStyles;