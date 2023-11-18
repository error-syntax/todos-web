import { colors } from './colors';

const lightTheme = {
  name: 'light',
  colors,
  button: {
    background: colors.blue60,
    border: colors.blue60,
    text: colors.white,
    outline: colors.blue60,
    hover: {
      background: colors.blue80,
      border: colors.blue80,
      outline: colors.blue80,
      text: colors.white,
    },
    focus: {
      background: colors.blue80,
      border: colors.blue80,
      outline: colors.blue80,
      text: colors.white,
    },
  },
  icon: {
    background: 'transparent',
    border: 'transparent',
    text: colors.black90,
    outline: 'transparent',
    hover: {
      background: colors.blue20,
      border: colors.blue20,
      outline: colors.blue80,
      text: colors.black80,
    },
    focus: {
      background: colors.blue20,
      border: colors.blue20,
      outline: colors.blue80,
      text: colors.black80,
    },
  },
  input: {
    background: colors.white,
    border: colors.black80,
    text: colors.black90,
    outline: colors.black60,
    hover: {
      background: colors.white80,
      border: colors.black90,
      outline: colors.black70,
      text: colors.black90,
    },
    focus: {
      background: colors.white90,
      border: colors.black,
      outline: colors.black70,
      text: colors.black90,
    },
  },
  listItem: {
    background: 'transparent',
    border: 'none',
    text: colors.black90,
    outline: 'transparent',
    hover: {
      background: colors.white90,
      border: colors.white70,
      text: colors.black90,
      outline: colors.white70,
    },
    focus: {
      background: colors.white90,
      border: colors.white70,
      text: colors.black90,
      outline: colors.white70,
    },
  },
  menu: {
    background: colors.white70,
    border: colors.black80,
  },
  page: {
    background: colors.white,
    text: colors.black,
  },
  shadow: `0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)`,
};

export default lightTheme;
