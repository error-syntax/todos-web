import styled from 'styled-components';

import { Column, Row } from '../../components/containers';

export const Wrapper = styled.main`
  display: flex;
  height: 100vh;
  max-height: 100vh;

  & > ${Column}:first-of-type {
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

export const SignUpForm = styled.form`
  & > ${Row}:first-of-type {
    gap: 20px;

    & > ${Column} {
      flex-basis: calc(50% - 10px);
    }
  }

  & > ${Row} > ${Column} {
    flex-basis: 100%;
  }
`;
