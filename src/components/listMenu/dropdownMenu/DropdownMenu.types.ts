import { type MouseEventHandler } from 'react';

interface ListDropdownMenuProps {
  handleClickArchive: MouseEventHandler<HTMLDivElement>;
  handleClickDelete: MouseEventHandler<HTMLDivElement>;
  handleClickUpdate: MouseEventHandler<HTMLDivElement>;
}

export type { ListDropdownMenuProps };
