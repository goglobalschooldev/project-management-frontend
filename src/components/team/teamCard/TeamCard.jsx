import React, { useState, useEffect } from "react";
import "./teamCard.scss";
import {
  Box,
  Grid,
  Avatar,
  AvatarGroup,
  Typography,
  Modal,
  Button,
} from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
//components
import TeamDetails from "../../../components/team/teamDetails/TeamDetails";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#5b5bf6" : "#5b5bf6",
  },
}));

function createEditData(_id, firstName, lastName, profileSrc, title) {
  return { _id, firstName, lastName, profileSrc, title };
}

export default function TeamCard({
  item,
  setLoading,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
}) {
  //details function
  const [editDataLeader, setEditDataLeader] = useState([]);
  const [editDataMember, setEditDataMember] = useState([]);

  useEffect(() => {
    if (item) {
      console.log(item?.leaders, "editData");
      let rows = [];
      item?.leaders.forEach((element) => {
        let allrow = createEditData(
          element?._id,
          element?.firstName,
          element?.lastName,
          element?.profileSrc,
          element?.firstName + " " + element?.lastName
        );
        rows.push(allrow);
        setEditDataLeader(rows);
      });
    }

    if (item) {
      console.log(item?.members, "editData");
      let rows = [];
      item?.members.forEach((element) => {
        let allrow = createEditData(
          element?._id,
          element?.firstName,
          element?.lastName,
          element?.profileSrc,
          element?.firstName + " " + element?.lastName
        );
        rows.push(allrow);
        setEditDataMember(rows);
      });
    }
  }, [item]);

  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };
  return (
    <>
      <Box className="card" onClick={handleOpenDetails}>
        <Grid container spacing={2} margin-top={5}>
          <Grid item xs={10}>
            <Box className="card-title">{item?.name}</Box>
          </Grid>
          <Grid item xs={2} className="icons">
            <MoreHorizIcon className="tuch-action" />
          </Grid>
          <Grid item xs={12}>
            <Box>{item?.description}</Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} className="card-subtitle">
                <Typography className="subtitle">Team Leader</Typography>
              </Grid>

              <Grid item container xs={12}>
                <Grid item xs={1}>
                  <PersonAddAlt1Icon className="card-icon" />
                </Grid>
                <Grid item xs={11} className="card-avatar">
                  <AvatarGroup max={4}>
                    {item?.leaders.map((element, index) =>
                      element?.profileSrc !== "" ? (
                        <>
                          <Avatar
                            className="avatar"
                            alt={"Row Man"}
                            src={`${element?.profileSrc}`}
                          />
                        </>
                      ) : (
                        <>
                          <Avatar className="avatar">
                            {element?.firstName.charAt(0)}
                          </Avatar>
                        </>
                      )
                    )}
                  </AvatarGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} className="card-subtitle">
                <Typography className="subtitle">Members</Typography>
              </Grid>

              <Grid item container>
                <Grid item xs={1}>
                  <PersonAddAlt1Icon className="card-icon" />
                </Grid>
                <Grid item xs={11} className="card-avatar">
                  <AvatarGroup max={4}>
                    {item?.members.map((element, index) =>
                      element?.profileSrc !== "" ? (
                        <>
                          <Avatar
                            className="avatar"
                            alt={"Row Man"}
                            src={`${element?.profileSrc}`}
                          />
                        </>
                      ) : (
                        <>
                          <Avatar className="avatar">
                            {element?.firstName.charAt(0)}
                          </Avatar>
                        </>
                      )
                    )}
                  </AvatarGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={openDetails}
        onClose={handleCloseDetails}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TeamDetails
          handleOpenDetails={handleOpenDetails}
          handleCloseDetails={handleCloseDetails}
          editDataLeader={editDataLeader}
          editDataMember={editDataMember}
          item={item}
          setLoading={setLoading}
          setErrorMessage={setErrorMessage}
          setSuccesstMessage={setSuccesstMessage}
          setOpenSuccess={setOpenSuccess}
          setOpenError={setOpenError}
        />
      </Modal>
    </>
  );
}
