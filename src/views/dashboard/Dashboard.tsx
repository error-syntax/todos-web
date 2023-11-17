import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';

import { fetchTasksByListId } from '../../api/tasks.api';
import Avatar from '../../components/avatar';
import { Column, Row, Spacer } from '../../components/containers';
import { Button } from '../../components/inputs';
import ListMenu from '../../components/listMenu';
import { activeListData, activeListSignal } from '../../signals/lists.signals';
import { DashboardWrapper } from './Dashboard.styles';

export default function Dashboard() {
  useQuery({
    enabled: activeListSignal.value !== null,
    queryKey: ['list', 'tasks', activeListSignal.value],
    queryFn: async () => await fetchTasksByListId(activeListSignal.value),
  });

  return (
    <DashboardWrapper>
      <Column>
        <Avatar />
      </Column>
      <Column>
        <ListMenu />
      </Column>
      <Column $padding={20}>
        <Column>
          <Row id="list_header_row">
            <h2>{activeListData.value?.name} Tasks</h2>
            <Button>
              <FontAwesomeIcon icon={faPlus} size="lg" />
              <Spacer $width={8} />
              New Task
            </Button>
          </Row>
        </Column>
      </Column>
    </DashboardWrapper>
  );
}
