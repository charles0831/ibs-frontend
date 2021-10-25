import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%',
    },
    name_select_box: {
        border: 'none',
        fontStyle: 'italic',
        color: theme.palette.select_title,
        fontWeight: '400',
        '& .MuiInputLabel-outlined .MuiInputLabel-shrink': {
            transform: 'translate(14px -100px) scale(0.5)'
        }
    },
    input_box: {
        '& svg': {
                fill: theme.palette.text.primary
        },
        '& select': {
            border: `1px solid ${theme.palette.gray}`,
        },
        }
}));

export default useStyles;