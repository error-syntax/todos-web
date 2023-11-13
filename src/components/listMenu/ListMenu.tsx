import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useSignal } from '@preact/signals-react';

import { AddListButton, Wrapper } from './ListMenu.styles';
import ListItem from './listItem';
import { Spacer } from '../wrappers';
import { listsSignal } from '../../signals/list.signals';

export default function ListMenu() {
  const selectedList = useSignal<string | null>(null);

  return (
    <Wrapper>
      {
        listsSignal.value.map((list) => {
          return (
            <ListItem
              listName={list.name}
              handleClick={() => {
                selectedList.value = list.id
              }}
              state={selectedList.value === list.id ? 'selected' : 'neutral'}
            />
          )
        })
      }
      <AddListButton onClick={(e) => {
        alert('Handle Creating a list.')
      }}>
        <p>
          <FontAwesomeIcon icon={faCirclePlus} />
          <Spacer width={8} />
          Create a New List
        </p>
      </AddListButton>
    </Wrapper>
  )
}