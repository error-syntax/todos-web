import styled from 'styled-components';

import { type ContainerProps } from './containers.types';

const PageWrapper = styled.main<ContainerProps>(
  ({ $padding = 0 }) => `
  display: flex;
  height: 100vh;
  max-height: 100vh;
  padding: ${$padding}px;
`,
);

const Row = styled.div<ContainerProps>(
  ({ $padding = 0 }) => `
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${$padding}
`,
);

const Column = styled.div<ContainerProps>(
  ({ $padding = 0 }) => `
  display: flex;
  flex-direction: column;
  padding: ${$padding}px;
`,
);

const Spacer = styled.span<ContainerProps>(
  ({ $height = 0, $width = 0 }) => `
  display: inline-flex;
  height: ${$height}px;
  width: ${$width}px;
`,
);

export { Column, PageWrapper, Row, Spacer };
