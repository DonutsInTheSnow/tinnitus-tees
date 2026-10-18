
import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from '../page';
import { fetchProducts } from '@/lib/supabaseClient';
import { useCart } from '@/lib/CartContext';

jest.mock('@/lib/supabaseClient', () => ({
  fetchProducts: jest.fn(),
}));

jest.mock('@/lib/CartContext', () => ({
  useCart: jest.fn(),
}));

const mockAddToCart = jest.fn();

const mockProduct = {
  id: '1',
  name: 'Metallica Tee',
  price: 2399,
  image_url: '/images/metallica-tee.webp',
  sizes: ['M', 'L'],
  stripe_price_id: 'price_test',
};

describe('Products Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (fetchProducts as jest.Mock).mockResolvedValue([mockProduct]);
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('adds the selected size and displays confirmation', async () => {
    render(<Home />);

    await screen.findByText('Metallica Tee');

    fireEvent.change(screen.getByLabelText('Select Size:'), {
      target: { value: 'L' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 'L');

    expect(screen.getByRole('status')).toHaveTextContent(
      'Added to cart!'
    );
  });

  test('removes confirmation after 2.5 seconds', async () => {
    render(<Home />);

    await screen.findByText('Metallica Tee');

    jest.useFakeTimers();

    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2500);
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
