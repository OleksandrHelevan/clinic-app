import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '../../styles/theme';

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatLight = keyframes`
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(30px, -20px) scale(1.05) rotate(5deg); }
  66% { transform: translate(-20px, 30px) scale(0.95) rotate(-5deg); }
  100% { transform: translate(0, 0) scale(1) rotate(0deg); }
`;

const swimIcon = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0.35; }
  25% { transform: translate(15px, 15px) rotate(10deg); opacity: 0.2; }
  50% { transform: translate(-10px, 30px) rotate(-5deg); opacity: 0.35; }
  75% { transform: translate(-20px, 10px) rotate(5deg); opacity: 0.2; }
  100% { transform: translate(0, 0) rotate(0deg); opacity: 0.35; }
`;

export const BrightGradientBg = styled.div`
  position: fixed;
  inset: 0;
  background: ${theme.gradients.background};
  background-size: 300% 300%;
  animation: ${gradientFlow} 15s ease-in-out infinite;
  overflow: hidden;
  z-index: -3;
`;

export const LightBlob = styled.div<{ variant: 1 | 2 }>`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: ${floatLight} 25s infinite alternate ease-in-out;
  z-index: -2;

  ${({ variant }) =>
    variant === 1
      ? `
    width: 700px;
    height: 700px;
    background: rgba(24, 192, 196, 0.25);
    top: -10%;
    left: 10%;
  `
      : `
    width: 800px;
    height: 800px;
    background: rgba(114, 86, 161, 0.35);
    bottom: -20%;
    right: 10%;
    animation-delay: -5s;
  `}
`;

export const FloatingIconsContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
`;

const iconBase = (size: number, top: string, left: string, svg: string, delay = '0s') => `
  width: ${size}px;
  height: ${size}px;
  top: ${top};
  left: ${left};
  animation-delay: ${delay};
  background-image: url('data:image/svg+xml;utf8,${svg}');
`;

export const BgIcon = styled.div<{ icon: 'heart' | 'cross' | 'pill' | 'heart2' | 'plus' }>`
  position: absolute;
  opacity: 0.35;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  animation: ${swimIcon} 25s infinite ease-in-out;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${({ icon }) => {
    const heart = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" fill="%23ffffff"/></svg>';
    const cross = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H240V32c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v176H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h176v176c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h176c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" fill="%23ffffff"/></svg>';
    const pill = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M192 128h-32c-17.67 0-32 14.33-32 32v32H96c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h32v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V256h-32v-64h64c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32zm224 0h-32v32h-64v-32c0-17.67-14.33-32-32-32s-32 14.33-32 32v32h-64v-32c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v160c0 17.67 14.33 32 32 32h192c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32zm-32 160h-160V160h160v128z" fill="%23ffffff"/></svg>';

    switch (icon) {
      case 'heart':
        return iconBase(45, '15%', '8%', heart);
      case 'cross':
        return iconBase(35, '65%', '85%', cross, '-5s');
      case 'pill':
        return iconBase(30, '35%', '92%', pill, '-10s');
      case 'heart2':
        return iconBase(40, '80%', '30%', heart, '-15s');
      case 'plus':
        return iconBase(30, '50%', '5%', cross, '-20s');
    }
  }}
`;
