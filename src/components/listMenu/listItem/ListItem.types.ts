import { type RefObject } from 'react';

type ListItemProps = {
  handleSubmit?: React.KeyboardEventHandler<HTMLInputElement>;
  inputRef?: RefObject<HTMLInputElement>;
  listData: { listId: number; listName: string };
  state?: 'default' | 'selected' | 'editing';
} & React.HTMLProps<HTMLLIElement>;

export type { ListItemProps };
