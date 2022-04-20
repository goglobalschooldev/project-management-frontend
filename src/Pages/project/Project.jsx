import React, { useState, useEffect } from "react";
import "./project.scss";
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Modal,
} from "@mui/material";
import { withStyles } from "@material-ui/styles";
import { useQuery } from "@apollo/client";
//components
import Header from "../../components/navigation/header/Header";
import ProjectCard from "../../components/project/projectCard/ProjectCard";
import FormProject from "../../components/project/formProject/FormProject";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AlertMessage from "../../components/alertMessage/AlertMessage";
import { GET_ALL_PROJECTS } from "../../schema/project";
import { GET_PROJECT_WITH_PAGINATION } from "../../schema/project";
import CircularProgress from "@mui/material/CircularProgress";

const CssFormControl = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 5,
      },
    },
  },
})(FormControl);

function createData(
  _id,
  name,
  description,
  priority,
  startDate,
  dueDate,
  tasks,
  progress,
  team,
  leaders,
  members
) {
  return {
    _id,
    name,
    description,
    priority,
    startDate,
    dueDate,
    tasks,
    progress,
    team,
    leaders,
    members,
  };
}

export default function Project() {
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
  //function get data
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = React.useState([]);

  // get all projects
  const { error, data, refetch } = useQuery(GET_PROJECT_WITH_PAGINATION, {
    variables: {
      pagination: false,
      keyword: keyword,
    },
  });

  useEffect(() => {
    refetch();
  }, [loading]);

  useEffect(() => {
    if (data) {
      // console.log(data, "All Project cared");
      let rows = [];
      data?.readProjectWithPaginate?.projects?.forEach((element) => {
        let allRow = createData(
          element?._id,
          element?.name,
          element?.description,
          element?.priority,
          element?.startDate,
          element?.dueDate,
          element?.tasks,
          element?.progress,
          element?.team,
          element?.leaders,
          element?.members,
          element?.tasks
        );
        rows.push(allRow);
        setRows([...rows]);
        setLoading(true);
      });
    } else {
      setRows([]);
    }
  }, [data]);

  // Search
  const search = (e) => {
    if (e?.target?.value !== "") {
      // console.log(e?.target?.value);
      setKeyword(e?.target?.value);
    } else {
      setKeyword("");
    }
  };

  return (
    <Box>
      <Header title="Projects" />
      <div className="below-header">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3} className="wrapper">
                <div className="search">
                  <input
                    sx={{ width: "100%" }}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => search(e)}
                  />
                  {/* <SearchOutlinedIcon className="icon-style" /> */}
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CssFormControl size="small" sx={{ width: "100%" }}>
                  <InputLabel>Filter</InputLabel>
                  <Select label="Category" onChange={(e) => search(e)}>
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="Urgent">Urgent</MenuItem>
                    <MenuItem value="Important">Important</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Progress">In Progress</MenuItem>
                  </Select>
                </CssFormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={3}></Grid>
              <Grid item xs={12} md={6} lg={3} className="grid-button">
                <Button className="button" onClick={handleOpenAdd}>
                  Add Project
                </Button>
                <Modal
                  open={openAdd}
                  // onClose={handleCloseAdd}
                >
                  <FormProject
                    checkFunction={"create"}
                    editData={{
                      name: "",
                      description: "",
                      priority: "Important",
                      startDate: "",
                      dueDate: "",
                    }}
                    buttonTitle={"Add project"}
                    setLoading={setLoading}
                    setRefetch={refetch}
                    handleClose={handleCloseAdd}
                    setErrorMessage={setErrorMessage}
                    setSuccesstMessage={setSuccesstMessage}
                    setOpenSuccess={setOpenSuccess}
                    setOpenError={setOpenError}
                  />
                </Modal>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {!loading ? (
              <>
                <Grid
                  container
                  spacing={4}
                  sx={{
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={4}>
              {rows.map((row) => (
                <Grid item xs={12} md={6} lg={4} xl={3}>
                  <div key={row._id}>
                    <ProjectCard
                      row={row}
                      loading={loading}
                      setLoading={setLoading}
                      setRefetch={refetch}
                      setErrorMessage={setErrorMessage}
                      setSuccesstMessage={setSuccesstMessage}
                      setOpenSuccess={setOpenSuccess}
                      setOpenError={setOpenError}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
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
