import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

export const CustomDropdown = styled.div`
  position: relative;
  width: 100%;
  min-width: 200px;
  font-family: inherit;
  user-select: none;
`;

export const DropdownHeader = styled.div<{ open?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.75);
  border: 1.5px solid rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: ${theme.colors.textDark};
  border-color: ${({ open }) => (open ? theme.colors.medBlue : 'rgba(255, 255, 255, 0.9)')};
  box-shadow: ${({ open }) => (open ? '0 0 0 3px rgba(59, 130, 246, 0.15)' : 'none')};

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

export const Placeholder = styled.span`
  color: #9ca3af;
`;

export const DropdownArrow = styled.span<{ open?: boolean }>`
  font-size: 10px;
  color: ${theme.colors.textMuted};
  transition: transform 0.3s ease;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'none')};
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid ${theme.glass.border};
  border-radius: 12px;
  box-shadow: ${theme.glass.shadow};
  margin: 0;
  padding: 4px 0;
  list-style: none;
  max-height: 250px;
  overflow-y: auto;
  z-index: 1000;
`;

export const DropdownItem = styled.li<{ selected?: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ selected }) => (selected ? theme.colors.medPurple : theme.colors.textGray)};
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  background: ${({ selected }) => (selected ? 'rgba(7, 182, 184, 0.15)' : 'transparent')};
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.08);
  }
`;

export const DropdownEmpty = styled.li`
  padding: 8px 16px;
  color: #9ca3af;
  font-size: 14px;
  text-align: center;
`;
