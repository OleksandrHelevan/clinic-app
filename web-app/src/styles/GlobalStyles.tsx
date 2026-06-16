import { Global, css } from '@emotion/react';
import { theme } from './theme';

const globalStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    color: ${theme.colors.textDark};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    background: transparent;
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: ${theme.colors.medBlue};
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: ${theme.colors.medPurple};
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
