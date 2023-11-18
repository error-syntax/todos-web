import axios from 'axios';

import { tasksSignal } from '../signals/tasks.signals';
import {
  type CreateTaskInput,
  type CreateTaskResponse,
} from './types/task.types';

export const fetchTasksByListId = async (listId: number | null) => {
  if (!listId) throw new Error('Invalid List');

  const response = await axios
    .get(`${import.meta.env.VITE_API_URL}/tasks/${listId}`, {
      withCredentials: true,
    })
    .then((res) => {
      tasksSignal.value = res.data;
      return res;
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
