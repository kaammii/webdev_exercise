import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import AddSkills from '../AddSkills';

const mockFunction = jest.fn();

describe('AddSkills', () => {
  it('should only render if open props is true', () => {
    render(
      <AddSkills
        open={false}
        onClose={mockFunction}
        onSubmit={mockFunction}
        selectedUser={null}
      />
    );
    expect(screen.queryByText('Add Skills')).not.toBeInTheDocument();
  });
});
