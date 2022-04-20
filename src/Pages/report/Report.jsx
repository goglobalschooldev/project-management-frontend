import React, { useState, useEffect } from "react";
import "./report.scss";
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
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { withStyles } from "@material-ui/styles";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "@apollo/client";
//components
import ReportRow from "../../components/report/reportRow/ReportRow";
import Header from "../../components/navigation/header/Header";
import { GET_PROJECT_WITH_PAGINATION } from "../../schema/project";

//to print
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "../../components/report/component-to-print/ComponentToPrint";
import ModalPrint from "../../components/report/modalPrint/ModalPrint";

const CssFormControl = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 5,
      },
    },
  },
})(FormControl);

function createData(_id, name, tasks, startDate, dueDate, team, progress) {
  return {
    _id,
    name,
    tasks,
    startDate,
    dueDate,
    team,
    progress,
  };
}

export default function Project() {
  const [loading, setLoading] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [show, setShow] = useState(false);
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
  //to print
  const componentRef = React.useRef(null);
  const GetContent = React.useRef(null);

  React.useEffect(() => {
    if (typeof GetContent.current === "function") {
      GetContent.current();
    }
  }, [GetContent.current]);

  const reactToPrintContent = React.useCallback(() => {
    setShow((prev) => !prev);
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = React.useCallback(() => {
    return <Button className="button">Print report</Button>;
  }, []);
  //end

  // get all projects
  const { error, data, refetch } = useQuery(GET_PROJECT_WITH_PAGINATION, {
    variables: {
      pagination: true,
      keyword: keyword,
    },
  });

  useEffect(() => {
    refetch();
  }, [loading]);

  useEffect(() => {
    if (data) {
      // console.log(data?.readProjectWithPaginate?.projects, "All Project cared");
      let rows = [];
      data?.readProjectWithPaginate?.projects?.forEach((element) => {
        let allRow = createData(
          element?._id,
          element?.name,
          element?.tasks,
          element?.startDate,
          element?.dueDate,
          element?.team,
          element?.progress
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
    if (e) {
      setKeyword(e?.target?.value);
    }
  };

  return (
    <>
      <Box className="user-table">
        <Header title="Reports" />
        <div className="users-search-bar">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={3} className="wrapper">
                  <div className="search">
                    <input
                      sx={{ width: "100%" }}
                      type="text"
                      placeholder="Search..."
                      onChange={(e) => search(e)}
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <CssFormControl size="small" sx={{ width: "100%" }}>
                    <InputLabel>Filter</InputLabel>
                    <Select label="Category">
                      <MenuItem value="Food">Super Admin</MenuItem>
                      <MenuItem value="Drink">Admin</MenuItem>
                    </Select>
                  </CssFormControl>
                </Grid>
                <Grid item xs={6}>
                  <div className="grid-button">
                    <ReactToPrint
                      content={reactToPrintContent}
                      documentTitle="new file"
                      removeAfterPrint="true"
                      trigger={reactToPrintTrigger}
                    />
                  </div>
                </Grid>
              </Grid>
              {show && <ModalPrint ref={componentRef} />}
              <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                      <TableRow className="table-style">
                        <TableCell
                          sx={{ width: "20%" }}
                          className="font-english-header"
                        >
                          Projects Name
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ width: "10%" }}
                          className="font-english-header"
                        >
                          Tasks Done
                        </TableCell>

                        <TableCell
                          align="left"
                          sx={{ width: "15%" }}
                          className="font-english-header"
                        >
                          Start Date
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ width: "15%" }}
                          className="font-english-header"
                        >
                          End Date
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ width: "15%" }}
                          className="font-english-header"
                        >
                          Team
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ width: "15%" }}
                          className="font-english-header"
                        >
                          Progress
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        borderBottom: "0.5px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {rows.map((row) => (
                        <ReportRow row={row} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Pagination
                  count={10}
                  variant="outlined"
                  shape="rounded"
                  className="pagination-users"
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}
