import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%',
    },
    name_select_box: {
        fontStyle: 'italic',
        color: theme.palette.select_title,
        fontWeight: '400',
        '& .MuiInputLabel-outlined .MuiInputLabel-shrink': {
            transform: 'translate(14px -100px) scale(0.5)',
        },
    },
    input_box: {
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            padding: '18.5px 14px',
            border: `1px solid ${theme.palette.gray}`,
            borderRadius: '4px',
        },
        '& svg': {
            fill: theme.palette.text.primary
        },
        '& select': {
            border: `1px solid ${theme.palette.gray}`,
        },
        '& li': {
            lineHeight: '7px',
            fontSize: '14px',
            paddingLeft: theme.spacing(0),
        }
    }
}));

export default useStyles;