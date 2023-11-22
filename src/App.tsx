import '../app/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
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
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
