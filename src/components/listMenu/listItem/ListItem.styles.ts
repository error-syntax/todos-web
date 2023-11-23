import styled from 'styled-components';

import { type ContainerProps } from '@/components/containers/containers.types';

export const Wrapper = styled.button<{
  $active: boolean;
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

  ${
    $active &&
    ($theme === 'light'
      ? `
        --tw-bg-opacity: 1;
        background-color: rgba(209, 213, 219, var(--tw-bg-opacity)) !important;
      `
      : `
        --tw-bg-opacity: 1;
        background-color: rgba(229, 231, 235, var(--tw-bg-opacity)) !important;
        color: black;
      `)
  }
`,
);
