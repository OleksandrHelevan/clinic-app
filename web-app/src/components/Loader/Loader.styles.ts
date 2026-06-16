import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 16px;
`;

export const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border: 4px solid rgba(255, 255, 255, 0.4);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
