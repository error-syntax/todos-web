import {
  type ToPathOption,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { ErrorMessage, Formik, type FormikConfig } from 'formik';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

import { logInUser } from '../../api';
import { type UserLogin } from '../../api/types';
import { Column, Row, Spacer } from '../../components/containers';
import { Button, ErrorWrapper, Input, Label } from '../../components/inputs';
import { userContext } from '../../signals/users.signals';
import { Wrapper } from './Login.styles';

const LOGIN_SCHEMA = z.object({
  email: z
    .string()
    .email('Invalid Email')
    .min(1, 'Please provide your email to login.'),
  password: z.string().min(1, 'Please provide your password to login.'),
});

export default function Login() {
  const navigate = useNavigate({ from: '/login' });
  const {
    state: {
      location: { search },
    },
  } = useRouter();
  const redirectURL: ToPathOption =
    (search as Partial<{ redirect: string }>).redirect ?? '/dashboard';

  const handleSubmit: FormikConfig<UserLogin>['onSubmit'] = (
    values,
    { setErrors, setSubmitting, validateForm },
  ) => {
    void validateForm(values);

    logInUser(values)
      .then(async (res) => {
        userContext.value = res;
        setSubmitting(false);
      })
      .then(() => {
        void navigate({ to: redirectURL });
      })
      .catch((err) => {
        setErrors({ password: err.response.data.errors[0].message });
        setSubmitting(false);
      });
  };

  return (
    <Wrapper>
      <Column>Image Here</Column>
      <Column>
        <h1>Login!</h1>
        <Spacer $height={40} />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validate={toFormikValidate(LOGIN_SCHEMA)}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
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
                  <ErrorWrapper>
                    <ErrorMessage name="password" />
                  </ErrorWrapper>
                </Column>
              </Row>
              <Spacer $height={12} />
              <Row>
                <Button
                  disabled={isSubmitting}
                  style={{ flex: 1 }}
                  type="submit"
                >
                  Login
                </Button>
              </Row>
            </form>
          )}
        </Formik>
      </Column>
    </Wrapper>
  );
}
