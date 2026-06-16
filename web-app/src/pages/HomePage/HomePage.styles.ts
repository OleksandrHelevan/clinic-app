import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const HomePageRoot = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
`;

export const HomeHero = styled.div`
  max-width: 640px;
  padding: 48px 40px;
  border-radius: 28px;
  background: ${theme.glass.bgStrong};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.glass.border};
  box-shadow: ${theme.glass.shadow};
`;

export const HomeTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -1px;
  margin: 0 0 16px;
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const HomeSubtitle = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: ${theme.colors.textGray};
  line-height: 1.6;
`;
