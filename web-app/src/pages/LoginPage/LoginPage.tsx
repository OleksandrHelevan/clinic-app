import { Link } from 'react-router-dom';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import type { LoginRequest } from '../../domains/users/types';
import { useLogin } from '../../domains/users/useLogin/useLogin';
import { Logo } from '../../assets/Logo';
import { SIGNUP_PATH } from '../../constants/paths';
import {
  LoginFormFooter,
  LoginPageRoot,
  LoginWrapper,
  SignUpFlow,
} from './LoginPage.styles';

export default function LoginPage() {
  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginRequest) => {
    mutate(data);
  };

  return (
    <LoginPageRoot>
      <LoginWrapper>
        <Form<LoginRequest>
          onSubmit={onSubmit}
          title="Avyro"
          maxWidth={480}
          logo={<Logo />}
        >
          {() => (
            <>
              <TextInput
                name="email"
                label="Email"
                type="email"
                placeholder="doctor@avyro.com"
                rules={{
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: 'Wrong email' },
                }}
              />

              <TextInput
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                rules={{
                  required: "Password required",
                  minLength: { value: 6, message: 'Min 6 characters' },
                }}
              />

              <LoginFormFooter>
                <Button variant="primary" type="submit" fullWidth disabled={isPending}>
                  {isPending ? 'Loading...' : 'Log In'}
                </Button>
                <SignUpFlow>
                  <p>Do not have account?</p>
                  <Link to={SIGNUP_PATH}>Sign up</Link>
                </SignUpFlow>
              </LoginFormFooter>
            </>
          )}
        </Form>
      </LoginWrapper>
    </LoginPageRoot>
  );
}
