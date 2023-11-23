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
import { useArchiveTask } from '@/hooks';

import { type ArchiveTaskDialogProps } from './ArchiveTaskDialog.types';

export default function DeleteTaskDialog({
  open,
  handleClose,
  task,
}: ArchiveTaskDialogProps) {
  const { mutate: archiveTaskMutation } = useArchiveTask();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="mb-8">Are you sure?</DialogTitle>
          <DialogDescription>
            This will archive your task meaning it won&apos;t be shown in your
            Tasks List and won&apos;t count towards your Task statistics.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              archiveTaskMutation(task.id);
              handleClose();
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
