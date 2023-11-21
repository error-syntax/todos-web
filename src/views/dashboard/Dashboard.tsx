import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Separator } from '@radix-ui/react-dropdown-menu';

import { ModeToggle } from '@/components/mode-toggle';
import TaskTable from '@/components/taskTable';
import { useTheme } from '@/components/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { userContext } from '@/signals/users.signals';

import { Column, Row, Spacer } from '../../components/containers';
import ListMenu from '../../components/listMenu';
import { activeListData, activeListSignal } from '../../signals/lists.signals';
import { DashboardWrapper } from './Dashboard.styles';

export default function Dashboard() {
  const theme = useTheme();

  return (
    <DashboardWrapper $theme={theme.theme}>
      <Column>
        <ModeToggle />
        <Spacer $height={12} />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{userContext.value.name}</AvatarFallback>
        </Avatar>
      </Column>
      <Column>
        <ListMenu />
      </Column>
      <Column $padding={20}>
        <Column>
          <Row id="list_header_row">
            <h2>{activeListData.value?.name}</h2>
            {activeListSignal.value && (
              <Button>
                <FontAwesomeIcon icon={faPlus} size="lg" />
                <Spacer $width={8} />
                New Task
              </Button>
            )}
          </Row>
          <Separator className="my-4" />
          <TaskTable />
        </Column>
      </Column>
    </DashboardWrapper>
  );
}
