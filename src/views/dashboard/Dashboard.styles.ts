import colors from '@theme/colors';
import styled from 'styled-components';

import { Column, PageWrapper } from '../../components/containers';

export const DashboardWrapper = styled(PageWrapper)(
  ({ $theme }) => `
  background-color: ${$theme === 'light' ? colors.white : colors.black};

  & > ${Column}:first-of-type {
    border-right: 1px solid ${
      $theme === 'light' ? colors.white80 : colors.black80
    };
    justify-content: flex-end;
    padding: 20px;
  }

  & > ${Column}:nth-of-type(2) {
    align-items: stretch;
    border-right: 1px solid ${
      $theme === 'light' ? colors.white80 : colors.black80
    };
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
