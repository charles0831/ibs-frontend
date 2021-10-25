import { colors } from '@material-ui/core';

const yellow = '#FFC401';
const white = yellow;
const black = '#000000';
const black_disable = yellow;
const pink = yellow;
const gray = yellow;
const blue = yellow;
const blue_disable = yellow;
const normal = yellow;
const normal_disable = black;
const select_title = yellow;
const checked_color = '#546e7a';
const sidebar_background = black;
const sidebar_active_background = black_disable;
const sidebar_color = normal;
const sidebar_active_color = normal_disable;
const topbar_background = black;
const pink_disable = yellow;
const gray_disable = '#404040';
const mainBackground = black;
const contrastColor = `1px solid ${yellow}`;
const table_head = black;
const input_back = black;
const black_white = black;
const white_yellow = yellow;
const sidebar_title_color = yellow;
const sidebar_hover_color = black;
export default {
  black,
  input_back,
  white,
  pink,
  gray,
  blue,
  blue_disable,
  normal,
  normal_disable,
  select_title,
  checked_color,
  sidebar_background,
  sidebar_active_background,
  sidebar_color,
  sidebar_active_color,
  topbar_background,
  pink_disable,
  gray_disable,
  mainBackground,
  contrastColor,
  table_head,
  black_white,
  white_yellow,
  sidebar_title_color,
  sidebar_hover_color,
  primary: {
    contrastText: black,
    dark: colors.indigo[900],
    main: colors.indigo[500],
    light: colors.indigo[100]
  },
  secondary: {
    contrastText: black,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  success: {
    contrastText: black,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: black,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: black,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: black,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: yellow,
    secondary: yellow,
    link: colors.blue[600]
  },
  background: {
    default: black,
    paper: black
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
