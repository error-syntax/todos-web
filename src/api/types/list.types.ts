interface List {
  id: number;
  name: string;
  ownerId: number;
}

type CreateListInput = Omit<List, 'id'>;

type UpdateListInput = Partial<List>;

export type { CreateListInput, List, UpdateListInput };