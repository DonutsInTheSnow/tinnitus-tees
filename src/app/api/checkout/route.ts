import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    // Parse the request body to get cart items
    const { cart } = await req.json();

    // Validate cart
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty cart' }, { status: 400 });
    }

    // Create line items for Stripe Checkout
    const lineItems = cart.map((item: { stripe_price_id: string; quantity: number }) => ({
      price: item.stripe_price_id,
      quantity: item.quantity,
    }));

    // Create a Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: 'https://tinnitus-tees.vercel.app/success',
      cancel_url: 'https://tinnitus-tees.vercel.app/cancel',
    });

    // Return the session URL to redirect the user
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}