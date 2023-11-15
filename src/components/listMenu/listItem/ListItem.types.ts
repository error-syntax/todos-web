import { type RefObject } from 'react';

type ListItemProps = {
  handleClick?: VoidFunction;
  handleSubmit?: React.KeyboardEventHandler<HTMLInputElement>;
  inputRef?: RefObject<HTMLInputElement>;
  listName: string;
  state?: 'default' | 'selected' | 'editing';
} & React.HTMLProps<HTMLLIElement>;

export type { ListItemProps };
