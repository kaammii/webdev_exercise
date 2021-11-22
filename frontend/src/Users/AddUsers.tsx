import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { addUsers } from '../services/api';

interface IProps {
  refetch: () => void
}

export default function AddUsers({ refetch }: IProps): JSX.Element {
  const onClick = useCallback(() => {
    addUsers().then(refetch);
  }, [refetch]);

  return <Button variant="contained" onClick={onClick}>Add Users</Button>;
}
