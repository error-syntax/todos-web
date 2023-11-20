import colors from '@theme/colors';
import styled from 'styled-components';

import { type ContainerProps } from '../containers/containers.types';

export const IconWrapper = styled.li<{ $theme: ContainerProps['$theme'] }>(
  ({ $theme }) => `
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
    cursor: pointer;
    display: inline-flex;
    height: 36px;
    justify-content: center;
    width: 36px;

    &:hover,
    &:focus {
      background: ${$theme === 'light' ? colors.blue10 : colors.blue20};
      border: 1px solid ${colors.blue60};
      outline: 1px solid ${colors.blue15};
    }
  `,
);
