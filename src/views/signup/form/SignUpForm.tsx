import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createUser } from '@/api';
import { type CreateUserInput } from '@/api/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userContext } from '@/signals/users.signals';

const SIGNUP_SCHEMA = z
  .object({
    email: z.string().email('Invalid Email.'),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    password: z
      .string()
      .min(8, 'Your password must be at least 8 characters')
      .max(50, 'Your password cannot be longer than 50 characters'),
    passwordConfirm: z
      .string()
      .min(8, 'Your password must be at least 8 characters')
      .max(50, 'Your password cannot be longer than 50 characters'),
  })
  .required()
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: `Passwords don't match.`,
        path: ['passwordConfirm'],
      });
    }
  });

export default function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SIGNUP_SCHEMA>>({
    resolver: zodResolver(SIGNUP_SCHEMA),
  });

  const { mutate } = useMutation({
    mutationFn: async (values: CreateUserInput) => await createUser(values),
    onSuccess: (res) => {
      userContext.value = res;
      void navigate({ to: '/dashboard' });
    },
  });

  const onSubmit = (values: z.infer<typeof SIGNUP_SCHEMA>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8 flex flex-col"
      >
        <span className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>First Name:</FormLabel>
                <FormControl>
                  <Input placeholder="Your" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Last Name:</FormLabel>
                <FormControl>
                  <Input placeholder="Mother" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </span>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="youremail@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
