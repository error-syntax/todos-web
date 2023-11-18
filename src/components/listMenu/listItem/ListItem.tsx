import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useSignal } from '@preact/signals-react';
import { type KeyboardEventHandler, type MouseEventHandler } from 'react';

import { activeListSignal } from '../../../signals/lists.signals';
import DropdownMenu from '../../dropdownMenu';
import Icon from '../../icon';
import { Input } from '../../inputs';
import { Wrapper } from './ListItem.styles';
import { type ListItemProps } from './ListItem.types';

const items = [
  {
    key: 'list_delete',
    label: 'Delete List',
    handleClick: () => {
      alert('Handle Deleting List');
    },
  },
  {
    key: 'list_update',
    label: 'Update List',
    handleClick: () => {
      alert('Handle Updating List');
    },
  },
];

export default function ListItem({
  handleSubmit = () => {
    console.info('Not Implemented.');
  },
  inputRef,
  listData: { listId, listName } = { listName: '', listId: -1 },
  state = 'default',
}: ListItemProps) {
  const listNameSignal = useSignal<string>(listName);

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();

    if (activeListSignal.value === listId) {
      activeListSignal.value = null;
    } else {
      activeListSignal.value = listId;
    }
  };

  const handleKeyPress: KeyboardEventHandler<HTMLLIElement> = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.currentTarget === e.target) {
      if (activeListSignal.value === listId) {
        activeListSignal.value = null;
      } else {
        activeListSignal.value = listId;
      }
    }
  };

  return (
    <Wrapper
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      state={state}
      tabIndex={state === 'editing' ? -1 : 0}
    >
      {state !== 'editing' && (
        <>
          <p>{listNameSignal.value}</p>
          <DropdownMenu
            items={items}
            trigger={(handleClick, ref) => (
              <Icon
                icon={faEllipsisH}
                onClick={handleClick}
                ref={ref}
                tabIndex={0}
              />
            )}
          />
        </>
      )}
      {state === 'editing' && (
        <Input
          aria-label="Provide your new list's name"
          defaultValue={listNameSignal.value}
          onKeyDown={handleSubmit}
          ref={inputRef}
        />
      )}
    </Wrapper>
  );
}
