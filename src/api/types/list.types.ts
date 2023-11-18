interface List {
  archived: boolean;
  id: number;
  name: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}

type CreateListInput = Pick<List, 'name' | 'ownerId'>;

type CreateListResponse = List[];

type UpdateListInput = Pick<List, 'id' | 'name'>;

type UpdateListResponse = Array<Pick<List, 'id' | 'name' | 'archived'>>;

export type {
  CreateListInput,
  CreateListResponse,
  List,
  UpdateListInput,
  UpdateListResponse,
};
