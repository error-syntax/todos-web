import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Archive, Pencil, Trash } from 'lucide-react';

import Icon from '@/components/icon';
import {
  DropdownMenu as DropdownMenuContext,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { type ListDropdownMenuProps } from './DropdownMenu.types';

export default function DropdownMenu({
  handleClickArchive,
  handleClickDelete,
  handleClickUpdate,
}: ListDropdownMenuProps) {
  return (
    <DropdownMenuContext>
      <DropdownMenuTrigger asChild>
        <Icon icon={faEllipsisH} tabIndex={0} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>List Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleClickArchive}>
            <Archive className="mr-2 h-4 w-4" />
            Archive List
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleClickDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Delete List
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleClickUpdate}>
            <Pencil className="mr-2 h-4 w-4" />
            Update List
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuContext>
  );
}
