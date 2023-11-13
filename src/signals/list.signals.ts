import { signal } from '@preact/signals-react';
import { List } from '../types';

const listsSignal = signal<Array<List>>([]);

export { listsSignal };