import { type MouseEventHandler, type MutableRefObject } from 'react';

interface DropdownMenuItem {
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  id?: string;
  key: string;
  label: string;
}

interface DropdownMenuProps<T> {
  items: DropdownMenuItem[];
  trigger: (
    clickHandler: MouseEventHandler<T>,
    ref?: MutableRefObject<any>,
  ) => JSX.Element;
}

export type { DropdownMenuProps };
