import { useMutation } from '@tanstack/react-query';

import { archiveTask } from '@/api/tasks.api';
import { type UpdateTaskResponse } from '@/api/types';

export default function useArchiveTask(
  handleError?: (err: unknown) => void,
  handleSuccess?: (res: UpdateTaskResponse) => void,
) {
  return useMutation({
    mutationFn: async (taskId: number) => await archiveTask(taskId),
    onSuccess: handleSuccess,
    onError: handleError,
  });
}
