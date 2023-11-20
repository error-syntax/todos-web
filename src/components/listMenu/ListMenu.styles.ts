import styled from 'styled-components';

export const Wrapper = styled.ul`
  display: inline-flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: normal;
  overflow: scroll;
  padding: 20px 12px;

  & > li {
    display: inline-flex;
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
