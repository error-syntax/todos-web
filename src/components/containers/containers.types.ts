import { type AppendPrefix } from '../../api/types/utility.types';
import { type useTheme } from '../theme-provider';

type ThemeState = ReturnType<typeof useTheme>['theme'];

type ContainerProps = AppendPrefix<
  '$',
  {
    height?: number;
    padding?: number;
    theme?: ThemeState;
    width?: number;
  }
>;

export type { ContainerProps };
