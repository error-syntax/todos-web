import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import TaskForm from '..';
import { type TaskFormDialogProps } from './TaskFormDialog.types';

export default function TaskFormDialog({
  handleClose,
  open,
  task,
}: TaskFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Update' : 'Create New'} Task</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        <TaskForm
          taskData={task}
          handleCloseDialog={() => {
            handleClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
