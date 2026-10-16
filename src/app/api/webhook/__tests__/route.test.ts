
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { POST } from '../route';

// Mock Stripe
jest.mock('stripe', () =>
  jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: jest.fn(),
    },
    checkout: {
      sessions: {
        listLineItems: jest.fn(),
      },
    },
  }))
);

// Mock Supabase
jest.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

// Mock Next.js JSON responses
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status ?? 200,
      json: async () => data,
    })),
  },
}));

const mockUpsert = jest.fn();

const stripeInstance = (Stripe as unknown as jest.Mock)
  .mock.results[0].value;

function createWebhookRequest(): Request {
  return {
    text: jest.fn().mockResolvedValue('test payload'),
    headers: {
      get: jest.fn().mockReturnValue('test signature'),
    },
  } as unknown as Request;
}

describe('Stripe Webhook', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    stripeInstance.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_123',
          amount_total: 4798,
          client_reference_id: null,
          customer_details: {
            email: 'test@example.com',
          },
        },
      },
    });

    stripeInstance.checkout.sessions.listLineItems.mockResolvedValue({
      data: [
        {
          price: { id: 'price_test_123' },
          quantity: 2,
        },
      ],
    });

    mockUpsert.mockResolvedValue({ error: null });

    (supabaseAdmin.from as jest.Mock).mockReturnValue({
      upsert: mockUpsert,
    });
  });

  test('uses idempotent upsert for repeated webhook deliveries', async () => {
    const firstResponse = await POST(createWebhookRequest());
    const secondResponse = await POST(createWebhookRequest());

    expect(firstResponse.status).toBe(200);
    expect(secondResponse.status).toBe(200);

    expect(mockUpsert).toHaveBeenCalledTimes(2);

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        stripe_session_id: 'cs_test_123',
        amount_total: 4798,
        status: 'completed',
        items: [
          {
            price_id: 'price_test_123',
            quantity: 2,
          },
        ],
      }),
      {
        onConflict: 'stripe_session_id',
        ignoreDuplicates: true,
      }
    );
  });


  test('rejects an invalid webhook signature', async () => {
    stripeInstance.webhooks.constructEvent.mockImplementationOnce(() => {
        throw new Error('Invalid signature');
    });

    const response = await POST(createWebhookRequest());
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
        error: 'Webhook error: Invalid signature',
    });

    // Invalid requests must never access the orders database
    expect(supabaseAdmin.from).not.toHaveBeenCalled();
  });

});
