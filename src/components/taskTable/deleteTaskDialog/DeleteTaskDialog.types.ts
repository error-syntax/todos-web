import { type Task } from '@/api/types';

interface DeleteTaskDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  task: Task;
}

export type { DeleteTaskDialogProps };
