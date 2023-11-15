import { Nullable } from '.';

type AuthUser = {
  cookie: {
    expires: string; 
    httpOnly: boolean; 
    originalMaxAge: number;
    path: string;
    secure: boolean; 
  },
  authenticated: boolean,
  user: UserContext
}

type User = {
  id: number;
  email: string;
  name: string;
  role: 'super' | 'admin' | 'standard';
}

type UserContext = Nullable<User>;

type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

type UserLogin = Pick<CreateUserInput, 'email' | 'password'>

export type {
  AuthUser,
  CreateUserInput,
  User,
  UserContext,
  UserLogin,
}
