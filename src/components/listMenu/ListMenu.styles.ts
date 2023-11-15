import styled from 'styled-components';

export const Wrapper = styled.ul`
  display: inline-flex;
  flex-direction: column;
  justify-content: normal;
  overflow: scroll;
  padding: 12px;

  & > li {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;