import {
  BgIcon,
  BrightGradientBg,
  FloatingIconsContainer,
  LightBlob,
} from './AnimatedBackground.styles';

const AnimatedBackground = () => (
  <>
    <BrightGradientBg>
      <LightBlob variant={1} />
      <LightBlob variant={2} />
    </BrightGradientBg>

    <FloatingIconsContainer>
      <BgIcon icon="heart" />
      <BgIcon icon="cross" />
      <BgIcon icon="pill" />
      <BgIcon icon="heart2" />
      <BgIcon icon="plus" />
    </FloatingIconsContainer>
  </>
);

export default AnimatedBackground;
