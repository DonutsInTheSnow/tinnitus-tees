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
    <main className="p-8">
      <h1 className="text-4xl font-bold">Payment Successful</h1>
      <p>Thank you for your purchase!</p>
      <Link href="/">
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 cursor-pointer">
          Back to Home
        </button>
      </Link>
    </main>
  );
}