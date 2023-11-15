import { signal } from '@preact/signals-react';
import { type List } from '../types';

const listsSignal = signal<List[]>([]);

export { listsSignal };
