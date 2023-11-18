import { useSignal } from '@preact/signals-react';
import { type ToPathOption, useNavigate } from '@tanstack/react-router';
import { type KeyboardEvent, type MouseEvent, useRef } from 'react';

import { Menu, MenuItem, MenuItems } from './DropdownMenu.styles';
import { type DropdownMenuProps } from './DropdownMenu.types';

export default function DropdownMenu<T>({
  items,
  trigger,
}: DropdownMenuProps<T>) {
  const openSignal = useSignal(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate({
    from: '/dashboard',
  });

  const handleToggleMenu = (
    e: MouseEvent<T | HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    openSignal.value = !openSignal.value;
  };

  return (
    <Menu>
      {trigger(handleToggleMenu, buttonRef)}
      {openSignal.value ? (
        <MenuItems>
          {items.map((item) => {
            const {
              handleClick = () => {
                console.warn('Not Implemented.');
              },
              href,
              key,
              label,
            } = item;

            return (
              <li key={key}>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();

                    if (href) {
                      void navigate({ to: href as ToPathOption });
                    }

                    handleClick(e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      handleToggleMenu(e);
                      buttonRef.current?.focus();
                    }
                  }}
                  tabIndex={0}
                >
                  <p>{label}</p>
                </MenuItem>
              </li>
            );
          })}
        </MenuItems>
      ) : null}
    </Menu>
  );
}
