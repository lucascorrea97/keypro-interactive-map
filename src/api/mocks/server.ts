// Libraries
import { setupServer } from 'msw/node';

// Handlers
import { handlers } from './handlers';

// Set up the MSW server with the handlers
export const server = setupServer(...handlers);

// Set up the server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
