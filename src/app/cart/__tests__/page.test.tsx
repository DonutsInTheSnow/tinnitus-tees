import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../page';
import { useCart } from '@/lib/CartContext';

// Mock the useCart hook
jest.mock('@/lib/CartContext', () => ({
  ...jest.requireActual('@/lib/CartContext'),
  useCart: jest.fn(),
}));

describe('Cart Page', () => {
  const mockCart = [
    {
      id: '1',
      name: 'Metallica Tee',
      price: 239900, // $23.99
      image_url: '/images/metallica-tee.webp',
      sizes: ['S', 'M', 'L'],
      stripe_price_id: 'price_1RQt4sIiYaNjDTVCFWLDtE6f',
      quantity: 1,
      selectedSize: 'M',
    },
  ];

  const mockUseCart = {
    cart: mockCart,
    updateQuantity: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
  };

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue(mockUseCart);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart items correctly', () => {
    render(
        <Cart />
    );

    expect(screen.getByText('Metallica Tee')).toBeInTheDocument();
    expect(screen.getByText('$2399.00 x 1')).toBeInTheDocument();
    expect(screen.getByText('Size: M')).toBeInTheDocument();
    expect(screen.getByText('Total: $2399.00')).toBeInTheDocument();
  });

  test('updates quantity when clicking + button', async () => {
    render(
        <Cart />
    );

    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);

    expect(mockUseCart.updateQuantity).toHaveBeenCalledWith('1', 2); // id: '1', quantity: 2
  });

    test('initiates checkout when clicking checkout button', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ url: 'https://checkout.stripe.com/test' }),
    });

    const mockAssign = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });
    Object.defineProperty(window.location, 'href', {
      set: mockAssign,
    });

    render(<Cart />);

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/checkout', expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      body: expect.any(String),
    }));
    await screen.findByText('Checkout');
    expect(mockAssign).toHaveBeenCalledWith('https://checkout.stripe.com/test');
  });
});
