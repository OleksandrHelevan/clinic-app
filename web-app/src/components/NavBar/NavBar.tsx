import { Logo } from '../../assets/Logo';
import { Avatar } from '../../assets/Avatar';
import { ChatIcon } from '../../assets/ChatIcon';
import { DOCTORS_PATH, LOGIN_PATH, ME_PATH } from '../../constants/paths';
import { useChatGlobal } from '../Chat/context/ChatContext';
import {
  AvatarLink,
  ChatNavBtn,
  LoginBtn,
  LogoLink,
  Navbar,
  NavbarRight,
  NavItemLink,
  NavLinks,
} from './NavBar.styles';

interface NavBarProps {
  isAuthenticated?: boolean;
  currentUserId?: string;
}

export function NavBar({ isAuthenticated = false }: NavBarProps) {
  const { openChat } = useChatGlobal();

  return (
    <Navbar>
      <LogoLink to="/">
        <Logo height={40} width={40} />
      </LogoLink>

      <NavLinks>
        <li>
          <NavItemLink to={DOCTORS_PATH}>Doctors</NavItemLink>
        </li>
      </NavLinks>

      <NavbarRight>
        {isAuthenticated ? (
          <>
            <ChatNavBtn onClick={() => openChat()} aria-label="Open chat">
              <ChatIcon height={32} width={32} />
            </ChatNavBtn>
            <AvatarLink to={ME_PATH}>
              <Avatar height={32} width={32} />
            </AvatarLink>
          </>
        ) : (
          <LoginBtn to={LOGIN_PATH}>Log in</LoginBtn>
        )}
      </NavbarRight>
    </Navbar>
  );
}
