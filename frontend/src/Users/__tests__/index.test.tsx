import { render, screen } from '@testing-library/react';
import SkillsInput from '../../components/SkillsInput';
import AddSkills from '../AddSkills';
import UsersList from '../UsersList';
import Users from '../index';



// write tests for Users component
describe('Users', () => {
  it('should render Button with text Add Users', () => {
    render(<Users />);
    expect(screen.getByText('Add Users')).toBeInTheDocument();
  });

  it('should render Button with text Remove Users', () => {
    render(<Users />);
    expect(screen.getByText('Remove Users')).toBeInTheDocument();
  });

  // test for SkillsInput component
  it('should render SkillsInput component', () => {
    render(<Users />);
    expect(screen.getByTestId('skills-input')).toBeInTheDocument();
  });

  // tests for AddSkills component
  it('should render AddSkills component', () => {
    render(
      <AddSkills
        onClose={() => { }}
        open={true}
        onSubmit={() => { }}
        selectedUser={null}
      />
    );
    expect(screen.getByText('Add Skills')).toBeInTheDocument();
  });

  it('should not render AddSkills component', () => {
    render(
      <AddSkills
        onClose={() => { }}
        open={false}
        onSubmit={() => { }}
        selectedUser={null}
      />
    );
    expect(screen.queryByText('Add Skills')).not.toBeInTheDocument();
  });

  it('should render UserList component', () => {
    render(
      <UsersList
        users={[
          {
            id: 1,
            name: 'Kamran',
            skills: ['React', 'Redux', 'JavaScript']
          },
          {
            id: 2,
            name: 'John',
            skills: ['React', 'Redux', 'JavaScript']
          }
        ]}
        onAddSkills={() => { }}
        onSkillClick={() => { }}
      />
    );
    expect(screen.getByText('Kamran')).toBeInTheDocument();
  });
  
});
