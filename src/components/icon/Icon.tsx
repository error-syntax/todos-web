import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconWrapper } from './Icon.styles';
import { type IconProps } from './Icon.types';

export default function Icon({
  icon,
  onClick,
  onKeyDown,
  size,
  tabIndex = -1,
}: IconProps) {
  return (
    <IconWrapper onClick={onClick} onKeyDown={onKeyDown} tabIndex={tabIndex}>
      <FontAwesomeIcon icon={icon} size={size} />
    </IconWrapper>
  );
}
