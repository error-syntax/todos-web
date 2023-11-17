import styled from 'styled-components';

import { Column, PageWrapper } from '../../components/containers';

export const DashboardWrapper = styled(PageWrapper)(
  ({ theme: { background, colors, name } }) => `
  background-color: ${background};

  & > ${Column}:first-of-type {
    border-right: 1px solid ${name === 'light' ? colors.white80 : colors.grey};
    justify-content: flex-end;
    padding: 20px;
  }

  & > ${Column}:nth-of-type(2) {
    align-items: stretch;
    border-right: 1px solid ${name === 'light' ? colors.white80 : colors.grey};
    flex-basis: 350px;
  }

  & > ${Column}:nth-of-type(3) {
    flex: 1;

    & #list_header_row {
      align-items: center;
      justify-content: space-between;
    }
  }
`,
);
