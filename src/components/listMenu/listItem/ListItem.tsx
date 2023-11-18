import { useMutation } from '@tanstack/react-query';
import {
  type KeyboardEventHandler,
  type MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import { deleteList, updateList } from '../../../api/lists.api';
import { activeListSignal, listsSignal } from '../../../signals/lists.signals';
import DropdownMenu from '../../dropdownMenu';
import Icon from '../../icon';
import { Input } from '../../inputs';
import { Wrapper } from './ListItem.styles';
import { type ListItemProps } from './ListItem.types';

export default function ListItem({ list }: ListItemProps) {
  const listNameRef = useRef(list.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);

  const { mutate: deleteMutation } = useMutation({
    mutationKey: ['delete', list.id],
    mutationFn: async () => {
      return await deleteList([list.id]);
    },
    onSuccess: ({ data: { deletedIds } }) => {
      console.log('Refetching User Lists...');
      listsSignal.value = listsSignal.value.filter(({ id }) =>
        deletedIds.find(({ listId }) => listId !== id),
      );
    },
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: async (listName: string) =>
      await updateList({ id: list.id, name: listName }),
    mutationKey: ['update', list.id],
    onSuccess: ({ data }) => {
      listNameRef.current = data[0].name;
      setEditing(false);
    },
  });

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();

    if (activeListSignal.value === list.id) {
      activeListSignal.value = null;
    } else {
      activeListSignal.value = list.id;
    }
  };

  const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      updateMutation(e.currentTarget.value);
    }
  };

  const handleKeyPress: KeyboardEventHandler<HTMLLIElement> = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.currentTarget === e.target) {
      if (activeListSignal.value === list.id) {
        activeListSignal.value = null;
      } else {
        activeListSignal.value = list.id;
      }
    }
  };

  const items = [
    {
      key: 'list_delete',
      label: 'Delete List',
      handleClick: () => {
        deleteMutation();
      },
    },
    {
      key: 'list_update',
      label: 'Update List',
      handleClick: () => {
        setEditing(true);
      },
    },
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, [editing]);

  return (
    <Wrapper
      $active={activeListSignal.value === list.id}
      $editing={editing}
      onClick={(e) => {
        if (!editing) {
          handleClick(e);
        }
      }}
      onKeyDown={handleKeyPress}
      tabIndex={editing ? -1 : 0}
    >
      {!editing ? (
        <>
          <p>{listNameRef.current}</p>
          <DropdownMenu
            items={items}
            triggerElRenderer={(props) => <Icon {...props} />}
          />
        </>
      ) : (
        <Input
          aria-label="Provide your new list's name"
          defaultValue={listNameRef.current}
          onKeyDown={handleSubmit}
          ref={inputRef}
        />
      )}
    </Wrapper>
  );
}
