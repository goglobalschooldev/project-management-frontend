import React, { useState, useEffect } from "react";
import Header from "../../components/navigation/header/Header";
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
import "./team.scss";
import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import AlertMessage from "../../components/alertMessage/AlertMessage";
//component
import TeamCard from "../../components/team/teamCard/TeamCard";
import TeamAdd from "../../components/team/teamAdd/TeamAdd";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useQuery } from "@apollo/client";
import { GET_TEAMS } from "../../schema/team";

const input = withStyles({
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

export default function Team() {
  //
  //function alert message
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccesstMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  //
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [keyword, setKeyword] = useState("");
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET Teams
  const { error, data, refetch } = useQuery(GET_TEAMS, {
    variables: {
      keyword: keyword,
    },
  });

  useEffect(() => {
    refetch();
    if (!loading) setLoading(false);
  }, [loading]);

  useEffect(() => {
    if (data) {
      console.log(data?.readTeams?.teams);
      setTeamData(data?.readTeams?.teams);
      setLoading(false);
    } else {
      setTeamData([]);
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
      <Header title="Teams" />
      <div className="users-search-bar">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={5}>
              <Grid item xs={4} className="wrapper">
                <div className="search">
                  <input
                    sx={{ width: "100%" }}
                    type="text"
                    placeholder="Search teams..."
                    onChange={(e) => search(e)}
                  />
                  {/* <SearchOutlinedIcon className="icon-style" /> */}
                </div>
              </Grid>

              <Grid item xs={8} className="grid-button">
                <Button className="button" onClick={handleOpenAdd}>
                  Add Team
                </Button>
                <Modal open={openAdd} onClose={handleCloseAdd}>
                  <TeamAdd
                    handleCloseAdd={handleCloseAdd}
                    setLoading={setLoading}
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
            {loading ? (
              <>
                <Grid
                  container
                  spacing={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Grid>
              </>
            ) : (
              <>
                <Grid container spacing={4}>
                  {teamData.map((item, index) => (
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <TeamCard
                        handleCloseAdd={handleCloseAdd}
                        item={item}
                        setLoading={setLoading}
                        setErrorMessage={setErrorMessage}
                        setSuccesstMessage={setSuccesstMessage}
                        setOpenSuccess={setOpenSuccess}
                        setOpenError={setOpenError}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
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
