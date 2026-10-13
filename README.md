# Tinnitus Tees - Next.js Portfolio Project

Tinnitus Tees ain't nothin' but a fancy e-commerce contraption, built with Next.js, TypeScript, Stripe, and Supabase. It's a full-stack storefront where shoppers can browse a catalog, fill their carts, and head to checkout quicker'n a Mississippi gambler can shuffle a deck.

Behind the curtain, there's a little more engineering than meets the eye.

## Purpose

This project demonstrates practical full-stack software development, including frontend interfaces, server-side API routes, third-party integrations, database operations, and payment-processing reliability.

It's a portfolio demonstration, not a commercial storefront. Stripe transactions use test mode, so no real money changes hands.

## Technology Stack

- Next.js App Router — Application architecture and server-side routes

- React and TypeScript — Interactive, type-safe frontend

- Tailwind CSS — Responsive styling

- Supabase / PostgreSQL — Product catalog and order persistence

- Stripe Checkout — Test-mode payment processing

- Jest — Testing infrastructure

- Vercel — Planned production hosting

## Features 
- Product catalog with size selection

- Shopping cart with quantity management

- Stripe-hosted checkout

- Webhook signature verification

- Server-side order persistence in PostgreSQL

- Idempotent webhook processing to prevent duplicate orders

## Payment Reliability
Stripe webhooks may be delivered more than once. Tinnitus Tees stores each Checkout Session ID and enforces uniqueness at the database level.

Repeated webhook deliveries are acknowledged without creating duplicate orders.

This behavior has been verified using a replayed Stripe event and a PostgreSQL query.

## Getting Started Locally

Clone the repository and install dependencies:

```
npm ci
npm run dev
```

Configure the required environment variables in .env.local, including Supabase credentials and Stripe test credentials.

Start the Stripe CLI listener to forward checkout events to the local webhook endpoint.

Open http://localhost:3000.

Security: Never commit .env.local or expose server-side API secrets.

## Testing
Jest configuration is included. Automated test coverage is being reviewed and expanded.

Payment checkout, webhook processing, and duplicate-order prevention have been verified through manual integration testing.

## Deployment

Vercel deployment is planned. The public demo URL will be added after deployment and verification.

*Built by Rich Hudson. Proof that even a humble T-shirt shop can teach a fellow a thing or two about software engineering.*