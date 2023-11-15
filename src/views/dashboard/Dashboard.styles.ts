import styled from 'styled-components';

import { Column, PageWrapper } from '../../components/wrappers';

export const DashboardWrapper = styled(PageWrapper)(
  ({ theme }) => `
  background-color: ${theme.background};

  & > ${Column}:first-of-type {
    border-right: 2px solid ${theme.colors.grey};
    justify-content: flex-end;
    padding: 20px;
  }

  & > ${Column}:nth-of-type(2) {
    align-items: stretch;
    border-right: 2px solid ${theme.colors.grey};
    flex-basis: 350px;
  }
`,
);
