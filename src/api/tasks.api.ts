import axios from 'axios';

import {
  type CreateTaskInput,
  type CreateTaskResponse,
  type DeleteTaskResponse,
  type UpdateTaskInput,
  type UpdateTaskResponse,
} from './types/task.types';

export const fetchTasksByListId = async (listId: number | null) => {
  if (!listId) throw new Error('Invalid List');

  const response = await axios
    .get<{ tasks: CreateTaskResponse[] }>(
      `${import.meta.env.VITE_API_URL}/tasks/${listId}`,
      {
        withCredentials: true,
      },
    )
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
    .post<CreateTaskResponse[]>(
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

export const deleteTask = async (listId: string) => {
  const response = await axios
    .delete<DeleteTaskResponse>(
      `${import.meta.env.VITE_API_URL}/tasks/${listId}`,
      { withCredentials: true },
    )
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};

export const updateTask = async (input: UpdateTaskInput) => {
  const response = await axios
    .put<UpdateTaskResponse>(
      `${import.meta.env.VITE_API_URL}/tasks/${input.id}`,
      input,
      {
        withCredentials: true,
      },
    )
    .catch((err) => {
      throw new Error(err);
    });

  return response;
};
