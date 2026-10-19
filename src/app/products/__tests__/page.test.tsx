
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


  test('shows confirmation for the most recently added product', async () => {
    const secondProduct = {
        ...mockProduct,
        id: '2',
        name: 'Black Keys Tee',
    };

    (fetchProducts as jest.Mock).mockResolvedValueOnce([
        mockProduct,
        secondProduct,
    ]);

    render(<Home />);

    await screen.findByText('Black Keys Tee');
    jest.useFakeTimers();

    const buttons = screen.getAllByRole('button', {
        name: 'Add to Cart',
    });

    // Add the first product
    fireEvent.click(buttons[0]);

    act(() => {
        jest.advanceTimersByTime(1500);
    });

    // Add a second product 1.5 seconds later
    fireEvent.click(buttons[1]);

    expect(mockAddToCart).toHaveBeenCalledTimes(2);
    expect(mockAddToCart).toHaveBeenLastCalledWith(secondProduct, 'M');
    expect(screen.getAllByRole('status')).toHaveLength(1);

    // The first timer would have expired by now
    act(() => {
        jest.advanceTimersByTime(1000);
    });

    // The second confirmation should still be visible
    expect(screen.getByRole('status')).toBeInTheDocument();

    // The second confirmation expires after 2.5 seconds
    act(() => {
        jest.advanceTimersByTime(1500);
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

});
