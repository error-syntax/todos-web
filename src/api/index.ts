import Cookies from 'js-cookie';

import { authenticateUser, createUser } from './users.api';
import { userContext } from '../signals/user.signals';
import { AxiosResponse } from 'axios';
import { AuthUser } from '../types/user.types';

async function isAuthenticated() {
  const sid = Cookies.get('sid');

  if (!sid) return false;

  const response = await authenticateUser().then(res => {
    console.log(res)
    return res;
  });

  if ('name' in response && response.name === 'AxiosError') {
    return false;
  }

  if ('data' in response) {
    userContext.value = (response as unknown as AxiosResponse<AuthUser>).data.user;
  }

  return true;
}

export {
  createUser,
  isAuthenticated,
}