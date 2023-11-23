import { useQuery } from '@tanstack/react-query';

import { fetchTasksByListId } from '@/api/tasks.api';

export default function useFetchTasksByListId(listId: number | null) {
  const res = useQuery({
    enabled: listId !== null,
    queryKey: ['list', 'tasks', listId],
    queryFn: async () => await fetchTasksByListId(listId),
    staleTime: 0,
  });

  return res;
}
