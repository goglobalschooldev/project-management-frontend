import React, { useState } from "react";
import "./formEvent.scss";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { withStyles } from "@material-ui/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 10,
      },
    },
  },
})(TextField);

const CssFormControl = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 10,
      },
    },
  },
})(FormControl);

const FormEvent = ({
  buttonTitle,
  setLoading,
  handleClose,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
}) => {
  const UserSchema = Yup.object().shape({
    title: Yup.string().email("Invalid email."),
    startDate: Yup.date(),
    dueDate: Yup.date(),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      startDate: "",
      dueDate: "",
    },
    validationSchema: UserSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);
    },
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Box item container className="modal-event">
      <Grid item container spacing={3}>
        <Grid item xs={11} className="event-title">
          <Typography className="title">ADD EVENT</Typography>
        </Grid>
        <Grid item xs={1} className="close-icon">
          <Button onClick={handleClose} className="button-icon">
            <CloseIcon className="icons" />
          </Button>
        </Grid>
      </Grid>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid item container spacing={3}>
            <Grid item xs={12}>
              <Typography className="field-title">Add title</Typography>
              <CssTextField
                className="text-field"
                fullWidth
                placeholder="Type title"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography className="field-title">Start date</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  // value={values.startDate}
                  // onChange={handleChange}
                  renderInput={(params) => (
                    <CssTextField {...params} type="date" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <Typography className="field-title">End date</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  // value={values.dueDate}
                  // onChange={handleChange}
                  renderInput={(params) => (
                    <CssTextField {...params} type="date" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                className="button-create"
              >
                Add Event
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default FormEvent;
