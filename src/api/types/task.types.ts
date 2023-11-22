interface Task {
  id: number;
  completed: boolean;
  dueDate?: string | null;
  listId: number;
  taskName: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

type TaskResponse = Pick<
  Task,
  'completed' | 'id' | 'dueDate' | 'listId' | 'taskName'
>;

type CreateTaskInput = Partial<
  Pick<Task, 'completed' | 'dueDate' | 'listId' | 'taskName'>
>;

type CreateTaskResponse = TaskResponse;

type UpdateTaskInput = Pick<
  Task,
  'completed' | 'dueDate' | 'listId' | 'id' | 'taskName'
>;

interface UpdateTaskResponse {
  numRowsAffected: number;
  updatedTasks: TaskResponse[];
}

interface DeleteTaskResponse {
  numRowsAffected: number;
  deletedTaskIds: Array<{ deletedTaskId: number }>;
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
