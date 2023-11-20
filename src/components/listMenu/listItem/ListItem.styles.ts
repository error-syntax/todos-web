import styled from 'styled-components';

export const Wrapper = styled.button<{
  $active: boolean;
  $editing: boolean;
}>(
  ({ $active, $editing, theme: { listItem, shadow } }) => `
    align-items: center;
    background-color: ${listItem.background};
    border-radius: 4px;
    box-shadow: ${$active ? shadow : 'none'};
    cursor: pointer;
    display: inline-flex;
    flex-grow: 1;
    font-size: 16px;
    height: 50px;
    justify-content: ${$editing ? 'stretch' : 'space-between'};
    line-height: 20px;
    min-width: 250px;
    padding: 8px 12px; 
    position: relative;

    & p {
      color: ${listItem.text};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > input {
      flex-grow: 1;
    }

    ${
      $active &&
      `
        background-color: ${listItem.hover.background};
        border: 1px solid ${listItem.hover.border};
        outline: 1px solid ${listItem.hover.outline};

        & p {
          color: ${listItem.hover.text};
        }
      `
    }

    & > svg {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
    }


    &:hover {
      background-color: ${listItem.hover.background};
      border: ${listItem.hover.border};
      outline: 1px solid ${listItem.hover.outline};

      & p {
        color: ${listItem.hover.text};
      }
    }

    &:focus {
      background-color: ${listItem.focus.background};
      border: ${listItem.focus.border};
      outline: 1px solid ${listItem.focus.outline};

      & p {
        color: ${listItem.focus.text};
      }
    }
  `,
);
