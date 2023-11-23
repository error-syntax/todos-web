import { useMutation, useQueryClient } from '@tanstack/react-query';

import { archiveTask } from '@/api/tasks.api';
import { type UpdateTaskResponse } from '@/api/types';
import { toast } from '@/components/ui/use-toast';
import { activeListSignal } from '@/signals/lists.signals';

export default function useArchiveTask(
  handleError?: (err: unknown) => void,
  handleSuccess?: (res: UpdateTaskResponse) => void,
) {
  const qClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: number) => await archiveTask(taskId),
    onSuccess:
      handleSuccess ??
      function (res) {
        if (!res) return;

        toast({
          title: 'Archive Succeeded',
          description: `Task with id ${res.updatedTasks[0].id} has been archived.`,
        });
        void qClient.refetchQueries({
          queryKey: ['list', 'tasks', activeListSignal.value],
        });
      },
    onError:
      handleError ??
      function () {
        toast({
          title: 'Archive Failed',
          description: `Unable to archive Task.`,
        });
      },
  });
}
