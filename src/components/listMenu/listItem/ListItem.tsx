import { useMutation } from '@tanstack/react-query';
import {
  type KeyboardEventHandler,
  type MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTheme } from '@/components/theme-provider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { updateList } from '../../../api/lists.api';
import { activeListSignal, listsSignal } from '../../../signals/lists.signals';
import ArchiveListDialog from '../archiveListDialog';
import DeleteListDialog from '../deleteListDialog';
import DropdownMenu from '../dropdownMenu';
import { Wrapper } from './ListItem.styles';
import { type ListItemProps } from './ListItem.types';

type AvailableDialogs = 'none' | 'archive' | 'delete';

export default function ListItem({ list }: ListItemProps) {
  const { toast } = useToast();
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [whichDialogOpen, setWhichDialogOpen] =
    useState<AvailableDialogs>('none');

  const { mutate: updateMutation } = useMutation({
    mutationFn: async (listName: string) =>
      await updateList({ id: list.id, name: listName }),
    mutationKey: ['update', list.id],
    onSuccess: ({ data }) => {
      const updatedList = listsSignal.value.map((list) => {
        if (list.id === data[0].id) {
          return {
            ...list,
            ...data[0],
          };
        }

        return list;
      });

      listsSignal.value = updatedList;
      setEditing(false);
    },
  });

  const handleSelect: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (e.currentTarget === e.target) {
      if (activeListSignal.value === list.id) {
        activeListSignal.value = null;
      } else {
        activeListSignal.value = list.id;
      }
    }
  };

  const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Escape') {
      setEditing(false);
    }

    if (e.key === 'Enter') {
      if (e.currentTarget.value === '') {
        toast({
          title: "Task Names can't be empty. Please provide a name.",
        });
      } else {
        updateMutation(e.currentTarget.value);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editing]);

  return (
    <li>
      <Wrapper
        $active={activeListSignal.value === list.id}
        $theme={theme}
        className="bg-transparent hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-800 dark:focus:bg-slate-800"
        onClick={(e) => {
          if (!editing) {
            handleSelect(e);
          }
        }}
        tabIndex={editing ? -1 : 0}
      >
        {!editing ? (
          <>
            {list.name}
            <DropdownMenu
              handleClickArchive={function (): void {
                setWhichDialogOpen('archive');
              }}
              handleClickDelete={function (): void {
                setWhichDialogOpen('delete');
              }}
              handleClickUpdate={function (): void {
                setEditing(true);
              }}
            />
            <DeleteListDialog
              list={list}
              open={whichDialogOpen === 'delete'}
              onOpenChange={() => {
                setWhichDialogOpen('none');
              }}
            />
            <ArchiveListDialog
              list={list}
              open={whichDialogOpen === 'archive'}
              onOpenChange={() => {
                setWhichDialogOpen('none');
              }}
            />
          </>
        ) : (
          <Input
            aria-label="Provide your new list's name"
            defaultValue={list.name}
            onKeyDown={handleSubmit}
            ref={inputRef}
          />
        )}
      </Wrapper>
    </li>
  );
}
