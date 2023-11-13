import type { Preview } from '@storybook/react';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { theme } from '../theme';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circle',
      items: ['light', 'dark'],
    },
  },
};

const Wrapper = styled.span`
  display: inline-flex;
  height: 100vh;
  width: 100vw;

  * {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }
`

const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={theme(context.globals.theme)}>
      <Wrapper>
        <Story {...context} />
      </Wrapper>
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
