import colors from '@theme/colors';
import styled from 'styled-components';

import { type ContainerProps } from '@/components/containers/containers.types';

export const Wrapper = styled.button<{
  $active: boolean;
  $editing: boolean;
  $theme: ContainerProps['$theme'];
}>(
  ({ $active, $theme }) => `
    align-items: center;
    background-color: transparent;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    flex-grow: 1;
    font-size: 16px;
    height: 50px;
    justify-content: space-between;
    line-height: 20px;
    min-width: 250px;
    padding: 8px 12px; 
    position: relative;

    & p {
      color: ${$theme === 'light' ? colors.black90 : colors.white90};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > input {
      flex-grow: 1;
    }

    & > svg {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
    }

    &:hover,
    &:focus {
      background-color: ${$theme === 'light' ? colors.white90 : colors.black90};
      border: ${$theme === 'light' ? colors.white70 : colors.black70};
      outline: 1px solid ${
        $theme === 'light' ? colors.white70 : colors.black70
      };

      & p {
        color: ${$theme === 'light' ? colors.black90 : colors.white90};
      }
    }

    ${
      $active &&
      `
        background-color: ${
          $theme === 'light' ? colors.white80 : colors.black80
        };
        border: ${$theme === 'light' ? colors.white70 : colors.black70};
        outline: 1px solid ${
          $theme === 'light' ? colors.white70 : colors.black70
        };

        & p {
          color: ${$theme === 'light' ? colors.black90 : colors.white90};
        }
      `
    }
  `,
);
