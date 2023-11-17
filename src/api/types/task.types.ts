interface Task {
  id: string;
  content: string;
  completed: boolean;
  dueDate: string | null;
  listId: string;
}

type CreateTaskInput = Omit<Task, 'id'>;

type UpdateTaskInput = Partial<Task>;

export type { CreateTaskInput, Task, UpdateTaskInput };
