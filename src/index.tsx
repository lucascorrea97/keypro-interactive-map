// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';

// Containers
import App from './App';

// API
import { worker } from './api/mocks/browser';

// Contexts
import { PointsOfInterestProvider } from './features/interactive-map/services/context/points-of-interest-context';

// Design System
import theme from './design-system/foundation/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

const renderRoot = () =>
  root.render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <PointsOfInterestProvider>
            <App />
          </PointsOfInterestProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </React.StrictMode>
  );

if (process.env.NODE_ENV === 'development') {
  // Wait for the service worker to start
  worker.start().then(() => {
    // Start the React app after MSW is ready
    renderRoot();
  });
} else {
  renderRoot();
}
