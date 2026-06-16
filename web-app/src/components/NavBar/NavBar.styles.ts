import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 48px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.45);
  color: white;

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
`;

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 28px;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const NavItemLink = styled(NavLink)`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  font-weight: 600;
  transition: color 0.2s ease, transform 0.2s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover,
  &.active {
    color: #ffffff;
    transform: translateY(-1px);
  }
`;

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ChatNavBtn = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  padding: 6px;
  cursor: pointer;
  display: flex;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: scale(1.05);
  }
`;

export const AvatarLink = styled(Link)`
  line-height: 0;
  transition: transform 0.2s ease;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);

  &:hover {
    transform: scale(1.06);
  }
`;

export const LoginBtn = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.45);
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: translateY(-1px);
    color: white;
  }
`;
