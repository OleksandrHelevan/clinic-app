import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 20px 48px;
`;

export const ProfileCentered = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
`;

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProfileErrorCard = styled.div`
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  background: ${theme.glass.bgStrong};
  backdrop-filter: blur(16px);
  border: 1px solid ${theme.glass.border};
  box-shadow: ${theme.glass.shadow};
`;

export const ProfileActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const LogoutButton = styled.button`
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.5);
  color: ${theme.colors.danger};
  border: 1.5px solid ${theme.colors.dangerBorder};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  font-family: inherit;

  &:hover {
    background: ${theme.colors.dangerBg};
    border-color: ${theme.colors.danger};
  }
`;
