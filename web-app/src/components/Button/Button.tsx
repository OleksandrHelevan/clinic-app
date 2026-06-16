import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledButton, type ButtonVariant } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <StyledButton type={type} variant={variant} fullWidth={fullWidth} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
}
