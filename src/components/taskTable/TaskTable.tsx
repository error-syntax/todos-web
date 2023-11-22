import { Separator } from '@radix-ui/react-dropdown-menu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Archive, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

import { deleteTask, fetchTasksByListId } from '@/api/tasks.api';
import { type Task } from '@/api/types';
import { activeListSignal } from '@/signals/lists.signals';

import { IconWrapper } from '../icon/Icon.styles';
import TaskForm from '../taskForm';
import { Checkbox } from '../ui/checkbox';
import { DataTable } from '../ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { type TaskTableProps } from './TaskTable.types';

const ColumnSchema = z.object({
  id: z.number().optional(),
  completed: z.boolean(),
  dueDate: z.string().optional().nullable(),
  options: z.any(),
  taskName: z.string(),
});

type TaskColumn = ColumnDef<z.infer<typeof ColumnSchema>>;

export const columns: (
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
            <Checkbox defaultChecked={isCompleted} />
          </span>
        );
      },
    },
    {
      accessorKey: 'taskName',
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
            <IconWrapper tabIndex={0}>
              <Archive size={14} />
            </IconWrapper>
            <IconWrapper
              onClick={() => {
                actionHandlers.deleteTask(`${row.original.id}`);
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

export default function TaskTable({ dialogState }: TaskTableProps) {
  const [dialogOpen, setDialogOpen] = dialogState;
  const [taskData, setTaskData] = useState<Task | undefined>(undefined);
  const qClient = useQueryClient();
  const {
    data: tasks,
    error,
    isFetching,
  } = useQuery({
    enabled: activeListSignal.value !== null,
    queryKey: ['list', 'tasks', activeListSignal.value?.toString()],
    queryFn: async () => await fetchTasksByListId(activeListSignal.value),
    staleTime: 0,
  });

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: async (taskId: string) => await deleteTask(taskId),
    onSuccess: () => {
      void qClient.refetchQueries({
        queryKey: ['list', 'tasks', activeListSignal.value?.toString()],
      });
    },
  });

  if (activeListSignal.value === null) return null;

  if (error) return <h3>Oh no! An error occurred...</h3>;

  if (isFetching) return <h3>Loading...</h3>;

  if (!tasks || tasks.length === 0) return <h3>No Tasks... Creat some!</h3>;

  return (
    <>
      <Dialog
        open={dialogOpen}
        onOpenChange={() => {
          setDialogOpen(false);
        }}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>{taskData ? 'Update' : 'Create New'} Task</DialogTitle>
          </DialogHeader>
          <Separator className="my-2" />
          <TaskForm
            taskData={taskData}
            handleCloseDialog={() => {
              setDialogOpen(false);
              setTaskData(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
      <DataTable
        columns={columns({
          deleteTask: (taskId: string) => {
            deleteTaskMutation(taskId);
          },
          updateTask: (values: Task) => {
            setDialogOpen(true);
            setTaskData(values);
          },
        })}
        data={tasks}
      />
    </>
  );
}
