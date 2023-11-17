import styled from 'styled-components';

export const IconWrapper = styled.button(
  ({ theme: { icon } }) => `
    // resetting button defaults
    background-color: transparent;
    border: none;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
    padding: 0;

    align-items: center;
    border-radius: 50%;
    display: inline-flex;
    height: 36px;
    justify-content: center;
    width: 36px;

    &:hover {
      background: ${icon.hover.background};
      border: 1px solid ${icon.hover.border};
      color: ${icon.hover.text};
      outline: 1px solid ${icon.hover.outline};
    }

    &:focus {
      background: ${icon.focus.background};
      border: 1px solid ${icon.focus.border};
      color: ${icon.focus.text};
      outline: 1px solid ${icon.focus.outline};
    }
  `,
);
