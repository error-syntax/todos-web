import { Archive, Pencil, Trash } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

import { IconWrapper } from '../icon/Icon.styles';
import { type TaskColumn } from './TaskTable.types';

const columnsBuilder: (
  actionHandlers: Record<string, (input: any) => void>,
) => TaskColumn[] = (actionHandlers) => {
  return [
    {
      accessorKey: 'completed',
      header: 'Done',
      cell: ({ row }) => {
        const isCompleted: boolean = row.getValue('completed');

        return (
          <span className="flex">
            <Checkbox
              onCheckedChange={(checked) => {
                actionHandlers.completeTask({
                  id: row.original.id,
                  completed: checked,
                });
              }}
              defaultChecked={isCompleted}
            />
          </span>
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      cell: ({ row }) => {
        return row.getValue('dueDate') ?? '--';
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <span className="flex gap-4 justify-end">
            <IconWrapper
              onClick={() => {
                actionHandlers.updateTask(row.original);
              }}
              tabIndex={0}
            >
              <Pencil size={14} />
            </IconWrapper>
            <IconWrapper
              onClick={() => {
                actionHandlers.archiveTask(row.original);
              }}
              tabIndex={0}
            >
              <Archive size={14} />
            </IconWrapper>
            <IconWrapper
              onClick={() => {
                actionHandlers.deleteTask(row.original);
              }}
              tabIndex={0}
            >
              <Trash size={14} />
            </IconWrapper>
          </span>
        );
      },
    },
  ];
};

export { columnsBuilder };
