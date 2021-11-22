import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, Button, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { fetchSkills, addSkills } from '../services/api';
import { IUser, ISkill } from '../services/types';
import SkillsInput from '../components/SkillsInput';

interface IProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  selectedUser: IUser | null;
}

export default function AddSkills({ open, onClose, onSubmit, selectedUser }: IProps): JSX.Element {
  const [skills, setSkills] = useState<ISkill[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (selectedUser) {
      setSelectedSkills([...selectedUser.skills])
    }
  }, [selectedUser]);

  const handleChange = (e: any, value: string[]) => {
    setSelectedSkills([...value]);
  };

  const handleSubmit = async () => {
    if (selectedSkills.length === 0) {
      setError('Atleast 1 skill is required')
      return
    }
    try {
      const skills = await addSkills(selectedUser!.id, selectedSkills);
      onSubmit();
      onClose();
    } catch (err) {
      setError('Could not add skills');
    }
  };

  const loadSkills = useCallback(() => {
    fetchSkills().then(setSkills);
  }, []);

  useEffect(loadSkills, [loadSkills]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Skills</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="addskills_form">
          <SkillsInput
            error={error}
            selectedSkills={selectedSkills}
            onChange={handleChange}
            skills={skills}
            freeSolo
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}