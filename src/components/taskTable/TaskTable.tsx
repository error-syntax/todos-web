import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Archive, ArrowDown, ArrowUp, Pencil, Trash } from 'lucide-react';
import { z } from 'zod';

import { fetchTasksByListId } from '@/api/tasks.api';
import { activeListSignal } from '@/signals/lists.signals';

import { IconWrapper } from '../icon/Icon.styles';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DataTable } from '../ui/data-table';

const ColumnSchema = z.object({
  content: z.string(),
  completed: z.boolean(),
  dueDate: z.string().optional().nullable(),
  options: z.any(),
});

type TaskColumn = ColumnDef<z.infer<typeof ColumnSchema>>;

export const columns: TaskColumn[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'completed',
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Done
          {column.getIsSorted() === 'asc' ? <ArrowUp /> : <ArrowDown />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const isCompleted: boolean = row.getValue('completed');

      return (
        <span className="flex">
          <Checkbox defaultChecked={isCompleted} />
        </span>
      );
    },
  },
  {
    accessorKey: 'content',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Content
          {column.getIsSorted() === 'asc' ? <ArrowUp /> : <ArrowDown />}
        </Button>
      );
    },
  },
  {
    accessorKey: 'dueDate',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Due Date
          {column.getIsSorted() === 'asc' ? <ArrowUp /> : <ArrowDown />}
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.getValue('dueDate') ?? '--';
    },
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <span className="flex gap-4 justify-end">
          <IconWrapper tabIndex={0}>
            <Pencil size={14} />
          </IconWrapper>
          <IconWrapper tabIndex={0}>
            <Archive size={14} />
          </IconWrapper>
          <IconWrapper tabIndex={0}>
            <Trash size={14} />
          </IconWrapper>
        </span>
      );
    },
  },
];

export default function TaskTable() {
  const {
    data: tasks,
    error,
    isFetching,
  } = useQuery({
    enabled: activeListSignal.value !== null,
    queryKey: ['list', 'tasks', activeListSignal.value?.toString()],
    queryFn: async () => await fetchTasksByListId(activeListSignal.value),
  });

  if (activeListSignal.value === null) return null;

  if (error) return <h3>Oh no! An error occurred...</h3>;

  if (isFetching) return <h3>Loading...</h3>;

  if (!tasks || tasks.length === 0) return <h3>No Tasks... Creat some!</h3>;

  return <DataTable columns={columns} data={tasks} />;
}
