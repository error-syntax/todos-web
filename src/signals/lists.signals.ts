import { computed, signal } from '@preact/signals-react';

import { type List } from '../api/types';

const listsSignal = signal<List[]>([]);
const activeListSignal = signal<number | null>(null);
const activeListData = computed(() =>
  listsSignal.value.find(({ id }) => id === activeListSignal.value),
);

export { activeListData, activeListSignal, listsSignal };
