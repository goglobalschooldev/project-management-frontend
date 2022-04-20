import React, { useEffect, useState } from "react";
import "./formProject.scss";
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
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { withStyles } from "@material-ui/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "../../../schema/project";
import { GET_TEAMS, GET_TEAM_BY_ID } from "../../../schema/team";
import { useQuery } from "@apollo/client";

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

function createData(_id, name, label) {
  return { _id, name, label };
}

export default function FormProject({
  checkFunction,
  editData,
  buttonTitle,
  setRefetch,
  setLoading,
  handleClose,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
}) {
  const [teamNameData, setTeamNameData] = useState([]);
  const [leaderData, setLeaderData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [teamId, setTeamId] = useState("");
  // Get Team
  const [keyword, setKeyword] = React.useState("");

  const { data: teamData } = useQuery(GET_TEAMS, {
    variables: {
      keyword: keyword,
    },
  });

  const { data: teamDataId } = useQuery(GET_TEAM_BY_ID, {
    variables: {
      id: teamId,
    },
  });

  useEffect(() => {
    if (teamDataId) {
      // console.log(teamDataId, "teamId all");\
      let rowsTeam = [];
      teamDataId?.readTeamById?.leaders.forEach((element) => {
        rowsTeam.push(element?._id);
        setLeaderData([...rowsTeam]);
      });

      let rowsMember = [];
      teamDataId?.readTeamById?.members.forEach((element) => {
        rowsMember.push(element?._id);
        setMemberData(rowsMember);
      });
    }
  }, [teamDataId]);

  useEffect(() => {
    if (teamData) {
      // console.log(teamData, "user");
      let rows = [];
      teamData?.readTeams?.teams.forEach((element) => {
        let allrow = createData(element?._id, element?.name, element?.name);
        rows.push(allrow);
        setTeamNameData(rows);
      });
    }
  }, [teamData]);

  const [createProject, { data, loading, error }] = useMutation(
    CREATE_PROJECT,
    {
      onCompleted: ({ createProject }) => {
        if (createProject?.success === true) {
          setOpenSuccess(true);
          setSuccesstMessage(createProject?.message);
          setRefetch();
        } else {
          setOpenError(true);
          setErrorMessage(createProject?.message);
        }
      },

      onError: (error) => {
        // console.log(error.message, "error message");
        setOpenError(true);
        setErrorMessage(error.message);
      },
    }
  );

  const ProjectSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string(),
    priority: Yup.string().required("Required"),
    startDate: Yup.date(),
    dueDate: Yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      name: editData?.name,
      description: editData?.description,
      priority: editData?.priority,
      startDate: new Date(),
      dueDate: new Date(),
    },
    validationSchema: ProjectSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newValue = {
        ...values,
        name: values?.name,
        description: values?.description,
        priority: values?.priority,
        leaders: leaderData,
        members: memberData,
        startDate: values?.startDate,
        dueDate: values?.dueDate,
        teamId: teamId,
      };

      // console.log(newValue);

      createProject({
        variables: {
          input: {
            ...newValue,
          },
        },
      });
      handleClose();
    },
  });

  const handleChangeStart = (newValue) => {
    setFieldValue("startDate", newValue);
  };

  const handleChangeEnd = (newValue) => {
    setFieldValue("dueDate", newValue);
  };

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  return (
    <Box item container className="modal-detailes">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid item container xs={12}>
            <Grid item xs={11}>
              <Typography className="title">Pixel Design Studio</Typography>
            </Grid>
            <Grid item xs={1} className="close-icon">
              <Box className="box-icon-project">
                <CloseIcon onClick={handleClose} className="icon-project" />
              </Box>
            </Grid>
            <Grid item container xs={12} spacing={3} sx={{ marginTop: 1 }}>
              <Grid item xs={12}>
                <Typography className="field-title">Project title</Typography>
                <CssTextField
                  fullWidth
                  placeholder="Project Title"
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
                  placeholder="Description"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
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
            <Grid item xs={6}>
              <Typography className="field-title">Asign Team</Typography>
              <CssFormControl sx={{ width: "100%" }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={teamNameData}
                  onChange={(event, value) => {
                    // console.log(value._id);
                    setTeamId(value._id);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Asign team" />
                  )}
                />
              </CssFormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography className="field-title">Priority</Typography>
              <CssFormControl sx={{ width: "100%" }}>
                <Select
                  {...getFieldProps("priority")}
                  error={Boolean(touched.priority && errors.priority)}
                >
                  <MenuItem value="Urgent">Urgent</MenuItem>
                  <MenuItem value="Important">Important</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </CssFormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography className="field-title">Start date</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={values.startDate}
                  onChange={handleChangeStart}
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
                  value={values.dueDate}
                  onChange={handleChangeEnd}
                  renderInput={(params) => (
                    <CssTextField {...params} type="date" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* submit button */}
            <Grid item xs={12}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                className="button-add"
              >
                {buttonTitle}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
