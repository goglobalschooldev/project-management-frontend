import React, { useEffect, useState } from "react";
import "./projectDetails.scss";
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
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { withStyles } from "@material-ui/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useQuery, useMutation } from "@apollo/client";
import FlipMove from "react-flip-move";
import InputAdornment from "@material-ui/core/InputAdornment";
//components
import SelectMultiUser from "../../team/selectUser/SelectMultiUser";
import { GET_TEAMS, GET_TEAM_BY_ID } from "../../../schema/team";
import { UPDATE_PROJECT, DELETE_PROJECT } from "../../../schema/project";
import UpdateSelectMulti from "../SelectUser/UpdateSelectMulti";

const StyleTextField = withStyles({
  root: {
    "& .MuiSvgIcon-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-input": {
      padding: 5,
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
  },
})(TextField);

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

export default function FormDetails({
  setRefetch,
  editData,
  handleClose,
  teamNames,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
}) {
  // console.log(editData, "editData all");
  //
  const [teamNameData, setTeamNameData] = useState([]);
  const [teamId, setTeamId] = useState(editData?.teamId);

  //function items
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tasks];
    let newList = [];
    if (index > -1) {
      let editList = { ...list[index], taskName: value };
      newList = [...list.slice(0, index), editList, ...list.slice(index + 1)];
    }
    setTasks([...newList]);
  };

  const [errMessenge, setErrMessenge] = React.useState("");

  const handleInputPercentChange = (e, index) => {
    const { name, value } = e.target;
    var val = parseInt(value);
    if (val <= 100 && val > -1) {
      const list = [...tasks];
      let newList = [];
      if (index > -1) {
        let editList = { ...list[index], percent: val };
        newList = [...list.slice(0, index), editList, ...list.slice(index + 1)];
      }
      setTasks([...newList]);
    } else if (val > 100) {
      setErrMessenge("not bigger than 100");
      setTimeout(() => {
        setErrMessenge("");
      }, 2000);
    } else if (val < -1) {
      setErrMessenge("not small than zero");
    }
  };

  const handleRemoveClick = (index) => {
    const list = [...tasks];
    list.splice(index, 1);
    setTasks(list);
  };

  const handleAddClick = () => {
    setTasks([...tasks, { taskName: "", percent: 0, responsiblePerson: null }]);
  };

  //End function items

  // Get Team
  const [keyword, setKeyword] = React.useState("");
  const { data: teamData } = useQuery(GET_TEAMS, {
    variables: {
      keyword: keyword,
    },
  });

  // const { data: teamDataId } = useQuery(GET_TEAM_BY_ID, {
  //   variables: {
  //     id: teamId,
  //   },
  // });

  //update function
  const [updateProject, { data, loading, error }] = useMutation(
    UPDATE_PROJECT,
    {
      onCompleted: ({ updateProject }) => {
        if (updateProject?.success === true) {
          setOpenSuccess(true);
          setSuccesstMessage(updateProject?.message);
          handleClose();
          setRefetch();
        } else {
          setOpenError(true);
          setErrorMessage(updateProject?.message);
        }
      },

      onError: (error) => {
        console.log(error.message, "error message");
      },
    }
  );

  //Delete function
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: ({ deleteProject }) => {
      // console.log(deleteProject, "delete project");
      if (deleteProject?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteProject?.message);
        handleClose();
        setRefetch();
      } else {
        setOpenError(true);
        setErrorMessage(deleteProject?.message);
      }
    },
  });

  const handleDelete = () => {
    // console.log(editData?._id, "Delete ID");
    deleteProject({
      variables: {
        id: editData?._id,
      },
    });
  };
  // ENd Delete Tasks

  //set tasks
  useEffect(async () => {
    // console.log(editData?.tasks, "editData");
    if (editData) {
      setTasks(editData?.tasks);
    }
  }, [editData]);

  useEffect(() => {
    if (teamData) {
      // console.log(teamData?.readTeams?.teams, "user");
      let rows = [];
      teamData?.readTeams?.teams.forEach((element) => {
        let allrow = createData(element?._id, element?.name, element?.name);
        rows.push(allrow);
        setTeamNameData(rows);
      });
    }
  }, [teamData]);

  // console.log(editData?.tasks, "editData");
  const ProjectSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string(),
    priority: Yup.string(),
    startDate: Yup.date(),
    dueDate: Yup.date(),
    percent: Yup.number()
      .min(0, "not smaller than 0")
      .max(100, "not bigger than 100"),
  });

  const formik = useFormik({
    initialValues: {
      name: editData?.name,
      description: editData?.description,
      priority: editData?.priority,
      startDate: editData?.startDate,
      dueDate: editData?.dueDate,
    },

    validationSchema: ProjectSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // console.log(values, "Value After Submit");
      let selectTask = [...tasks];

      selectTask?.map((e, index) => {
        let task = e?.responsiblePerson?.map((r) => r?._id);
        if (index > -1) {
          let editList = {
            ...selectTask[index],
            responsiblePerson: task,
          };

          delete editList?.__typename;

          selectTask = [
            ...selectTask.slice(0, index),
            editList,
            ...selectTask.slice(index + 1),
          ];
        }
      });

      let newProjectData = {
        ...values,
        teamId: teamId,
        _id: editData?._id,
        tasks: selectTask,
      };

      // console.log(newProjectData, "newProjectData");
      //
      updateProject({
        variables: {
          input: {
            ...newProjectData,
          },
        },
      });
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

  // console.log(editData?.team?.members, "editData");
  // console.log(editData?.team?.leaders, "editData");

  return (
    <Box className="modal-detailes">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid item container xs={12}>
            <Grid item xs={11}>
              <Typography className="title">{editData?.name}</Typography>
            </Grid>
            <Grid item xs={1} className="close-icon">
              <Box className="box-icon-project">
                <CloseIcon
                  onClick={() => {
                    handleSubmit();
                    handleClose();
                  }}
                  className="icon-project"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <StyleTextField
                className="desciption"
                fullWidth
                multiline
                label="Description"
                {...getFieldProps("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12} spacing={3} sx={{ marginTop: 1 }}>
            <Grid item xs={6}>
              <Typography className="field-title">Asign Team</Typography>
              <CssFormControl sx={{ width: "100%" }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={teamNameData}
                  defaultValue={teamNames !== undefined ? `${teamNames}` : ""}
                  onChange={(event, value) => {
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
              <Typography className="field-title">Start Date</Typography>
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
              <Typography className="field-title">End Date</Typography>
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

            <Grid item xs={12}>
              <Typography className="field-title">Tasks</Typography>
              <FlipMove duration={300} easing="ease-in-out">
                {tasks.map((x, i) => {
                  return (
                    <Grid container spacing={1}>
                      <Grid item xs={9}>
                        <CssTextField
                          fullWidth
                          size="small"
                          name="taskName"
                          value={x.taskName}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <CssTextField
                          size="small"
                          fullWidth
                          className="ml10"
                          name="percent"
                          type="number"
                          value={x.percent}
                          onChange={(e) => handleInputPercentChange(e, i)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography>%</Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                        {errMessenge !== "" ? (
                          <Typography variant="p" sx={{ color: "red" }}>
                            {errMessenge}
                          </Typography>
                        ) : null}
                      </Grid>
                      <Grid item xs={1}>
                        <Button>
                          <DeleteForeverOutlinedIcon
                            className="icon-delete"
                            onClick={() => handleRemoveClick(i)}
                          />
                        </Button>
                      </Grid>
                      <Grid item xs={10}>
                        <UpdateSelectMulti
                          i={i}
                          responsiblePerson={x.responsiblePerson}
                          setTasks={setTasks}
                          tasks={tasks}
                          memberInTeam={editData?.team?.members}
                          leaderInTeam={editData?.team?.leaders}
                        />
                      </Grid>
                      <Grid item xs={10}></Grid>
                    </Grid>
                  );
                })}
              </FlipMove>
            </Grid>

            {/* <Grid item xs={12}>
              <Button
                size="large"
                variant="contained"
                type="submit"
                className="button-add"
              >
                Submit
              </Button>
            </Grid> */}
            <Grid item xs={12}>
              <Button
                onClick={handleAddClick}
                size="large"
                variant="contained"
                className="button-add"
              >
                Add task
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={handleDelete}
                size="large"
                variant="contained"
                className="button-delete"
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
