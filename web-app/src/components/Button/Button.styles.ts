import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';

export const StyledButton = styled.button<{ variant: ButtonVariant; fullWidth?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  line-height: 1.25rem;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  user-select: none;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  &:disabled {
    opacity: 0.55;
    pointer-events: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px ${theme.colors.medBlue};
  }

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.gradients.primary};
          color: ${theme.colors.textInverse};
          box-shadow: 0 4px 18px ${theme.shadows.blue};
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px ${theme.shadows.blueHover};
            background: ${theme.gradients.primaryHover};
          }
        `;
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.7);
          color: ${theme.colors.textDark};
          border-color: ${theme.glass.border};
          backdrop-filter: blur(8px);
          &:hover:not(:disabled) { background: rgba(255, 255, 255, 0.9); transform: translateY(-1px); }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.medBlue};
          border: 1.5px solid rgba(59, 130, 246, 0.5);
          &:hover:not(:disabled) { background: rgba(255, 255, 255, 0.5); border-color: ${theme.colors.medBlue}; }
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          &:hover:not(:disabled) { box-shadow: 0 4px 16px rgba(239, 68, 68, 0.35); }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.textGray};
          &:hover:not(:disabled) { background: rgba(255, 255, 255, 0.4); color: ${theme.colors.textDark}; }
        `;
    }
  }}
`;
