import { userContext } from '../../signals/users.signals';
import * as SAvatar from './Avatar.styles';
import { type AvatarProps } from './Avatar.types';

export default function Avatar({
  background = undefined,
  size = 'md',
}: AvatarProps) {
  return (
    <SAvatar.Wrapper background={background} size={size}>
      {userContext.value.name?.split(' ').map((name) => name[0])}
    </SAvatar.Wrapper>
  );
}
