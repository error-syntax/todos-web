import { type Task } from '@/api/types';

interface ArchiveTaskDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  task: Task;
}

export type { ArchiveTaskDialogProps };
