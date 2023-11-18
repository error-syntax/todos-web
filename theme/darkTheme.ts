import { colors } from './colors';

const darkTheme = {
  name: 'dark',
  colors,
  button: {
    background: colors.white90,
    border: colors.white60,
    outline: colors.white60,
    text: colors.black90,
    hover: {
      background: colors.white70,
      border: colors.white60,
      outline: colors.white60,
      text: colors.black80,
    },
    focus: {
      background: colors.white70,
      border: colors.white60,
      outline: colors.white60,
      text: colors.black80,
    },
  },
  icon: {
    background: 'transparent',
    border: 'transparent',
    text: colors.white90,
    outline: 'transparent',
    hover: {
      background: colors.blue60,
      border: colors.blue20,
      outline: colors.blue80,
      text: colors.white,
    },
    focus: {
      background: colors.blue60,
      border: colors.blue20,
      outline: colors.blue80,
      text: colors.white,
    },
  },
  input: {
    background: colors.white90,
    border: colors.black60,
    outline: colors.black70,
    text: colors.black90,
    hover: {
      background: colors.white,
      border: colors.black80,
      outline: colors.black70,
      text: colors.black90,
    },
    focus: {
      background: colors.white,
      border: colors.black80,
      outline: colors.black70,
      text: colors.black90,
    },
  },
  listItem: {
    background: 'transparent',
    border: 'none',
    text: colors.white,
    outline: 'transparent',
    hover: {
      background: colors.black60,
      border: colors.black80,
      text: colors.white,
      outline: colors.black80,
    },
    focus: {
      background: colors.black60,
      border: colors.black80,
      text: colors.white,
      outline: colors.black80,
    },
  },
  menu: {
    background: colors.black90,
    border: colors.black70,
  },
  page: {
    background: colors.black,
    text: colors.white90,
  },
  shadow: `0px 4px 4px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)`,
};

export default darkTheme;
