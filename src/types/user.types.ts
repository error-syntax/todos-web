import { Nullable } from ".";

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

type UserSignUp = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

type UserLogin = Pick<UserSignUp, 'email' | 'password'>

export type {
  AuthUser,
  User,
  UserContext,
  UserLogin,
  UserSignUp,
}
