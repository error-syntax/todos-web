import styled from 'styled-components';

import { Wrapper as ListItemWrapper } from '../listItem/ListItem.styles';

export const AddListButton = styled(ListItemWrapper)(
  ({ theme }) => `
  & > p,
  &:hover > p,
  &:focus > p {
    color: ${theme.colors.lightBlue};
  }
`,
);
