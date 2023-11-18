import { type FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { type ForwardedRef, type HTMLProps } from 'react';

interface IconProps<K, T> {
  icon: FontAwesomeIconProps['icon'];
  onClick?: React.MouseEventHandler<K>;
  onKeyDown?: React.KeyboardEventHandler<K>;
  ref: ForwardedRef<T>;
  size?: FontAwesomeIconProps['size'];
  tabIndex?: HTMLProps<HTMLElement>['tabIndex'];
}

export type { IconProps };
