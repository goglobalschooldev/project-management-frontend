import React, { useState } from "react";
import "./teamDetails.scss";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { withStyles } from "@material-ui/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import UpdateAutoComplete from "../selectUser/UpdateAutoComplete";
import UpdateSelectMulti from "../selectUser/UpdateSelectMulti";
import { useMutation } from "@apollo/client";
import { DELETE_TEAM } from "../../../schema/team";
import { UPDATE_TEAM } from "../../../schema/team";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 5,
      },
    },
  },
})(TextField);

const CssFormControl = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 5,
      },
    },
  },
})(FormControl);

export default function TeamDetails({
  handleCloseDetails,
  item,
  editDataLeader,
  editDataMember,
  setLoading,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
}) {
  //
  const [leader, setLeader] = React.useState([]);
  const [memberes, setMemberes] = React.useState([]);
  const [anchorEll, setAnchorEll] = React.useState(null);

  // edit data before submit
  const [teamLeader, setTeamLeader] = React.useState([]);
  const [member, setMember] = React.useState([]);

  React.useEffect(async () => {
    if (teamLeader) {
      let rows = [];
      teamLeader.forEach((element) => {
        rows.push(element?._id);
        setLeader(rows);
      });
    }
  }, [teamLeader]);

  React.useEffect(async () => {
    if (member) {
      let rows = [];
      member.forEach((element) => {
        rows.push(element?._id);
        setMemberes(rows);
      });
    }
  }, [member]);

  // Update Team
  const [updateTeam, { data: updateData }] = useMutation(UPDATE_TEAM, {
    onCompleted: ({ updateTeam }) => {
      // setRefetch();
      console.log(updateTeam?.success, "update users");
      if (updateTeam?.success === true) {
        console.log(updateTeam?.message);
        setOpenSuccess(true);
        setSuccesstMessage(updateTeam?.message);
        setLoading(true);
      } else {
        setOpenError(true);
        setErrorMessage(updateTeam?.message);
      }
    },

    onError: (error) => {
      console.log(error.message, "error message");
    },
  });
  // End Update Team

  const UserAdminSchema = Yup.object().shape({
    description: Yup.string(),
    name: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: item?.name,
      description: item?.description,
    },
    validationSchema: UserAdminSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newValues = {
        _id: item?._id,
        ...values,
        leaders: leader,
        members: memberes,
      };
      console.log(newValues);

      updateTeam({
        variables: {
          input: {
            ...newValues,
          },
        },
      });
      handleCloseDetails(true);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  // Delete Teams
  const [deleteTeam, { error }] = useMutation(DELETE_TEAM, {
    onCompleted: ({ deleteTeam }) => {
      console.log(deleteTeam, "delete user admin");
      if (deleteTeam?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteTeam?.message);
        setLoading(true);
      } else {
        setOpenError(true);
        setErrorMessage(deleteTeam?.message);
        setLoading(true);
      }
    },
  });

  const handleDelete = () => {
    deleteTeam({
      variables: {
        id: item?._id,
      },
      update(_, result) {
        setLoading(true);
      },
    });

    handleCloseDetails();
  };
  //End Delete Team

  return (
    <Box item container className="modal-details">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid item container xs={12}>
            <Grid item xs={10}>
              <Typography className="title">Pixel Designss Studio</Typography>
            </Grid>
            <Grid item xs={2} className="close-icon">
              <Box className="box-icon-details">
                <CloseIcon
                  onClick={() => handleCloseDetails()}
                  className="icon-details"
                />
              </Box>
            </Grid>
            <Grid item container xs={12} spacing={3} sx={{ marginTop: 1 }}>
              <Grid item xs={12}>
                <Typography className="field-title">Team name</Typography>
                <CssTextField
                  fullWidth
                  // label="Team Name"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className="field-title">Description</Typography>
                <CssTextField
                  fullWidth
                  rows={4}
                  multiline
                  // label="Description"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className="subtitle">Team Leader</Typography>
                </Grid>
                <Grid item xs={12}>
                  <UpdateSelectMulti
                    setValue={setTeamLeader}
                    // valueSelect={editData}
                    editData={editDataLeader}
                    checkValue={"Leader"}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className="subtitle"> Invite Members</Typography>
                </Grid>
                <Grid item xs={12}>
                  <UpdateSelectMulti
                    setValue={setMember}
                    editData={editDataMember}
                    checkValue={"Member"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={3}
            display="flex"
            sx={{ marginTop: 2 }}
          >
            {/* submit button */}
            <Grid item xs={12}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                className="button-add"
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                className="button-delete"
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
