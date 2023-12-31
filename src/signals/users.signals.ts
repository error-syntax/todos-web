import { signal } from '@preact/signals-react';

import { type UserContext } from '../api/types';

const userContext = signal<UserContext>({
  email: null,
  id: null,
  name: null,
  role: 'standard',
});

export { userContext };
