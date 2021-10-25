import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%'
    },
    name_select_box: {
        fontStyle: 'italic',
        color: theme.palette.select_title,
        fontWeight: '400',
        paddingLeft: '14px',
        marginTop: '-1px',
    },
    multiple_select: {
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            padding: '18.5px 14px',
            border: `1px solid ${theme.palette.gray}`,
            borderRadius: '4px',
        },
        marginTop: '-1px !important',
        '& svg': {
            color: theme.palette.text.primary
        }
    }
}));

export default useStyles;