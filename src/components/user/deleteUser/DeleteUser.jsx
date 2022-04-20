import React from "react";
import "./deleteUser.scss";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../../schema/users";

export default function DeleteUser({
  handleClose,
  editData,
  setRefetch,
  setSuccesstMessage,
  setErrorMessage,
  setOpenSuccess,
  setOpenError,
}) {
  // console.log(editData?._id, "test id");
  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser }) => {
      console.log(deleteUser, "delete user admin");
      if (deleteUser?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteUser?.message);
      } else {
        setOpenError(true);
        setErrorMessage(deleteUser?.message);
      }
    },
  });

  const handleDelete = () => {
    deleteUser({
      variables: {
        id: editData?._id,
      },
      update(_, result) {
        setRefetch();
      },
    });

    handleClose();
  };

  return (
    <Box className="modal-delete">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Delete User
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Do you want to delete this user?</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleClose} className="cencel-button">
              Cencel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleDelete} className="ok-button">
              Ok
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
