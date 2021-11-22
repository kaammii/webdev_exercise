import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import { IUser } from '../services/types';

interface IProps {
  users: IUser[];
  onAddSkills: (user: IUser) => void;
  onSkillClick: (skill: string[]) => void;
}

export default function UsersList(props: IProps): JSX.Element {
  const { users, onAddSkills, onSkillClick } = props;
  return (
    <TableContainer component={Paper}>
        <Table aria-label="Users Table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Skills</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: IUser) => (
              <TableRow
                key={user.name}
              >
                <TableCell>
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {user.skills.map((skill) => (
                      <Chip label={skill} key={skill} onClick={() => onSkillClick([skill])} />
                    ))}
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => onAddSkills(user)}
                    >
                      Add
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}