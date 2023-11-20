import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

export const theme = (theme: 'light' | 'dark') => {
  switch (theme) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    default:
      throw new Error('Invalid theme');
  }
};
