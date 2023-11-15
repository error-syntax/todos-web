import styled from 'styled-components';

import { Column } from '../../components/wrappers';

export const Wrapper = styled.main`
  display: flex;
  height: 100vh;
  max-height: 100vh;

  & > ${Column}:first-of-type {
    background: ${({ theme }) => theme.colors.black};
    flex: 2;
  }

  & > ${Column}:last-of-type {
    align-items: center;
    flex: 3;
    padding: 20px;
    justify-content: center;

    & h1 {
      text-align: left;
    }
  }
`;
