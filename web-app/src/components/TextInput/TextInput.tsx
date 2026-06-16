import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorText, Field, Input, InputWrapper, Label, TogglePasswordButton } from './TextInput.styles';

interface TextInputProps {
  name: string;
  label: string;
  type?: 'text' | 'password' | 'tel' | 'email';
  placeholder?: string;
  rules?: object;
}

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export default function TextInput({ name, label, type = 'text', placeholder, rules }: TextInputProps) {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const error = errors[name];
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
      <Field>
        <Label htmlFor={name}>{label}</Label>
        <InputWrapper>
          <Input
              {...register(name, rules)}
              id={name}
              type={inputType}
              placeholder={placeholder}
              hasError={Boolean(error)}
              style={isPassword ? { paddingRight: '46px' } : undefined}
          />
          {isPassword && (
              <TogglePasswordButton
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Приховати пароль' : 'Показати пароль'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </TogglePasswordButton>
          )}
        </InputWrapper>
        {error && <ErrorText>{error.message as string}</ErrorText>}
      </Field>
  );
}