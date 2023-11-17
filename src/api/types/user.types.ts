import { type Nullable } from '.';

interface AuthUser {
  cookie: {
    expires: string;
    httpOnly: boolean;
    originalMaxAge: number;
    path: string;
    secure: boolean;
  };
  authenticated: boolean;
  user: UserContext;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: 'super' | 'admin' | 'standard';
}

type UserContext = Nullable<User>;

interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

type UserLogin = Pick<CreateUserInput, 'email' | 'password'>;

export type { AuthUser, CreateUserInput, User, UserContext, UserLogin };
