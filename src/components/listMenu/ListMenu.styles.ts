import styled from 'styled-components';

import { Wrapper as ListItemWrapper } from './listItem/ListItem.styles';

export const Wrapper = styled.ul`
  display: inline-flex;
  flex-direction: column;
  justify-content: normal;
  padding: 12px;

  & > li {
    flex-grow: 0;
  }
`;

export const AddListButton = styled(ListItemWrapper)(({ theme }) => `
  & > p,
  &:hover > p,
  &:focus > p {
    color: ${theme.colors.lightBlue};
  }
`);