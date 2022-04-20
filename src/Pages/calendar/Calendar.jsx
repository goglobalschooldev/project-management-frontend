import React, { useState } from "react";
import "./calendar.scss";
import {
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  Modal,
} from "@mui/material";
import detectEthereumProvider from "@metamask/detect-provider";
//components
import Header from "../../components/navigation/header/Header";
import AlertMessage from "../../components/alertMessage/AlertMessage";
import FormEvent from "../../components/calendar/formEvent/FormEvent";
import CalendarTable from "../../components/calendar/calendarTable/CalendarTable";

export default function Calendar() {
  const [loading, setLoading] = useState(false);
  //function add
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  //function alert message
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccesstMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  return (
    <Box>
      <Header title="Calendar" />
      <Grid container spacing={2} mt={1}>
        <Grid item xs={2}>
          <FormControl className="form-control" fullWidth size="small">
            <Select defaultValue={1} className="selector">
              <MenuItem value={1}>Approval</MenuItem>
              <MenuItem value={2}>Dismiss</MenuItem>
              <MenuItem value={3}>Consider</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10} className="add-event">
          <Button className="button-event" onClick={handleOpenAdd}>
            Add Events
          </Button>
          <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <FormEvent
              checkFunction={"create"}
              buttonTitle={"Create User"}
              setLoading={setLoading}
              handleClose={handleCloseAdd}
              setErrorMessage={setErrorMessage}
              setSuccesstMessage={setSuccesstMessage}
              setOpenSuccess={setOpenSuccess}
              setOpenError={setOpenError}
            />
          </Modal>
        </Grid>
        <Grid item xs={12}>
          <CalendarTable />
        </Grid>
      </Grid>
      <AlertMessage
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        openSuccess={openSuccess}
        openError={openError}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </Box>
  );
}
