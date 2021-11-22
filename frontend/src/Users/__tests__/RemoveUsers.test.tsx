import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RemoveUsers from '../RemoveUsers';

const mockFunction = jest.fn();

describe('RemoveUsers', () => {
  it('should render Button with text Remove Users', () => {
    render(<RemoveUsers refetch={mockFunction} />);
    expect(screen.getByText('Remove Users')).toBeInTheDocument();
  });

  it('should fire onclick', async () => {
    render(<RemoveUsers refetch={mockFunction} />);
    const button = screen.getByText('Remove Users');
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockFunction).toHaveBeenCalled();
    });

  });

});
