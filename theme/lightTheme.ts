import { colors } from './colors';

const lightTheme = {
  name: 'light',
  colors,
  button: {
    background: colors.black,
    border: colors.darkGrey,
    text: colors.white,
    outline: colors.lightGrey,
    hover: {
      background: colors.lightGrey,
      border: colors.lightGrey,
      outline: colors.lightGrey,
      text: colors.black,
    },
    focus: {
      background: colors.lightGrey,
      border: colors.lightGrey,
      outline: colors.lightGrey,
      text: colors.black,
    },
  },
  input: {
    background: colors.white,
    border: colors.lightGrey,
    text: colors.black,
    outline: colors.lightGrey,
    hover: {
      background: colors.lightGrey,
      border: colors.darkGrey,
      outline: colors.lightGrey,
      text: colors.black,
    },
    focus: {
      background: colors.lightGrey,
      border: colors.black,
      outline: colors.lightGrey,
      text: colors.black,
    },
  },
  listItem: {
    background: 'transparent',
    border: 'none',
    text: colors.black,
    outline: colors.lightGrey,
    hover: {
      background: colors.lightGrey,
      border: colors.lightGrey,
      text: colors.black,
      outline: colors.darkGrey,
    },
    focus: {
      background: colors.lightGrey,
      border: 'none',
      text: colors.black,
      outline: colors.darkGrey,
    },
  },
  page: {
    background: colors.white,
    text: colors.black,
  },
  shadow: `0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)`,
};

export default lightTheme;
