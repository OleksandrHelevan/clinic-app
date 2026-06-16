import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar';
import { ChatProvider } from '../../components/Chat/context/ChatProvider';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import {
  AeroViewport,
  AppHeader,
  MainContainer,
  PageShell,
} from '../../styles/layout.styles';

export default function RootLayout() {
  const userId = localStorage.getItem('userId') || '';

  return (
    <AeroViewport>
      <AnimatedBackground />

      <ChatProvider currentUserId={userId}>
        <PageShell>
          <AppHeader>
            <NavBar
              isAuthenticated={Boolean(userId.trim())}
              currentUserId={userId}
            />
          </AppHeader>

          <MainContainer>
            <Outlet />
          </MainContainer>
        </PageShell>
      </ChatProvider>
    </AeroViewport>
  );
}
