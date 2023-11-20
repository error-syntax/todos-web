import { type List } from '@/api/types';
import { type AlertDialog } from '@/components/ui/alert-dialog';

interface ArchiveItemDialogProps {
  list: Pick<List, 'id' | 'name' | 'archived'>;
  open: React.ComponentProps<typeof AlertDialog>['open'];
  onOpenChange: React.ComponentProps<typeof AlertDialog>['onOpenChange'];
}

export type { ArchiveItemDialogProps };
