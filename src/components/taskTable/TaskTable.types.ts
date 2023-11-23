import { type ColumnDef } from '@tanstack/react-table';
import { type Dispatch } from 'react';
import { z } from 'zod';

import {
  type DIALOG_ACTIONS,
  type DIALOG_STATE,
} from '@/views/dashboard/Dashboard.reducer';

const ColumnSchema = z.object({
  id: z.number().optional(),
  completed: z.boolean(),
  dueDate: z.string().optional().nullable(),
  options: z.any(),
  name: z.string(),
});

interface TaskTableProps {
  dialogState: [DIALOG_STATE, Dispatch<DIALOG_ACTIONS>];
}

type TaskColumn = ColumnDef<z.infer<typeof ColumnSchema>>;

export type { TaskColumn, TaskTableProps };
