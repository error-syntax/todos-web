import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

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
