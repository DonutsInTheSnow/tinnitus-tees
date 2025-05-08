'use client';

import { useCart } from '@/lib/CartContext';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const lineItems = cart.map((item) => ({
      price: item.stripe_price_id,
      quantity: item.quantity,
    }));

    const { error } = await stripe!.redirectToCheckout({
      lineItems,
      mode: 'payment',
      successUrl: 'https://tinnitus-tees.vercel.app/success',
      cancelUrl: 'https://tinnitus-tees.vercel.app/cancel',
    });

    if (error) console.error(error);
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`} // Unique key for items with different sizes
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
                <p className="text-gray-600">
                  ${(item.price / 100).toFixed(2)} x {item.quantity}
                </p>
                <p className="text-gray-600">Size: {item.selectedSize}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 cursor-pointer"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 cursor-pointer"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
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