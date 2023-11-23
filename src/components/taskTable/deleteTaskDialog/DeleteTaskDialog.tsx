import { DialogDescription } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useDeleteTask } from '@/hooks';

import { type DeleteTaskDialogProps } from './DeleteTaskDialog.types';

export default function DeleteTaskDialog({
  open,
  handleClose,
  task,
}: DeleteTaskDialogProps) {
  const { mutate: deleteTaskMutation } = useDeleteTask();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <Separator />
          <DialogDescription>
            This action is <strong>PERMANANT</strong>. You won&apos;t be able to
            retrieve this after it&apos;s been deleted.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <DialogFooter>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteTaskMutation(task.id);
            }}
            variant="default"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
