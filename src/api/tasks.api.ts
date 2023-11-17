import axios from 'axios';

import { tasksSignal } from '../signals/tasks.signals';

export const fetchTasksByListId = async (listId: number | null) => {
  if (!listId) throw new Error('Invalid List');

  console.log(`Fetching Tasks for List with ID: ${listId}`);

  const response = await axios
    .get(`${import.meta.env.VITE_API_URL}/lists/${listId}`, {
      withCredentials: true,
    })
    .then((res) => {
      tasksSignal.value = res.data;
      return res;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return response.data;
};
