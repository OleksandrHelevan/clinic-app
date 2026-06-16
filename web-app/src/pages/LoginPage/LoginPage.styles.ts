import styled from '@emotion/styled';
import { AuthPage, AuthWrapper } from '../../styles/layout.styles';
import { theme } from '../../styles/theme';

export const LoginPageRoot = styled(AuthPage)``;

export const LoginWrapper = styled(AuthWrapper)``;

export const LoginFormFooter = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SignUpFlow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  font-size: 14px;
  color: ${theme.colors.textGray};

  p {
    margin: 0;
  }
`;
