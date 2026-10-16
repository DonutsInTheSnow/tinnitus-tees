
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';

const product = {
  id: '1',
  name: 'Metallica Tee',
  price: 2399,
  image_url: '/images/metallica-tee.webp',
  sizes: ['M', 'L'],
  stripe_price_id: 'price_test',
};

function TestCart() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(product, 'M')}>
        Add Medium
      </button>
      <button onClick={() => addToCart(product, 'L')}>
        Add Large
      </button>
      <button onClick={() => removeFromCart('1', 'M') }>
        Remove Medium
      </button>
      <button onClick={() => updateQuantity('1', 'M', 2)}>
        Set Medium Quantity to 2
      </button>
      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={() => updateQuantity('1', 'M', 0)}>
        Set Medium Quantity to 0
      </button>

      {cart.map((item) => (
        <p key={`${item.id}-${item.selectedSize}`}>
          {item.selectedSize}: {item.quantity}
        </p>
      ))}
    </div>
  );
}

test('tracks quantities separately for different sizes', () => {
  render(
    <CartProvider>
      <TestCart />
    </CartProvider>
  );

  fireEvent.click(screen.getByText('Add Medium'));
  fireEvent.click(screen.getByText('Add Medium'));
  fireEvent.click(screen.getByText('Add Large'));

  expect(screen.getByText('M: 2')).toBeInTheDocument();
  expect(screen.getByText('L: 1')).toBeInTheDocument();
});


test('removing one size preserves other sizes', () => {
  render(
    <CartProvider>
      <TestCart />
    </CartProvider>
  );

  fireEvent.click(screen.getByText('Add Medium'));
  fireEvent.click(screen.getByText('Add Large'));
  fireEvent.click(screen.getByText('Remove Medium'));

  expect(screen.queryByText('M: 1')).not.toBeInTheDocument();
  expect(screen.getByText('L: 1')).toBeInTheDocument();
});


test('updating one size does not change another size', () => {
  render(
    <CartProvider>
      <TestCart />
    </CartProvider>
  );

  fireEvent.click(screen.getByText('Add Medium'));
  fireEvent.click(screen.getByText('Add Large'));

  fireEvent.click(screen.getByText('Set Medium Quantity to 2'));

  expect(screen.getByText('M: 2')).toBeInTheDocument();
  expect(screen.getByText('L: 1')).toBeInTheDocument();
});


test('clears all items from the cart', () => {
  render(
    <CartProvider>
      <TestCart />
    </CartProvider>
  );

  fireEvent.click(screen.getByText('Add Medium'));
  fireEvent.click(screen.getByText('Add Large'));

  // Verify both items were added
  expect(screen.getByText('M: 1')).toBeInTheDocument();
  expect(screen.getByText('L: 1')).toBeInTheDocument();

  // Clear the cart
  fireEvent.click(screen.getByText('Clear Cart'));

  // Verify both items were removed
  expect(screen.queryByText('M: 1')).not.toBeInTheDocument();
  expect(screen.queryByText('L: 1')).not.toBeInTheDocument();
});


test('prevents cart quantity from falling below 1', () => {
  render(
    <CartProvider>
      <TestCart />
    </CartProvider>
  );

  fireEvent.click(screen.getByText('Add Medium'));

  // Attempt to set an invalid quantity
  fireEvent.click(screen.getByText('Set Medium Quantity to 0'));

  // Quantity should remain at 1
  expect(screen.getByText('M: 1')).toBeInTheDocument();
});
