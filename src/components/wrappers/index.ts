import styled from 'styled-components';

const PageWrapper = styled.main(({ theme }) => `
  background-color: ${theme.page.background};
  color: ${theme.page.text};
  display: flex;
  height: 100vh;
  max-height: 100vh;

`);

const Row = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Spacer = styled.span<{ height?: number, width?: number }>(({ height = 0, width = 0 }) => `
  display: inline-flex;
  height: ${height}px;
  width: ${width}px;
`)

export {
  Column,
  PageWrapper,
  Row,
  Spacer,
}