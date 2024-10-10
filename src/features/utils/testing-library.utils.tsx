// Libraries
import { render } from '@testing-library/react';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from 'react-query';

// Design System
import { ThemeProvider } from '@chakra-ui/react';
import theme from '../../design-system/foundation/theme';

function mainRender(UI: React.JSX.Element) {
  return render(UI, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
  });
}

function renderWithClient(
  ui: React.ReactElement,
  queryClientConfig?: QueryClientConfig
) {
  const client = new QueryClient(queryClientConfig);
  return mainRender(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
}

export { renderWithClient };
