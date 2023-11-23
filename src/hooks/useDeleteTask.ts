import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTask } from '@/api/tasks.api';
import { type DeleteTaskResponse } from '@/api/types';
import { useToast } from '@/components/ui/use-toast';

export default function useDeleteTask(
  handleError?: (err: unknown) => void,
  handleSuccess?: (res: DeleteTaskResponse | undefined) => void,
) {
  const qClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (taskId: number) => await deleteTask(taskId),
    onSuccess:
      handleSuccess ??
      function (res) {
        if (!res) return;

        toast({
          title: 'Delete Succeeded',
          description: `Task with id ${res.deletedTaskIds[0].id} has been deleted.`,
        });
        void qClient.refetchQueries({
          queryKey: ['list', 'tasks', res.deletedTaskIds[0].id],
        });
      },
    onError:
      handleError ??
      function () {
        toast({
          title: 'Delete Failed',
          description: `Unable to delete Task.`,
        });
      },
  });
}
