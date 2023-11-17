import { useMutation } from '@tanstack/react-query';
import {
  type ToPathOption,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { ErrorMessage, Formik, type FormikConfig } from 'formik';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

import { createUser } from '../../api';
import { Column, Row, Spacer } from '../../components/containers';
import { Button, ErrorWrapper, Input, Label } from '../../components/inputs';
import { userContext } from '../../signals/users.signals';
import { type CreateUserInput } from '../../api/types';
import { SignUpForm, Wrapper } from './Signup.styles';

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

export default function Signup(): JSX.Element {
  const DEFAULT_VALUES = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
  };
  const navigate = useNavigate({ from: '/signup' });
  const {
    state: {
      location: { search },
    },
  } = useRouter();
  const redirectURL: ToPathOption =
    (search as Partial<{ redirect: string }>).redirect ?? '/dashboard';

  const { mutate } = useMutation({
    mutationFn: async (values: CreateUserInput) => await createUser(values),
    onSuccess: (res) => {
      userContext.value = res;
      void navigate({ to: redirectURL });
    },
  });

  const handleSubmit: FormikConfig<CreateUserInput>['onSubmit'] = (values) => {
    mutate(values);
  };

  return (
    <Wrapper>
      <Column>Image Here</Column>
      <Column>
        <h1>Sign Up</h1>
        <Spacer $height={40} />
        <Formik
          initialValues={DEFAULT_VALUES}
          onSubmit={handleSubmit}
          validate={toFormikValidate(SIGNUP_SCHEMA)}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <SignUpForm onSubmit={handleSubmit}>
              <Row>
                <Column>
                  <Label htmlFor="firstName">First Name:</Label>
                  <Spacer $height={8} />
                  <Input
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="firstName"
                    type="text"
                    value={values.firstName}
                  />
                  <Spacer $height={4} />
                  <ErrorWrapper>
                    <ErrorMessage name="firstName" />
                  </ErrorWrapper>
                </Column>
                <Column>
                  <Label htmlFor="lastName">Last Name:</Label>
                  <Spacer $height={8} />
                  <Input
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="lastName"
                    type="text"
                    value={values.lastName}
                  />
                  <Spacer $height={4} />
                  <ErrorWrapper>
                    <ErrorMessage name="lastName" />
                  </ErrorWrapper>
                </Column>
              </Row>
              <Spacer $height={12} />
              <Row>
                <Column>
                  <Label htmlFor="email">Email:</Label>
                  <Spacer $height={8} />
                  <Input
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    type="email"
                    value={values.email}
                  />
                  <Spacer $height={4} />
                  <ErrorWrapper>
                    <ErrorMessage name="email" />
                  </ErrorWrapper>
                </Column>
              </Row>
              <Spacer $height={12} />
              <Row>
                <Column>
                  <Label htmlFor="password">Password:</Label>
                  <Spacer $height={8} />
                  <Input
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    type="password"
                    value={values.password}
                  />
                  <Spacer $height={4} />
                  <ErrorWrapper>
                    <ErrorMessage name="password" />
                  </ErrorWrapper>
                </Column>
              </Row>
              <Spacer $height={12} />
              <Row>
                <Column>
                  <Label htmlFor="passwordConfirm">
                    Password Confirmation:
                  </Label>
                  <Spacer $height={8} />
                  <Input
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="passwordConfirm"
                    type="password"
                    value={values.passwordConfirm}
                  />
                  <Spacer $height={4} />
                  <ErrorWrapper>
                    <ErrorMessage name="passwordConfirm" />
                  </ErrorWrapper>
                </Column>
              </Row>
              <Spacer $height={12} />
              <Row>
                <Button
                  style={{ flex: '1' }}
                  disabled={isSubmitting}
                  type="submit"
                >
                  Sign Up!
                </Button>
              </Row>
            </SignUpForm>
          )}
        </Formik>
      </Column>
    </Wrapper>
  );
}
