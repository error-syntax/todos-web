import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createTask, updateTask } from '@/api/tasks.api';
import {
  type Task,
  type TaskResponse,
  type UpdateTaskResponse,
} from '@/api/types';
import { cn } from '@/lib/utils';
import { activeListSignal, listsSignal } from '@/signals/lists.signals';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useToast } from '../ui/use-toast';

const NewTaskSchema = z.object({
  dueDate: z.date().optional(),
  listId: z.string(),
  taskName: z
    .string({ required_error: 'Please give your task a name.' })
    .max(250),
});

export default function TaskForm({
  taskData,
  handleCloseDialog,
}: {
  taskData?: Task;
  handleCloseDialog: VoidFunction;
}) {
  const { toast } = useToast();
  const qClient = useQueryClient();
  const form = useForm<z.infer<typeof NewTaskSchema>>({
    resolver: zodResolver(NewTaskSchema),
    defaultValues: {
      listId: taskData?.listId.toString(),
      taskName: taskData?.taskName,
      dueDate: taskData?.dueDate ? new Date(taskData?.dueDate) : undefined,
    },
  });

  function handleSuccess(
    data:
      | (TaskResponse & { listName: string | undefined })
      | UpdateTaskResponse,
  ) {
    if ('numRowsAffected' in data) {
      toast({
        title: 'Successfully Updated Task',
        description: `Updated "${data.updatedTasks[0].taskName}"`,
        type: 'foreground',
      });
    } else {
      toast({
        title: 'Successfully Created Task',
        description: `Added "${data.taskName}" to "${data.listName}"`,
        type: 'foreground',
      });
    }
    handleCloseDialog();
    void qClient.refetchQueries({
      queryKey: ['list', 'tasks', activeListSignal.value?.toString()],
    });
  }

  const { mutate: createTaskMutation } = useMutation({
    mutationFn: async () => {
      const { dueDate, listId, taskName } = form.getValues();

      const { data } = await createTask({
        dueDate: dueDate?.toDateString(),
        listId: Number(listId),
        taskName,
      });

      return {
        ...data[0],
        listName: listsSignal.value.find(
          ({ id }) => id === Number(data[0].listId),
        )?.name,
      };
    },
    onSuccess: handleSuccess,
  });

  const { mutate: updateTaskMutation } = useMutation({
    mutationFn: async () => {
      const { dueDate, listId, taskName } = form.getValues();

      const { data } = await updateTask({
        id: taskData!.id,
        completed: taskData!.completed,
        dueDate: dueDate?.toDateString(),
        listId: Number(listId),
        taskName,
      });

      console.log(data);

      return {
        ...data,
      };
    },
    onSuccess: handleSuccess,
  });

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          void form.handleSubmit(() => {
            if (taskData) {
              updateTaskMutation();
            } else {
              createTaskMutation();
            }
          })(e);
        }}
      >
        <FormField
          control={form.control}
          name="taskName"
          render={function ({ field }) {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="write unit tests" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <span className="flex align-center gap-2">
          <FormField
            control={form.control}
            name="dueDate"
            render={function ({ field }) {
              return (
                <FormItem className="flex flex-col w-1/2">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'justify-stretch text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        disabled={(date) => date < new Date()}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="listId"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Parent List</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a List" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {listsSignal.value.map((list) => {
                          return (
                            <SelectItem
                              key={list.id}
                              value={list.id.toString()}
                            >
                              {list.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </span>
        <span className="flex justify-end">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              handleCloseDialog();
            }}
          >
            Cancel
          </Button>
          <Separator className="mr-4" />
          <Button type="submit">
            {taskData ? 'Update Task' : 'Create Task'}
          </Button>
        </span>
      </form>
    </Form>
  );
}
