import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const FormCard = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 40px 40px 28px;
  border-radius: 24px;
  background: ${theme.glass.bgStrong};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.glass.border};
  box-shadow: ${theme.glass.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.15);
  }
`;

export const FormHeaderArea = styled.div`
  text-align: center;
  margin-bottom: 28px;
`;

export const FormCardTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  margin: 12px 0 8px;
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const FormCardSubtitle = styled.p`
  font-size: 15px;
  color: ${theme.colors.textGray};
  margin: 0;
`;

export const FormMainContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
