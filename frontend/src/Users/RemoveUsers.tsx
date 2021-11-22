import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { deleteUsersBulk } from '../services/api';

interface IProps {
  refetch: () => void
}

export default function RemoveUsers({ refetch }: IProps): JSX.Element {
  const onClick = useCallback(() => {
    deleteUsersBulk().then(refetch);
  }, [refetch]);
  return <Button variant="contained" color="error" onClick={onClick}>Remove Users</Button>;
}
