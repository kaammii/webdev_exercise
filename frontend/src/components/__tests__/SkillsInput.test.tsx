import { screen, render, fireEvent, within } from '@testing-library/react';
import SkillsInput from '../SkillsInput';

const mockProps = {
  skills: [],
  onChange: jest.fn(),
  selectedSkills: [],
};

describe('SkillsInput', () => {

  it('should render correctly', () => {
    render(
      <SkillsInput
        {...mockProps}
      />
    );
    expect(screen.getByLabelText('Skills')).toBeInTheDocument();
  });

  it('should be able to add new skills', () => {
    render(
      <SkillsInput
        {...mockProps}
      />
    );
    const autocomplete = screen.getByTestId('skills-input');
    const input = within(autocomplete).getByRole('textbox');
    input.focus();
    fireEvent.change(input, { target: { value: 'React' } });
    // arrow down to first option
    fireEvent.keyDown(input, { key: 'ArrowDown' })

    // select element
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(input.value).toEqual('React');
  });

});
