// Libraries
import { setupWorker } from 'msw/browser';

// Handlers
import { handlers } from './handlers';

// This sets up a mock service worker for the browser
export const worker = setupWorker(...handlers);
