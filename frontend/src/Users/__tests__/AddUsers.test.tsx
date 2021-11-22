import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddUsers from '../AddUsers';

const mockFunction = jest.fn();

describe('AddUsers', () => {
  it('should render Button with text Add Users', () => {
    render(<AddUsers refetch={mockFunction} />);
    expect(screen.getByText('Add Users')).toBeInTheDocument();
  });

  it('should fire onclick', async () => {
    render(<AddUsers refetch={mockFunction} />);
    const button = screen.getByText('Add Users');
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});
