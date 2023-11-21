import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { useTheme } from '@/components/theme-provider';
import { Input } from '@/components/ui/input';

import { createList } from '../../../api';
import { userContext } from '../../../signals/users.signals';
import { Spacer } from '../../containers';
import { AddListButton } from './AddListItem.styles';

export default function AddListItem() {
  const { theme } = useTheme();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useMutation({
    mutationFn: async (name: string) =>
      await createList({ name, ownerId: userContext.value.id! }),
    onSettled: () => {
      setEditing(false);
    },
  });

  const handleClick: React.MouseEventHandler<HTMLLIElement> = () => {
    setEditing(true);
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      setEditing(true);
    }
  };

  const handleSubmit: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      if (e.currentTarget.value.trim() === '')
        throw new Error("List name can't be empty");

      mutate(e.currentTarget.value);
    }

    if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  useEffect(() => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [editing, inputRef.current]);

  return (
    <AddListButton
      onClick={handleClick}
      onKeyUp={handleKeyPress}
      $theme={theme}
      tabIndex={0}
    >
      {!editing ? (
        <p>
          <FontAwesomeIcon icon={faCirclePlus} />
          <Spacer $width={8} />
          Create a New List
        </p>
      ) : (
        <Input onKeyDown={handleSubmit} ref={inputRef} type="text" />
      )}
    </AddListButton>
  );
}
