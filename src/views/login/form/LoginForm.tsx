import { zodResolver } from '@hookform/resolvers/zod';
import {
  type ToPathOption,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { logInUser } from '@/api';
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

const LOGIN_SCHEMA = z.object({
  email: z
    .string()
    .email('Invalid Email')
    .min(1, 'Please provide your email to login.'),
  password: z.string().min(1, 'Please provide your password to login.'),
});

export default function LoginForm() {
  const navigate = useNavigate({ from: '/login' });
  const {
    state: {
      location: { search },
    },
  } = useRouter();
  const redirectURL: ToPathOption =
    (search as Partial<{ redirect: string }>).redirect ?? '/dashboard';

  const form = useForm<z.infer<typeof LOGIN_SCHEMA>>({
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LOGIN_SCHEMA>) => {
    logInUser(values)
      .then(async (res) => {
        userContext.value = res;
        return res;
      })
      .then((res) => {
        void navigate({ to: redirectURL });
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
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
            <FormItem className="flex flex-col space-y-4">
              <FormLabel>Password</FormLabel>
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
