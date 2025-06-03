import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin'; // Update the import

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: `Webhook error: ${(err as Error).message}` }, { status: 400 });
  }

  console.log('Webhook event received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Fetch all line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const items = lineItems.data.map(item => ({
      price_id: item.price?.id,
      quantity: item.quantity,
    }));

    console.log('Session:', session);
    console.log('Line items:', items);
    console.log('Customer email:', session.customer_details?.email);

    // Insert order into Supabase using supabaseAdmin
    const { data, error } = await supabaseAdmin.from('orders').insert({
      items, // Store all items with their price IDs and quantities
      amount_total: session.amount_total,
      status: 'completed',
      user_id: session.client_reference_id || null,
      customer_email: session.customer_details?.email || null,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }

    console.log('Inserted order:', data);
  } else {
    console.log('Unhandled event type:', event.type);
  }

  return NextResponse.json({ received: true });
}