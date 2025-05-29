import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not defined');
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-03-31.basil',
    });

    const { cart } = await req.json();
    console.log('Received cart:', cart);

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      console.log('Cart validation failed');
      return NextResponse.json({ error: 'Invalid or empty cart' }, { status: 400 });
    }

    const lineItems = cart.map((item) => {
      console.log('Mapping item:', item);
      return {
        price: item.stripe_price_id,
        quantity: item.quantity,
      };
    });
    console.log('Line items:', lineItems);

    console.log('Creating Stripe session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: process.env.NODE_ENV === 'production'
        ? 'https://tinnitus-tees.vercel.app/success'
        : 'http://localhost:3000/success',
      cancel_url: process.env.NODE_ENV === 'production'
        ? 'https://tinnitus-tees.vercel.app/cart'
        : 'http://localhost:3000/cart',
    });
    console.log('Stripe session created:', session);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}