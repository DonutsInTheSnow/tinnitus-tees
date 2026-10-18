'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchProducts } from '@/lib/supabaseClient';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  sizes: string[];
  stripe_price_id: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({}); // Track selected size per product
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const productsFromDB = await fetchProducts();
      setProducts(productsFromDB);
    };
    getProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) {
        clearTimeout(feedbackTimer.current);
      }
    };
  }, []);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <>
      <main className="p-8 max-w-6xl mx-auto bg-black md:mt-[35px]">
        <h1 className="text-[42px] font-joti mb-6">Tinnitus TEES</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <p className="text-center text-lg col-span-full">No products available.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={500}
                  height={192}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-2xl font-semibold mt-2">{product.name}</h2>
                <p className="text-xl text-green-600">${(product.price / 100).toFixed(2)}</p>
                <p className="text-sm text-gray-600">Sizes: {product.sizes.join(', ')}</p>
                <div className="mt-2">
                  <label htmlFor={`size-${product.id}`} className="mr-2">
                    Select Size:
                  </label>
                  <select
                    id={`size-${product.id}`}
                    value={selectedSizes[product.id] || product.sizes[0]}
                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, selectedSizes[product.id] || product.sizes[0]);
                    setAddedProductId(product.id);

                    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);

                    feedbackTimer.current = setTimeout(() => {
                      setAddedProductId(null);
                    }, 2500);
                  }}
                  className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  Add to Cart
                </button>

                {addedProductId === product.id && (
                  <p role="status" className="mt-2 text-sm text-green-300">
                    ✓ Added to cart!
                  </p>
                )}

              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}