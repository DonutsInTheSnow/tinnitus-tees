'use client';

import { useCart } from '@/lib/CartContext';
import Image from 'next/image';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }), // Change from { items: cart } to { cart }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <main className="p-8 max-w-6xl mx-auto mt-2.5" style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '15px' }}>
      <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              className="flex items-center border p-4 rounded-md shadow-sm"
            >
              <Image
                src={item.image_url}
                alt={item.name}
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-200">
                  ${(item.price / 100).toFixed(2)} x {item.quantity}
                </p>
                <p className="text-gray-200">Size: {item.selectedSize}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 cursor-pointer"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 cursor-pointer"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id, item.selectedSize)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">
              Total: $
              {(
                cart.reduce((total, item) => total + (item.price / 100) * item.quantity, 0)
              ).toFixed(2)}
            </p>
            <div className="space-x-2">
              <button
                onClick={clearCart}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 cursor-pointer"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}