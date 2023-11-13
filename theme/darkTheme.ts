import { colors } from './colors';

const darkTheme = {
  name: 'dark',
  colors,
  button: {
    background: colors.darkGrey,
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
    text: colors.white,
    outline: colors.lightGrey,
    hover: {
      background: colors.grey,
      border: colors.black,
      text: colors.white,
      outline: colors.lightGrey,
    },
    focus: {
      background: colors.grey,
      border: 'none',
      text: colors.white,
      outline: colors.lightGrey,
    }
  },
  page: {
    background: colors.darkGrey,
    text: colors.white,
  },
  shadow: `0px 4px 4px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)`,
}

export default darkTheme;