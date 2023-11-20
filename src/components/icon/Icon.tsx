import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type ForwardedRef, forwardRef } from 'react';

import { IconWrapper } from './Icon.styles';
import { type IconProps } from './Icon.types';

function Icon(
  {
    icon,
    onClick,
    onKeyDown,
    size,
    tabIndex = -1,
    ...otherProps
  }: IconProps<HTMLLIElement>,
  ref: ForwardedRef<HTMLLIElement>,
) {
  return (
    <IconWrapper
      {...otherProps}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={ref}
      tabIndex={tabIndex}
    >
      <FontAwesomeIcon icon={icon} size={size} />
    </IconWrapper>
  );
}
Icon.displayName = 'Icon';

export default forwardRef(Icon);
