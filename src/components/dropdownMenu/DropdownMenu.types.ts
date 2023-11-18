import { type FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { type ButtonHTMLAttributes, type RefObject } from 'react';

interface DropdownMenuItem {
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  id?: string;
  key: string;
  label: string;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  triggerElRenderer: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & {
      icon: FontAwesomeIconProps['icon'];
      ref?: RefObject<any>;
      size?: FontAwesomeIconProps['size'];
    },
  ) => JSX.Element;
}

export type { DropdownMenuProps };
