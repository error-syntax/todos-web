import axios from 'axios';
import { listsSignal } from '../signals/list.signals';
import { CreateListInput, List } from '../types/list.types';
import { Nullable } from '../types';

export const fetchUserLists = async (userId?: number | null) => {
  if (!userId) throw new Error('Please provide a user Id');

  const res = await axios.get(`http://localhost:3001/lists/${userId}`, { withCredentials: true });

  listsSignal.value = res.data;

  return res;
}

export const createList = async (input: Nullable<CreateListInput>) => {
  const res = await axios.post<List[]>(
    `http://localhost:3001/lists/create`,
    { ...input },
    { withCredentials: true, },
  )

  listsSignal.value = [ ...listsSignal.value, res.data[0]]

  return res;
}