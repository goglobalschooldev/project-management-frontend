import React, { useState, useEffect } from "react";
import "./userRow.scss";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Modal } from "@mui/material";
import moment from "moment";
import FormUser from "../formUser/FormUser";
import DeleteUser from "../deleteUser/DeleteUser";
import imageDefault from "../../../image/empty-image.png";

function UsersTable({
  row,
  setRefetch,
  setLoading,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
}) {
  //function update
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);
  //function delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <>
      <TableCell component="th" scope="row">
        <div className="user-row">
          {row?.profileSrc !== "" ? (
            <>
              <Avatar alt="Remy Sharp" src={`${row?.profileSrc}`} />
            </>
          ) : (
            <>
              <Avatar alt="Remy Sharp" src={`${imageDefault}`} />
            </>
          )}
          <div className="user-info">
            <p className="user-name">{row?.firstName + " " + row?.lastName}</p>
            <p className="user-gender">{row?.gender}</p>
          </div>
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        {row.mail}
      </TableCell>
      <TableCell component="th" scope="row">
        {row.hashPassword}
      </TableCell>
      <TableCell component="th" scope="row">
        {moment(row?.createAt || row?.updatedAt).format("DD-MMM-YYYY")}
      </TableCell>
      <TableCell component="th" scope="row" align="right">
        <Button onClick={handleOpenUpdate} className="action-button-action">
          <ModeEditOutlineIcon className="edit-icon" />
        </Button>
        <Modal open={openUpdate} onClose={handleCloseUpdate}>
          <FormUser
            checkFunction={"update"}
            editData={row}
            buttonTitle={"Update"}
            handleClose={handleCloseUpdate}
            setErrorMessage={setErrorMessage}
            setSuccesstMessage={setSuccesstMessage}
            setOpenSuccess={setOpenSuccess}
            setOpenError={setOpenError}
            setLoading={setLoading}
          />
        </Modal>
        <Button onClick={handleOpenDelete} className="action-button-action">
          <DeleteIcon className="delete-icon" />
        </Button>
        <Modal open={openDelete} onClose={handleCloseDelete}>
          <DeleteUser
            editData={row}
            handleClose={handleCloseDelete}
            setErrorMessage={setErrorMessage}
            setSuccesstMessage={setSuccesstMessage}
            setOpenSuccess={setOpenSuccess}
            setOpenError={setOpenError}
            setLoading={setLoading}
            setRefetch={setRefetch}
          />
        </Modal>
      </TableCell>
    </>
  );
}

export default UsersTable;
