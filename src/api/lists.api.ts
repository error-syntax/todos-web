import axios from 'axios';

import { listsSignal } from '../signals/lists.signals';
import {
  type CreateListInput,
  type CreateListResponse,
  type UpdateListInput,
  type UpdateListResponse,
} from './types/list.types';

export const fetchUserLists = async (userId?: number | null) => {
  if (userId == null) throw new Error('Please provide a user Id');

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/lists/${userId}`,
    {
      withCredentials: true,
    },
  );

  listsSignal.value = res.data;

  return res;
};

export const createList = async (input: CreateListInput) => {
  const res = await axios.post<CreateListResponse>(
    `${import.meta.env.VITE_API_URL}/lists/create`,
    { ...input },
    { withCredentials: true },
  );

  listsSignal.value = [...listsSignal.value, res.data[0]];

  return res;
};

export const deleteList = async (input: number[]) => {
  const res = await axios.delete<{
    numOfRowsAffected: number;
    deletedIds: Array<{ listId: number }>;
  }>(`${import.meta.env.VITE_API_URL}/lists`, {
    data: {
      listIds: input,
    },
    withCredentials: true,
  });

  return res;
};

export const updateList = async (input: UpdateListInput) => {
  const res = await axios.put<UpdateListResponse>(
    `${import.meta.env.VITE_API_URL}/lists`,
    { ...input },
    { withCredentials: true },
  );

  return res;
};
