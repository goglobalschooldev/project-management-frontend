import React, { useState, useEffect } from "react";
import "./usertable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

//components
import UserRow from "../userRow/UserRow";

function UsersTable({
  refetch,
  loading,
  setLoading,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
  rows,
}) {
  if (!loading) {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="users-table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell component="th" scope="row">
                Email
              </TableCell>
              <TableCell component="th" scope="row">
                Password
              </TableCell>
              <TableCell component="th" scope="row">
                Date
              </TableCell>
              <TableCell component="th" scope="row"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <UserRow
                  row={row}
                  setRefetch={refetch}
                  setLoading={setLoading}
                  setErrorMessage={setErrorMessage}
                  setSuccesstMessage={setSuccesstMessage}
                  setOpenSuccess={setOpenSuccess}
                  setOpenError={setOpenError}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersTable;
