import { useMutation } from '@tanstack/react-query';

import { updateTask } from '@/api/tasks.api';
import { type Task, type UpdateTaskInput } from '@/api/types';
import { useFetchTasksByListId } from '@/hooks';
import { activeListSignal } from '@/signals/lists.signals';
import { type DIALOG_STATE } from '@/views/dashboard/Dashboard.reducer';

import TaskFormDialog from '../taskForm/dialog';
import { Card, CardTitle } from '../ui/card';
import { DataTable } from '../ui/data-table';
import { useToast } from '../ui/use-toast';
import ArchiveTaskDialog from './archiveTaskDialog';
import DeleteTaskDialog from './deleteTaskDialog';
import { type TaskTableProps } from './TaskTable.types';
import { columnsBuilder } from './TaskTable.utils';

export default function TaskTable({ dialogState }: TaskTableProps) {
  const [state, updater] = dialogState;
  const { toast } = useToast();

  const {
    data: tasks,
    error,
    isFetching,
  } = useFetchTasksByListId(activeListSignal.value);

  const { mutate: updateTaskMutation } = useMutation({
    mutationFn: async (input: UpdateTaskInput) => await updateTask(input),
    onSuccess: ({ updatedTasks }) => {
      toast({
        title: `Successfully Updated Task(s)`,
        description: `${updatedTasks.map((task) => task.name).join(', ')}`,
      });
    },
  });

  function handleDialogClose(key: keyof Omit<DIALOG_STATE, 'task'>) {
    updater({ type: 'TOGGLE_DIALOG', payload: { key, data: undefined } });
  }

  if (activeListSignal.value === null) return null;

  if (error) return <h3>Oh no! An error occurred...</h3>;

  if (isFetching) return <h3>Loading...</h3>;

  return (
    <>
      {state.task && (
        <>
          <ArchiveTaskDialog
            handleClose={() => {
              handleDialogClose('archiveTaskOpen');
            }}
            open={state.archiveTaskOpen}
            task={state.task}
          />
          <DeleteTaskDialog
            handleClose={() => {
              handleDialogClose('deleteTaskOpen');
            }}
            open={state.deleteTaskOpen}
            task={state.task}
          />
        </>
      )}
      <TaskFormDialog
        open={state.taskFormOpen}
        handleClose={() => {
          handleDialogClose('taskFormOpen');
        }}
        task={state.task}
      />
      {!tasks || tasks.length === 0 ? (
        <Card className="flex p-4 h-[300px] items-center justify-center shadow-lg">
          <CardTitle className="grow-0 text-slate-600">
            No Tasks... Creat some!
          </CardTitle>
        </Card>
      ) : (
        <DataTable
          className="shadow-lg"
          columns={columnsBuilder({
            archiveTask: (values: Task) => {
              updater({
                type: 'TOGGLE_DIALOG',
                payload: { key: 'archiveTaskOpen', data: values },
              });
            },
            completeTask: (input) => {
              updateTaskMutation({
                id: input.id,
                completed: input.completed,
              });
            },
            deleteTask: (values: Task) => {
              updater({
                type: 'TOGGLE_DIALOG',
                payload: { key: 'deleteTaskOpen', data: values },
              });
            },
            updateTask: (values: Task) => {
              updater({
                type: 'TOGGLE_DIALOG',
                payload: { key: 'taskFormOpen', data: values },
              });
            },
          })}
          data={tasks}
        />
      )}
    </>
  );
}
