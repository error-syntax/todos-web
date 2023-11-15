import { useSignal } from '@preact/signals-react';
import { useQuery } from '@tanstack/react-query';

import { fetchUserLists } from '../../api/lists.api';
import { listsSignal } from '../../signals/list.signals';
import { userContext } from '../../signals/user.signals';
import AddListItem from './addListItem';
import ListItem from './listItem';
import { Wrapper } from './ListMenu.styles';

export default function ListMenu() {
  const selectedListSignal = useSignal<string | null>(null);
  const { id: userId } = userContext.value;

  useQuery({
    queryKey: ['lists', `${userId}`],
    queryFn: async () => await fetchUserLists(userId),
  });

  return (
    <Wrapper>
      {listsSignal.value.map((list) => {
        return (
          <ListItem
            handleClick={() => {
              if (selectedListSignal.value === list.id) {
                selectedListSignal.value = null;
              } else {
                selectedListSignal.value = list.id;
              }
            }}
            key={list.id}
            listName={list.name}
            state={
              selectedListSignal.value === list.id ? 'selected' : 'default'
            }
          />
        );
      })}
      <AddListItem />
    </Wrapper>
  );
}
