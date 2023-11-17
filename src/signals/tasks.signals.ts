import { signal } from '@preact/signals-react';

import { type Task } from '../api/types';

const tasksSignal = signal<Task[]>([]);

export { tasksSignal };
