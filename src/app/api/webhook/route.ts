import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook error: ${(err as Error).message}` }, { status: 400 });
  }

  console.log('Webhook event received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id;
  
    console.log('Session:', session);
    console.log('Price ID:', priceId);
  
    const { data, error } = await supabase.from('orders').insert({
      product_id: priceId,
      amount_total: session.amount_total,
      status: 'completed',
      user_id: session.client_reference_id || null,
    });
  
    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }
  
    console.log('Inserted order:', data);
  }

  return NextResponse.json({ received: true });
}