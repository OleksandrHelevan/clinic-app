import { Outlet } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import { AeroViewport } from '../../styles/layout.styles';

export default function AuthLayout() {
  return (
    <AeroViewport>
      <AnimatedBackground />
      <Outlet />
    </AeroViewport>
  );
}
