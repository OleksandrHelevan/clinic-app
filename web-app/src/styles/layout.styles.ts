import styled from '@emotion/styled';

export const AeroViewport = styled.div`
  min-height: 100vh;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PageShell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const AppHeader = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const MainContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AuthPage = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  position: relative;
  z-index: 1;
`;

export const AuthWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
