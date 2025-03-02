import {
  paper,
  darkPaper,
  primary,
  darkPrimary,
  secondary,
  darkSecondary,
  danger,
  darkDanger,
  success,
  darkSuccess,
  warning,
  darkWarning,
  info,
  darkInfo,
} from "./color-palette";

const createPalette = () => {
  return {
    paper: paper,
    "dark-paper": darkPaper,
    primary: primary,
    "dark-primary": darkPrimary,
    secondary: secondary,
    "dark-secondary": darkSecondary,
    danger: danger,
    "dark-danger": darkDanger,
    success: success,
    "dark-success": darkSuccess,
    warning: warning,
    "dark-warning": darkWarning,
    info: info,
    "dark-info": darkInfo,
  };
};

export default createPalette;
