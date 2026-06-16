import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const NotFoundPageRoot = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`;

export const NotFoundCard = styled.div`
  text-align: center;
  padding: 48px 56px;
  border-radius: 28px;
  background: ${theme.glass.bgStrong};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.glass.border};
  box-shadow: ${theme.glass.shadow};
`;

export const NotFoundCode = styled.h2`
  margin: 0;
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const NotFoundTitle = styled.h1`
  margin: 12px 0 8px;
  font-size: 1.5rem;
  color: ${theme.colors.textDark};
`;

export const NotFoundText = styled.p`
  margin: 0;
  color: ${theme.colors.textGray};
`;
