import { type Task } from '@/api/types';

export interface TaskFormDialogProps {
  handleClose: VoidFunction;
  open: boolean;
  task?: Task;
}
