import { type List } from '../../../api/types';

interface ListItemProps {
  active?: boolean;
  editing?: boolean;
  handleSubmit?: React.KeyboardEventHandler<HTMLInputElement>;
  list: Pick<List, 'id' | 'name' | 'archived'>;
}

export type { ListItemProps };
