interface Task {
  id: string;
  completed: boolean;
  content: string;
  dueDate: string | null;
  listId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

type CreateTaskInput = Partial<
  Pick<Task, 'completed' | 'content' | 'dueDate' | 'listId'>
>;

type CreateTaskResponse = Pick<
  Task,
  'completed' | 'content' | 'dueDate' | 'id'
>;

type UpdateTaskInput = Partial<Task>;

export type { CreateTaskInput, CreateTaskResponse, Task, UpdateTaskInput };
