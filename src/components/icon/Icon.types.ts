import { type FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { type ForwardedRef, type HTMLProps } from 'react';

interface IconProps<K> {
  icon: FontAwesomeIconProps['icon'];
  onClick?: React.MouseEventHandler<K>;
  onKeyDown?: React.KeyboardEventHandler<K>;
  ref: ForwardedRef<K>;
  size?: FontAwesomeIconProps['size'];
  tabIndex?: HTMLProps<HTMLElement>['tabIndex'];
}

export type { IconProps };
