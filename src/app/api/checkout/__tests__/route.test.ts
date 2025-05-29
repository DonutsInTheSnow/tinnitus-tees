// Mock environment variables
process.env.STRIPE_SECRET_KEY = 'test_stripe_key';
import { POST } from '../route';
import { NextRequest } from 'next/server';

// Mock Stripe globally
const mockCreate = jest.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test' });
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: mockCreate,
      },
    },
  }));
});

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      json: async () => data,
    })),
  },
}));

// Helper to create a mock NextRequest
const createMockNextRequest = (url: string, options: RequestInit): NextRequest => {
  const baseRequest = new Request(url, options) as NextRequest;

  // Mock the cookies property to match RequestCookies interface
  Object.defineProperty(baseRequest, 'cookies', {
    get: jest.fn(() => ({
      get: jest.fn(),
      getAll: jest.fn(() => []),
      has: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn(),
    })),
  });

  // Mock the nextUrl property with minimal required properties
  const mockNextUrl = {
    pathname: new URL(url).pathname,
    search: new URL(url).search,
    href: url,
    host: new URL(url).host,
    hostname: new URL(url).hostname,
    port: new URL(url).port,
    protocol: new URL(url).protocol,
    searchParams: new URL(url).searchParams,
    locale: 'en',
    defaultLocale: 'en',
    domainLocale: undefined,
    basePath: '',
    buildId: '',
    toString: jest.fn(() => url),
    toJSON: jest.fn(() => url),
  } as unknown as NextRequest['nextUrl'];

  Object.defineProperty(baseRequest, 'nextUrl', {
    get: jest.fn(() => mockNextUrl),
  });

  // Mock the ua property (NextRequest's ua can be undefined)
  Object.defineProperty(baseRequest, 'ua', {
    get: jest.fn(() => undefined),
  });

  return baseRequest;
};

describe('Checkout API Route', () => {
  let originalNodeEnv: string;

  beforeEach(() => {
    jest.clearAllMocks();
    originalNodeEnv = process.env.NODE_ENV || 'development';

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalNodeEnv,
      configurable: true,
    });
  });

  test('creates a checkout session and returns URL in production', async () => {
    const cart = [
      {
        stripe_price_id: 'price_1RQt4sIiYaNjDTVCFWLDtE6f',
        quantity: 1,
      },
    ];

    const request = createMockNextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });

    const response = await POST(request);
    const data = await response.json();
    console.log('Test response status:', response.status);
    console.log('Test response data:', data);

    expect(response.status).toBe(200);
    expect(data).toEqual({ url: 'https://checkout.stripe.com/test' });
    expect(mockCreate).toHaveBeenCalledWith({
      payment_method_types: ['card'],
      line_items: [{ price: 'price_1RQt4sIiYaNjDTVCFWLDtE6f', quantity: 1 }],
      mode: 'payment',
      success_url: 'https://tinnitus-tees.vercel.app/success',
      cancel_url: 'https://tinnitus-tees.vercel.app/cart',
    });
  });

  test('creates a checkout session and returns URL in development', async () => {
    const originalNodeEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true,
    });

    const cart = [
      {
        stripe_price_id: 'price_1RQt4sIiYaNjDTVCFWLDtE6f',
        quantity: 1,
      },
    ];

    const request = createMockNextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });

    const response = await POST(request);
    const data = await response.json();
    console.log('Test response status:', response.status);
    console.log('Test response data:', data);

    expect(response.status).toBe(200);
    expect(data).toEqual({ url: 'https://checkout.stripe.com/test' });
    expect(mockCreate).toHaveBeenCalledWith({
      payment_method_types: ['card'],
      line_items: [{ price: 'price_1RQt4sIiYaNjDTVCFWLDtE6f', quantity: 1 }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cart',
    });

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalNodeEnv,
      configurable: true,
    });
  });

  test('returns 400 for invalid cart', async () => {
    const request = createMockNextRequest('http://localhost:3000/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ cart: [] }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Invalid or empty cart' });
  });
});