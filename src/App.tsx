import '../app/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider as $ThemeProvider } from 'styled-components';

import { theme } from '../theme';
import { ThemeProvider } from './components/theme-provider';
import router from './Route';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryOnMount: false,
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false,
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <$ThemeProvider theme={theme('light')}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </$ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
