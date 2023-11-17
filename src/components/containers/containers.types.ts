import { type AppendPrefix } from '../../api/types/utility.types';

type ContainerProps = AppendPrefix<
  '$',
  {
    height?: number;
    padding?: number;
    width?: number;
  }
>;

export type { ContainerProps };
