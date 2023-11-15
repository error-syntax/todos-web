import Avatar from '../../components/avatar';
import ListMenu from '../../components/listMenu';
import { Column } from '../../components/wrappers';
import { userContext } from '../../signals/user.signals';
import { DashboardWrapper } from './Dashboard.styles';

export default function Dashboard() {
  return (
    <DashboardWrapper>
      <Column>
        <Avatar />
      </Column>
      <Column>
        <ListMenu  />
      </Column>
      <Column>
        <h1>Welcome {userContext.value.name}</h1>
      </Column>
    </DashboardWrapper>
  )
}