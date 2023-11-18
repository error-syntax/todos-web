import type { Preview } from '@storybook/react';
import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { theme } from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootRoute, Router, RouterProvider } from '@tanstack/react-router';

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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme(context.globals.theme)}>
        <Wrapper>
          <Story {...context} />
        </Wrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const withRouteContext = (Story, context) => {
  const rootRoute = new RootRoute({ component: Story });
  const router = new Router({ routeTree: rootRoute }) 

  return <RouterProvider router={router} />
}

export const decorators = [withThemeProvider, withRouteContext];

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
