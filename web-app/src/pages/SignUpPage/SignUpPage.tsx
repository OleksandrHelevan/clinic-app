import { Link } from 'react-router-dom';
import type { SignUpRequest } from '../../domains/users/types';
import Form from '../../components/Form/Form';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { useSignUp } from '../../domains/users/useSignUp/useSignUp';
import { LOGIN_PATH } from '../../constants/paths';
import {
  BackToLogin,
  RadioCustom,
  RadioGroup,
  RadioOption,
  RadioText,
  RoleError,
  RoleField,
  RoleLabel,
  SignUpFormFooter,
  SignUpPageRoot,
  SignUpWrapper,
} from './SignUpPage.styles';

export default function SignUpPage() {
  const { mutate } = useSignUp();

  const onSubmit = (data: SignUpRequest) => {
    mutate(data);
  };

  return (
      <SignUpPageRoot>
        <SignUpWrapper>
          <Form<SignUpRequest>
              onSubmit={onSubmit}
              title="Реєстрація"
              subtitle="Доєднайся до платформи"
              maxWidth={450}
          >
            {({ register, formState: { errors } }) => (
                <>
                  <TextInput
                      name="email"
                      label="Електронна пошта"
                      type="email"
                      placeholder="doctor@avyro.com"
                      rules={{
                        required: 'Введіть email',
                        pattern: { value: /^\S+@\S+$/i, message: 'Некоректний формат' },
                      }}
                  />

                  <TextInput
                      name="password"
                      label="Пароль"
                      type="password"
                      placeholder="••••••••"
                      rules={{
                        required: 'Вигадайте пароль',
                        minLength: { value: 6, message: 'Мінімум 6 символів' },
                      }}
                  />

                  <RoleField>
                    <RoleLabel>Ви реєструєтесь як:</RoleLabel>
                    <RadioGroup>
                      <RadioOption>
                        <input type="radio" value="PATIENT" {...register('role', { required: 'Оберіть роль' })} />
                        <RadioCustom />
                        <RadioText>Пацієнт</RadioText>
                      </RadioOption>
                      <RadioOption>
                        <input type="radio" value="DOCTOR" {...register('role', { required: 'Оберіть роль' })} />
                        <RadioCustom />
                        <RadioText>Лікар</RadioText>
                      </RadioOption>
                    </RadioGroup>
                    {errors.role && <RoleError>{errors.role.message as string}</RoleError>}
                  </RoleField>

                  <SignUpFormFooter>
                    <Button variant="primary" type="submit" fullWidth>
                      Зареєструватись
                    </Button>
                    <BackToLogin>
                      <p>Вже маєте акаунт?</p>
                      <Link to={LOGIN_PATH}>Увійти</Link>
                    </BackToLogin>
                  </SignUpFormFooter>
                </>
            )}
          </Form>
        </SignUpWrapper>
      </SignUpPageRoot>
  );
}