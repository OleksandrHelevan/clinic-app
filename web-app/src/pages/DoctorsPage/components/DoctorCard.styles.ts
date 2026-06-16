import styled from '@emotion/styled';
import { theme } from '../../../styles/theme';

export const DoctorCardRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 18px;
  color: ${theme.colors.textGray};
  background: ${theme.glass.bgStrong};
  backdrop-filter: blur(14px);
  border: 1px solid ${theme.glass.border};
  box-shadow: ${theme.glass.shadow};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(31, 38, 135, 0.18);
  }
`;

export const DoctorAvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  overflow: hidden;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const DoctorAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
`;

export const DoctorInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
  min-width: 0;
`;

export const DoctorName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.colors.textDark};
`;

export const DoctorSpecialty = styled.p`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 700;
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const DoctorContacts = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  p {
    margin: 0;
    font-size: 0.82rem;
    color: ${theme.colors.textMuted};
  }
`;

export const WriteButton = styled.button`
  margin-top: 10px;
  padding: 8px 14px;
  background: ${theme.gradients.primary};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  font-family: inherit;
  box-shadow: 0 4px 12px ${theme.shadows.blue};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px ${theme.shadows.blueHover};
    background: ${theme.gradients.primaryHover};
  }
`;
