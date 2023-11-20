import axios from 'axios';

import {
  type CreateTaskInput,
  type CreateTaskResponse,
  type Task,
} from './types/task.types';

export const fetchTasksByListId = async (listId: number | null) => {
  if (!listId) throw new Error('Invalid List');

  const response = await axios
    .get<{ tasks: Task[] }>(`${import.meta.env.VITE_API_URL}/tasks/${listId}`, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data.tasks;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};

export const createTask = async (input: CreateTaskInput) => {
  const response = await axios
    .post<CreateTaskResponse>(
      `${import.meta.env.VITE_API_URL}/tasks/create`,
      input,
      {
        withCredentials: true,
      },
    )
    .then((res) => res)
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};
