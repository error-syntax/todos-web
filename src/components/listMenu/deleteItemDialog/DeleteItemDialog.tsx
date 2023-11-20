import { useMutation } from '@tanstack/react-query';

import { deleteList } from '@/api/lists.api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { listsSignal } from '@/signals/lists.signals';

import { type DeleteItemDialogProps } from './DeleteItemDialog.types';

export default function DeleteItemDialog({
  list,
  open,
  onOpenChange,
}: DeleteItemDialogProps) {
  const { mutate: deleteMutation } = useMutation({
    mutationKey: ['delete', list.id],
    mutationFn: async () => {
      return await deleteList([list.id]);
    },
    onSuccess: ({ data: { deletedIds } }) => {
      listsSignal.value = listsSignal.value.filter(({ id }) =>
        deletedIds.find(({ listId }) => listId !== id),
      );
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to delete the entry? Deleting this entry cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteMutation();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
