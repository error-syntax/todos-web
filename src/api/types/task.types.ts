interface Task {
  id: string;
  completed: boolean;
  content: string;
  dueDate: string | null;
  listId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

type TaskResponse = Pick<Task, 'completed' | 'content' | 'id' | 'dueDate'>;

type CreateTaskInput = Partial<
  Pick<Task, 'completed' | 'content' | 'dueDate' | 'listId'>
>;

type CreateTaskResponse = TaskResponse;

type UpdateTaskInput = Pick<
  Task,
  'completed' | 'content' | 'dueDate' | 'listId' | 'id'
>;

interface UpdateTaskResponse {
  numOfAffectedrows: number;
  updatedTasks: TaskResponse[];
}

export type {
  CreateTaskInput,
  CreateTaskResponse,
  Task,
  UpdateTaskInput,
  UpdateTaskResponse,
};
