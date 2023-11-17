import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSignal } from '@preact/signals-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { createList } from '../../../api';
import { userContext } from '../../../signals/users.signals';
import { Spacer } from '../../containers';
import ListItem from '../listItem';
import { type ListItemProps } from '../listItem/ListItem.types';
import { AddListButton } from './AddListItem.styles';

export default function AddListItem() {
  const stateSignal = useSignal<ListItemProps['state']>('default');
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useMutation({
    mutationFn: async (name: string) =>
      await createList({ name, ownerId: userContext.value.id }),
  });

  const handleClick: React.MouseEventHandler<HTMLLIElement> = () => {
    stateSignal.value = 'editing';
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      stateSignal.value = 'editing';
    }
  };

  const handleSubmit: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      mutate(e.currentTarget.value);
      stateSignal.value = 'default';
    }

    if (e.key === 'Escape') {
      stateSignal.value = 'default';
    }
  };

  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [stateSignal.value, inputRef.current]);

  return (
    <>
      {stateSignal.value === 'default' ? (
        <AddListButton
          onClick={handleClick}
          onKeyUp={handleKeyPress}
          tabIndex={0}
        >
          <p>
            <FontAwesomeIcon icon={faCirclePlus} />
            <Spacer $width={8} />
            Create a New List
          </p>
        </AddListButton>
      ) : (
        <ListItem
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          listName=""
          state={stateSignal.value}
        />
      )}
    </>
  );
}
