import { useQuery } from '@tanstack/react-query';

import { fetchTasksByListId } from '@/api/tasks.api';
import { type Task } from '@/api/types';
import { activeListSignal } from '@/signals/lists.signals';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

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

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {Object.keys(tasks[0]).map((key) => (
            <TableHead key={key}>{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => {
          return (
            <TableRow key={task.id}>
              {Object.keys(task).map((key) => {
                return (
                  <TableCell key={`${task.id}_${key}`}>
                    {`${task[key as keyof Task] ?? '--'}`}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
