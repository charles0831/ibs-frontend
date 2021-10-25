import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import palette_dark from './palette_dark';
import typography from './typography';
import typography_dark from './typography_dark';
import overrides from './overrides';
import overrides_dark from './overrides_dark';

const theme = (is_contrast) => createMuiTheme({
  palette : is_contrast ? palette_dark : palette,
  typography : is_contrast ? typography_dark : typography,
  overrides : is_contrast ? overrides_dark : overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      ms: 750, 
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
