import { useSignal } from '@preact/signals-react';

import { Input } from '../../inputs';
import { Wrapper } from './ListItem.styles';
import { type ListItemProps } from './ListItem.types';

export default function ListItem({
  handleClick = () => {
    console.info('Not Implemented.');
  },
  handleSubmit = () => {
    console.info('Not Implemented.');
  },
  inputRef,
  listName = '',
  state = 'default',
}: ListItemProps) {
  const listNameSignal = useSignal<string>(listName);

  return (
    <Wrapper
      onClick={handleClick}
      onKeyDown={({ key }) => {
        if (key === 'Enter' || key === ' ') {
          handleClick();
        }
      }}
      state={state}
      tabIndex={state === 'editing' ? -1 : 0}
    >
      {state !== 'editing' && <p>{listNameSignal.value}</p>}
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
