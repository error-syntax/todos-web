import { signal } from '@preact/signals-react';
import { UserContext } from '../types';

const userContext = signal<UserContext>({
  email: null,
  id: null,
  name: null,
  role: 'standard',
});

export {
  userContext,
}