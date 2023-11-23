interface Task {
  id: number;
  completed: boolean;
  dueDate?: string | null;
  listId: number;
  name: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

type TaskResponse = Pick<
  Task,
  'completed' | 'id' | 'dueDate' | 'listId' | 'name'
>;

type CreateTaskInput = Partial<Task> & Pick<Task, 'name' | 'listId'>;

type CreateTaskResponse = TaskResponse;

type UpdateTaskInput = Partial<Omit<Task, 'createdAt' | 'updatedAt'>> &
  Pick<Task, 'id'>;

interface UpdateTaskResponse {
  numRowsAffected: number;
  updatedTasks: TaskResponse[];
}

interface DeleteTaskResponse {
  numRowsAffected: number;
  deletedTaskIds: Array<{ id: number }>;
}

export type {
  CreateTaskInput,
  CreateTaskResponse,
  DeleteTaskResponse,
  Task,
  TaskResponse,
  UpdateTaskInput,
  UpdateTaskResponse,
};
