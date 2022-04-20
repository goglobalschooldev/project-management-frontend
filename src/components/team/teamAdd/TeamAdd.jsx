import React, { useState } from "react";
import "./teamAdd.scss";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Box,
  Grid,
  Avatar,
  AvatarGroup,
  Typography,
  Modal,
  Button,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import { withStyles } from "@material-ui/styles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ClearIcon from "@mui/icons-material/Clear";
import SelectMultiUser from "../selectUser/SelectMultiUser";
import { useMutation } from "@apollo/client";
import { CREATE_TEAM } from "../../../schema/team";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 5,
      },
    },
  },
})(TextField);

function editData(_id, firstName, lastName, profileSrc) {
  return { _id, firstName, lastName, profileSrc };
}

export default function TeamAdd({
  handleCloseAdd,
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

  const [createTeam, { data, loading, error }] = useMutation(CREATE_TEAM, {
    onCompleted: ({ createTeam }) => {
      if (createTeam?.success === true) {
        console.log(createTeam?.message);
        handleCloseAdd();
        setLoading(true);
        setOpenSuccess(true);
        setSuccesstMessage(createTeam?.message);
      } else {
        console.log(createTeam?.message);
        setOpenSuccess(true);
        setSuccesstMessage(createTeam?.message);
      }
    },

    onError: (error) => {
      console.log(error.message, "error message");
    },
  });

  const UserSchema = Yup.object().shape({
    name: Yup.string().required("Team Name is require!"),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: UserSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newValue = {
        ...values,
        logo: "",
        logoSrc: "",
        leaders: leader,
        members: memberes,
      };
      // console.log(newValue, "submit");
      createTeam({
        variables: {
          input: {
            ...newValue,
          },
        },
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Box className="modal-details">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={10}></Grid>
            <Grid item xs={2} className="close-icon">
              <Box className="box-icon-team">
                <ClearIcon
                  onClick={() => handleCloseAdd()}
                  className="icon-team"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography className="title">Team name</Typography>
              <CssTextField
                fullWidth
                placeholder="Team Name"
                // label="Team Name"
                {...getFieldProps("name")}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography className="title">Description</Typography>
              <CssTextField
                fullWidth
                multiline
                rows={4}
                placeholder="Description"
                // label="Team Name"
                {...getFieldProps("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className="subtitle">Team Leader</Typography>
                </Grid>
                <Grid item xs={12}>
                  <SelectMultiUser
                    setValue={setTeamLeader}
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
                  <SelectMultiUser setValue={setMember} checkValue={"Member"} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                className="button-add"
              >
                Create Team
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
