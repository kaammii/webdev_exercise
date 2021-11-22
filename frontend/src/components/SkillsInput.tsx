import React from 'react'
import { Autocomplete, TextField, Chip } from '@mui/material';
import { ISkill } from '../services/types';

interface IProps {
  skills: ISkill[];
  selectedSkills?: string[];
  onChange: (e: any, value: string[]) => void;
  error?: string;
  freeSolo?: boolean;
}

export default function SkillsInput(props: IProps): JSX.Element {
  const { skills, selectedSkills = [], onChange, error = '', freeSolo } = props;
  return (
    <Autocomplete
      multiple
      fullWidth
      id="skills-autocomplete"
      options={skills.map(skill => skill.name)}
      defaultValue={[...selectedSkills]}
      value={selectedSkills}
      data-testid="skills-input"
      freeSolo={freeSolo}
      onChange={onChange}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
            fullWidth
            autoFocus
            error={error !== ''}
            helperText={error}
            placeholder={freeSolo ? 'Hit Enter to add a new skill' : 'Search for skills'}
            label="Skills"
            variant="outlined"
          />
        )
      }}
    />
  );
}