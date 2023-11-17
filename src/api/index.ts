import { type AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { userContext } from '../signals/users.signals';
import { createList, fetchUserLists } from './lists.api';
import { type AuthUser } from './types/user.types';
import { authenticateUser, createUser, logInUser } from './users.api';

async function isAuthenticated() {
  const sid = Cookies.get('sid');

  if (sid == null) return false;

  const response = await authenticateUser();

  if (
    ('name' in response && response.name === 'AxiosError') ||
    ('data' in response && Object.keys(response.data).length === 0)
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
