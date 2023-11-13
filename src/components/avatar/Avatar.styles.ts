import styled from 'styled-components';
import { AvatarProps } from './Avatar.types';

enum AvatarSize {
  'sm' = '24px',
  'md' = '40px',
  'lg' = '56px',
};

enum AvatarFontSize {
  'sm' = '10px',
  'md' = '18px',
  'lg' = '24px',
}

const Wrapper = styled.span<AvatarProps>(({ background, theme, size = 'md', }) => `
  align-items: center;
  background: ${background || theme.colors.black};
  border-radius: 50%;
  color: ${theme.colors.white};
  cursor: pointer;
  display: inline-flex;
  font-size: ${AvatarFontSize[size]};
  height: ${AvatarSize[size]};
  justify-content: center;
  width: ${AvatarSize[size]};
`,);

export {
  Wrapper,
}