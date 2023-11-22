import { useQuery } from '@tanstack/react-query';

import { fetchUserLists } from '../../api/lists.api';
import { listsSignal } from '../../signals/lists.signals';
import { userContext } from '../../signals/users.signals';
import { Column, Spacer } from '../containers';
import AddListItem from './addListItem';
import ListItem from './listItem';
import { Wrapper } from './ListMenu.styles';

export default function ListMenu() {
  const { id: userId } = userContext.value;

  useQuery({
    queryKey: ['lists', `${userId}`],
    queryFn: async () => await fetchUserLists(userId),
  });

  return (
    <Column>
      <Wrapper>
        <h2 style={{ lineHeight: '38px' }}>your lists</h2>
        <Spacer $height={20} />
        {listsSignal.value.map((list) => {
          return <ListItem key={list.id} list={list} />;
        })}
        <AddListItem />
      </Wrapper>
    </Column>
  );
}
