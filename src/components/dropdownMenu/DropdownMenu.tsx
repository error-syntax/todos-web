import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSignal } from '@preact/signals-react';
import { type ToPathOption, useNavigate } from '@tanstack/react-router';
import { type KeyboardEvent, type MouseEvent, useRef } from 'react';

import { activeListData } from '../../signals/lists.signals';
import { Spacer } from '../containers';
import { Menu, MenuItem, MenuItems } from './DropdownMenu.styles';
import { type DropdownMenuProps } from './DropdownMenu.types';

export default function DropdownMenu({
  items,
  triggerElRenderer,
}: DropdownMenuProps) {
  const openSignal = useSignal(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate({
    from: '/dashboard',
  });

  const handleToggleMenu = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    openSignal.value = !openSignal.value;
  };

  return (
    <Menu
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          openSignal.value = false;
        }
      }}
    >
      {triggerElRenderer({
        'aria-expanded': openSignal.value,
        'aria-label': `Toggle List Options Menu for: ${activeListData.value?.name}`,
        icon: faEllipsisH,
        onClick: handleToggleMenu,
        ref: buttonRef,
        tabIndex: 0,
      })}
      {openSignal.value ? (
        <MenuItems>
          {items.map((item) => {
            const {
              handleClick = () => {
                console.warn('Not Implemented.');
              },
              href,
              icon,
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
                  {icon && (
                    <>
                      <FontAwesomeIcon icon={icon} />
                      <Spacer $width={8} />
                    </>
                  )}
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
