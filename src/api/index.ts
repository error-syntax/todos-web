import Cookies from 'js-cookie';

import { authenticateUser, createUser, logInUser } from './users.api';
import { userContext } from '../signals/user.signals';
import { type AxiosResponse } from 'axios';
import { type AuthUser } from '../types/user.types';
import { createList, fetchUserLists } from './lists.api';

async function isAuthenticated() {
  const sid = Cookies.get('sid');

  if (!sid) return false;

  const response = await authenticateUser();

  if (
    ('name' in response && response.name === 'AxiosError') ||
    ('data' in response && !response.data)
  ) {
    return false;
  }

  if ('data' in response) {
    userContext.value = (
      response as unknown as AxiosResponse<AuthUser>
    ).data.user;
  }

  return true;
}

export {
  authenticateUser,
  createList,
  createUser,
  fetchUserLists,
  isAuthenticated,
  logInUser,
};
