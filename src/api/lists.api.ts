import axios from 'axios';

import { listsSignal } from '../signals/list.signals';
import { type Nullable } from '../types';
import { type CreateListInput, type List } from '../types/list.types';

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

export const createList = async (input: Nullable<CreateListInput>) => {
  const res = await axios.post<List[]>(
    `${import.meta.env.VITE_API_URL}/lists/create`,
    { ...input },
    { withCredentials: true },
  );

  listsSignal.value = [...listsSignal.value, res.data[0]];

  return res;
};
