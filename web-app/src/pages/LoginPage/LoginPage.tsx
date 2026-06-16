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
          title="Вхід в Avyro"
          subtitle="Авторизуйтесь"
          maxWidth={450}
          logo={<Logo />}
        >
          {() => (
            <>
              <TextInput
                name="email"
                label="Електронна пошта"
                type="email"
                placeholder="doctor@avyro.com"
                rules={{
                  required: "Email обов'язковий",
                  pattern: { value: /^\S+@\S+$/i, message: 'Некоректний email' },
                }}
              />

              <TextInput
                name="password"
                label="Пароль"
                type="password"
                placeholder="••••••••"
                rules={{
                  required: "Пароль обов'язковий",
                  minLength: { value: 6, message: 'Мінімум 6 символів' },
                }}
              />

              <LoginFormFooter>
                <Button variant="primary" type="submit" fullWidth disabled={isPending}>
                  {isPending ? 'Вхід...' : 'Увійти'}
                </Button>
                <SignUpFlow>
                  <p>Нема акаунту?</p>
                  <Link to={SIGNUP_PATH}>Зареєструватись</Link>
                </SignUpFlow>
              </LoginFormFooter>
            </>
          )}
        </Form>
      </LoginWrapper>
    </LoginPageRoot>
  );
}
