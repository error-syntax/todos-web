import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';

import TaskTable from '@/components/taskTable';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

import { Column, Row, Spacer } from '../../components/containers';
import ListMenu from '../../components/listMenu';
import { activeListData, activeListSignal } from '../../signals/lists.signals';
import { DashboardWrapper } from './Dashboard.styles';
import SideNav from './sideNav';

export default function Dashboard() {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <DashboardWrapper $theme={theme.theme}>
      <SideNav />
      <ListMenu />
      <Column $padding={20}>
        <Column>
          <Row id="list_header_row">
            <h2>{activeListData.value?.name}</h2>
            {activeListSignal.value && (
              <Button
                onClick={() => {
                  setDialogOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faPlus} size="lg" />
                <Spacer $width={8} />
                New Task
              </Button>
            )}
          </Row>
          <Separator className="my-4" />
          <TaskTable dialogState={[dialogOpen, setDialogOpen]} />
        </Column>
      </Column>
    </DashboardWrapper>
  );
}
