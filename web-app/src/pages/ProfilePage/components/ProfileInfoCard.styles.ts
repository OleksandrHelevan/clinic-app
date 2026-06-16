import styled from '@emotion/styled';
import { theme } from '../../../styles/theme';

export const ProfileCard = styled.div`
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: ${theme.glass.bgStrong};
  backdrop-filter: blur(16px);
  border: 1px solid ${theme.glass.border};
  box-shadow: ${theme.glass.shadow};
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ProfileAvatarImg = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.5);
`;

export const ProfileAvatarFallback = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: ${theme.gradients.primary};
  color: ${theme.colors.textInverse};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 600;
  flex-shrink: 0;
  border: 3px solid rgba(255, 255, 255, 0.8);
`;

export const ProfileTitles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${theme.colors.textDark};
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.65);
  color: ${theme.colors.medPurple};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  align-self: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

export const SpecializationText = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.textMuted};
  font-weight: 600;
`;

export const ProfileInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const InfoValue = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.textDark};
  font-weight: 600;
`;
