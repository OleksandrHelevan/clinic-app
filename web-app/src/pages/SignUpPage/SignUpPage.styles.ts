import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const SignUpPageRoot = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  position: relative;
  z-index: 1;
`;

export const SignUpWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const SignUpFormFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

export const BackToLogin = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  font-size: 14px;
  color: ${theme.colors.textGray};
  p { margin: 0; }
`;

export const RoleField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const RoleLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.textGray};
  margin-left: 2px;
`;

export const RoleError = styled.span`
  font-size: 12px;
  color: ${theme.colors.danger};
  font-weight: 500;
  margin-left: 2px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
`;

export const RadioCustom = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  position: relative;
  background: white;
  transition: all 0.3s ease;
`;

export const RadioOption = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.55);
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.75);
  }

  input[type='radio'] {
    display: none;
  }

  &:has(input:checked) {
    border-color: ${theme.colors.medBlue};
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);

    input[type='radio'] + span {
      border-color: ${theme.colors.medBlue};
      background: ${theme.colors.medBlue};

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
      }
    }
  }
`;

export const RadioText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.textGray};
`;