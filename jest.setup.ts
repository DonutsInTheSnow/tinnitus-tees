import '@testing-library/jest-dom';

// Mock fetch and related globals directly
globalThis.fetch = jest.fn();
globalThis.Request = jest.fn((url, init) => ({
  url,
  method: init?.method || 'GET',
  headers: init?.headers || {},
  body: init?.body || null,
  json: async () => init?.body ? JSON.parse(init.body) : {},
})) as unknown as typeof Request;
globalThis.Response = jest.fn(() => ({})) as unknown as typeof Response;
globalThis.Headers = jest.fn(() => ({})) as unknown as typeof Headers;

