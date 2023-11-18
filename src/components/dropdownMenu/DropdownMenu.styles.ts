import styled from 'styled-components';

export const Menu = styled.span`
  position: relative;
`;

export const MenuItems = styled.ul(
  ({ theme: { menu } }) => `
    background-color: ${menu.background};
    border: 1px solid ${menu.border};
    border-radius: 4px;
    bottom: -4px;
    display: inline-flex;
    flex-direction: column;
    min-width: 150px;
    position: absolute;
    right: 0;
    transform: translateY(100%);
    z-index: 1;

    & > li {
      display: inline-flex;
      flex-grow: 1;
    }
  `,
);

export const MenuItem = styled.button(
  ({ theme: { listItem } }) => `
    all: unset;
    align-items: center;
    background-color: ${listItem.background};
    color: ${listItem.text};
    display: inline-flex;
    flex-grow: 1;
    line-height: 20px;
    padding: 8px 12px;

    & svg {
      width: 16px;
    }

    &:hover {
      background-color: ${listItem.hover.background};
      cursor: pointer;
    }

    &:focus {
      background-color: ${listItem.focus.background};
      outline: ${listItem.focus.outline};
    }
  `,
);
