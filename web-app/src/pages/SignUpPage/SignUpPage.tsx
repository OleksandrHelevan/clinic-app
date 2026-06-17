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
import {Logo} from "../../assets/Logo.tsx";

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
              logo={<Logo />}
              title="Sign Up"
              maxWidth={450}
          >
            {({ register, formState: { errors } }) => (
                <>
                  <TextInput
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="doctor@avyro.com"
                      rules={{
                        required: 'Enter email',
                        pattern: { value: /^\S+@\S+$/i, message: 'Wrong format' },
                      }}
                  />

                  <TextInput
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                      rules={{
                        required: 'New password',
                        minLength: { value: 6, message: 'Min 6 characters' },
                      }}
                  />

                  <RoleField>
                    <RoleLabel>You register as:</RoleLabel>
                    <RadioGroup>
                      <RadioOption>
                        <input type="radio" value="PATIENT" {...register('role', { required: 'Choose role' })} />
                        <RadioCustom />
                        <RadioText>Patient</RadioText>
                      </RadioOption>
                      <RadioOption>
                        <input type="radio" value="DOCTOR" {...register('role', { required: 'Choose role' })} />
                        <RadioCustom />
                        <RadioText>Doctor</RadioText>
                      </RadioOption>
                    </RadioGroup>
                    {errors.role && <RoleError>{errors.role.message as string}</RoleError>}
                  </RoleField>

                  <SignUpFormFooter>
                    <Button variant="primary" type="submit" fullWidth>
                      Sign Up
                    </Button>
                    <BackToLogin>
                      <p>Already have account?</p>
                      <Link to={LOGIN_PATH}>Login</Link>
                    </BackToLogin>
                  </SignUpFormFooter>
                </>
            )}
          </Form>
        </SignUpWrapper>
      </SignUpPageRoot>
  );
}