import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const DoctorsLayout = styled.div`
  display: flex;
  min-height: calc(100vh - 72px);

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const DoctorsSidebar = styled.aside`
  width: 260px;
  padding: 28px 20px;
  position: sticky;
  top: 72px;
  height: calc(100vh - 72px);
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(14px);
  border-right: 1px solid rgba(255, 255, 255, 0.45);

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.45);
  }
`;

export const SidebarTitle = styled.h3`
  margin: 0 0 20px;
  font-size: 1.15rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const SpecBtn = styled.button<{ active?: boolean }>`
  padding: 10px 14px;
  text-align: left;
  border: 1px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.2s ease;
  background: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.2)')};
  color: ${({ active }) => (active ? theme.colors.medPurple : 'rgba(255, 255, 255, 0.9)')};
  box-shadow: ${({ active }) => (active ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none')};

  &:hover {
    background: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.35)')};
    color: ${({ active }) => (active ? theme.colors.medPurple : 'white')};
  }

  @media (max-width: 900px) {
    flex: 1 1 auto;
    text-align: center;
  }
`;

export const ResetBtn = styled.button`
  margin-top: 12px;
  color: #ffe4e6;
  border: none;
  background: rgba(239, 68, 68, 0.25);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 10px;
  transition: background 0.2s;
  font-family: inherit;

  &:hover {
    background: rgba(239, 68, 68, 0.4);
  }
`;

export const DoctorsMain = styled.main`
  flex: 1;
  padding: 36px 40px 48px;
  max-width: 1200px;

  @media (max-width: 900px) {
    padding: 24px 16px 40px;
  }
`;

export const MainHeader = styled.header`
  margin-bottom: 28px;

  h1 {
    margin: 0 0 8px;
    font-size: 2rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
`;

export const Subtitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  margin-top: 40px;
  color: ${theme.colors.textGray};
  padding: 40px;
  border-radius: 20px;
  background: ${theme.glass.bgStrong};
  backdrop-filter: blur(16px);
  border: 1px solid ${theme.glass.border};
  box-shadow: ${theme.glass.shadow};

  h2 {
    color: ${theme.colors.textDark};
    margin-bottom: 12px;
  }
`;

export const ErrorText = styled.p`
  color: ${theme.colors.danger};
  background: ${theme.colors.dangerBg};
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.dangerBorder};
`;

export const DoctorsGrid = styled.div<{ loading?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
  pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};
  transition: opacity 0.2s ease;
`;

export const PaginationWrapper = styled.footer`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;

export const PaginationBtn = styled.button`
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.55);
  color: ${theme.colors.textDark};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  backdrop-filter: blur(8px);

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.85);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const PaginationInfo = styled.span`
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;
