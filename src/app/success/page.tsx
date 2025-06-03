'use client';

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useEffect } from 'react';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Thank You for Your Purchase!</h1>
      <p className="text-lg mb-6">
        Your order has been successfully placed. You&apos;ll receive a confirmation email shortly with your order details. We&apos;re excited to get your T-shirt(s) shipped to you soon!
      </p>
      <Link href="/products">
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Continue Shopping
        </button>
      </Link>
    </main>
  );
}