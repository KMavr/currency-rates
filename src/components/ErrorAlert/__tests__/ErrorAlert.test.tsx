import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorAlert from '../ErrorAlert';
import useCurrencyRatesStore from '../../../store/useCurrencyRatesStore';

describe('ErrorAlert', () => {
  beforeEach(() => {
    useCurrencyRatesStore.setState({ error: null });
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should not render when there is no error', () => {
    const { container } = render(<ErrorAlert />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render when there is an error', () => {
    useCurrencyRatesStore.setState({ error: 'Test error message' });

    const { container } = render(<ErrorAlert />);

    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should clear error when close button is clicked', () => {
    useCurrencyRatesStore.setState({ error: 'Error to dismiss' });

    render(<ErrorAlert />);

    expect(screen.getByText('Error to dismiss')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(useCurrencyRatesStore.getState().error).toBeNull();
  });

  it('should clear error when 5 seconds pass', () => {
    useCurrencyRatesStore.setState({ error: 'Error to dismiss' });

    render(<ErrorAlert />);

    expect(screen.getByText('Error to dismiss')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4999);
    });

    expect(screen.getByText('Error to dismiss')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2);
    });

    expect(useCurrencyRatesStore.getState().error).toBeNull();
  });
});
