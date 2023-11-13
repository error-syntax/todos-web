import axios, { AxiosError, AxiosResponse } from 'axios';
import { User, UserContext, UserLogin, UserSignUp } from '../types';
import { AuthUser } from '../types/user.types';

export const createUser = async (form: UserSignUp) => {
  const {
    email,
    firstName,
    lastName,
    password,
  } = form;

  const res = await axios.post<User>(
    `http://localhost:3001/users/create`,
    {
      email,
      name: `${firstName} ${lastName}`,
      password,
    },
    { withCredentials: true }
  );

  return res.data;
}

export const logInUser = async (form: UserLogin) => {
  const res = await axios.post<UserContext>(
    `http://localhost:3001/users/login`,
    form,
    { withCredentials: true }
  );

  return res.data;
}

export const authenticateUser = async () => {
  try {
    const res: AxiosResponse<{ data: AuthUser  }> = await axios.post(
      `http://localhost:3001/authorize`,
      {},
      { withCredentials: true }
    );
    
    return res;
  } catch (err: any) {
    return err as AxiosError;
  }
}
