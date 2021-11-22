import React, { useEffect, useState, useCallback } from 'react';
import { Stack } from '@mui/material';
import { fetchSkills, fetchUsers } from '../services/api'
import AddUsers from './AddUsers';
import RemoveUsers from './RemoveUsers';
import AddSkills from './AddSkills';
import { ISkill, IUser } from '../services/types';
import UsersList from './UsersList';
import './Users.css'
import SkillsInput from '../components/SkillsInput';

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [openAddUsers, setOpenAddUsers] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const loadUsers = useCallback(() => {
    fetchUsers(selectedSkills).then(users => {
      setUsers(users);
    });
  }, [selectedSkills]);
  useEffect(loadUsers, [loadUsers]);

  const loadSkills = useCallback(() => {
    fetchSkills().then(skills => {
      setSkills(skills);
    });
  }, []);
  useEffect(loadSkills, [loadSkills]);

  const handleAddSkills = (user: IUser) => {
    setSelectedUser(user);
    setOpenAddUsers(true);
  };

  const handleCloseSkills = () => {
    setOpenAddUsers(false);
    setSelectedUser(null);
  };

  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
    loadUsers();
  };

  const handleAddSkillsSubmit = () => {
    loadSkills();
    loadUsers();
  }

  return (
    <div>
      <Stack direction="row" display="block" spacing={2} mb={4}>
        <AddUsers refetch={loadUsers} />
        <RemoveUsers refetch={loadUsers} />
      </Stack>
      <SkillsInput
        skills={skills}
        selectedSkills={selectedSkills}
        onChange={(e, skills) => handleSkillsChange(skills)}
      />
      {openAddUsers && (
        <AddSkills
          onSubmit={handleAddSkillsSubmit}
          open={openAddUsers}
          selectedUser={selectedUser}
          onClose={handleCloseSkills}
        />
      )}
      <UsersList
        users={users}
        data-testid="users-list"
        onAddSkills={handleAddSkills}
        onSkillClick={(skill) => handleSkillsChange([...selectedSkills, ...skill])}
      />
    </div>
  );
}
