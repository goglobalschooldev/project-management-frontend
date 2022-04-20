import React, { useState, useEffect } from "react";
import Header from "../../components/navigation/header/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Menu,
  MenuItem,
  Stack,
  Avatar,
  Card,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { withStyles } from "@material-ui/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./users.scss";
//components
import UsersTable from "../../components/user/userTable/UsersTable";
import FormUser from "../../components/user/formUser/FormUser";
import AlertMessage from "../../components/alertMessage/AlertMessage";
import { useQuery } from "@apollo/client";
import { GET_USER_WITH_PAGINATION } from "../../schema/users";

const input = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 5,
      },
    },
  },
})(TextField);

function createData(
  _id,
  firstName,
  lastName,
  mail,
  hashPassword,
  createAt,
  updatedAt,
  gender,
  profileSrc
) {
  return {
    _id,
    firstName,
    lastName,
    mail,
    hashPassword,
    createAt,
    updatedAt,
    gender,
    profileSrc,
  };
}

export default function Users() {
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

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = React.useState([]);

  // GET USERS
  const { error, data, refetch } = useQuery(GET_USER_WITH_PAGINATION, {
    variables: {
      page: page,
      limit: rowsPerPage,
      keyword: keyword,
    },
  });

  useEffect(() => {
    refetch();
  }, [loading]);

  useEffect(() => {
    // console.log(error);

    if (data) {
      console.log(data?.readUsers?.users, "allUSers");
      let rows = [];
      data?.readUsers?.users.forEach((element) => {
        let allRow = createData(
          element?._id,
          element?.firstName,
          element?.lastName,
          element?.mail,
          element?.hashPassword,
          element?.createAt,
          element?.updatedAt,
          element?.gender,
          element?.profileSrc
        );
        rows.push(allRow);
        setRows([...rows]);
        setLoading(true);
      });
    }
  }, [data]);

  // Search
  const search = (e) => {
    if (e) {
      setKeyword(e?.target?.value);
    }
  };

  return (
    <Box>
      <Header title="Users" />
      {/* <div className="users-search-bar">
        <TextField
          id="Search"
          label="Search"
          variant="outlined"
          className="seacrh-box"
          size="small"
        />
        <CreateUser />
      </div> */}
      <div className="users-search-bar">
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={3} className="wrapper">
              <div className="search">
                <input
                  sx={{ width: "100%" }}
                  type="text"
                  placeholder="Search users..."
                  onChange={(e) => search(e)}
                />
                {/* <SearchOutlinedIcon className="icon-style" /> */}
              </div>
            </Grid>
            <Grid item xs={9} className="grid-button">
              <Button className="button" onClick={handleOpenAdd}>
                Create User
              </Button>
              <Modal
                open={openAdd}
                onClose={handleCloseAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <FormUser
                  checkFunction={"create"}
                  editData={{
                    mail: "",
                    firstName: "",
                    lastName: "",
                    gender: "Female",
                    hashPassword: "",
                  }}
                  buttonTitle={"Create User"}
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
      </div>
      <div className="users-table">
        <UsersTable
          refetch={refetch}
          rows={rows}
          loading={loading}
          setLoading={setLoading}
          setErrorMessage={setErrorMessage}
          setSuccesstMessage={setSuccesstMessage}
          setOpenSuccess={setOpenSuccess}
          setOpenError={setOpenError}
        />
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
