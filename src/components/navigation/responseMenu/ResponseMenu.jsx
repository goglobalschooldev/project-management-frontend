import React, { useState, useEffect } from "react";
import "./response.scss";
import {
  List,
  ListItemText,
  ListItem,
  Divider,
  Box,
  Tooltip,
  Modal,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DateRangeIcon from "@mui/icons-material/DateRange";
import GroupIcon from "@mui/icons-material/Group";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { Link, useLocation } from "react-router-dom";
//components
import Logo from "../../../image/logo.svg";
import LogoutForm from "../../logout/LogoutForm";

export default function ResponMenu() {
  const location = useLocation();

  //   Modal logout
  const [openLogout, setOpenLogout] = useState(false);
  const handleOpenLogout = (e) => {
    setOpenLogout(true);
  };
  const handleCloseLogout = (e) => {
    setOpenLogout(false);
  };

  return (
    <List
      sx={{
        width: "100%",
        height: "120vh",
        backgroundImage: `linear-gradient(to top, #4838eb, #5334e4, #5c31de, #642dd7, #6a29d1)`,
        justifyContent: "center",
      }}
    >
      <Box className="logos">
        <Box className="logo">
          <img src={`${Logo}`} alt="logo" style={{ width: "80%" }} />
        </Box>
      </Box>
      <Box className="box-divider">
        <Divider sx={{ border: "1px solid #fff", width: "78%" }} />
      </Box>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/"
      >
        <Tooltip title="dashboard" placement="right">
          <Box className="box-item">
            <Box
              className="front-line"
              sx={{
                display: location.pathname === "/" ? "block" : "none",
              }}
            />
            <ListItem
              className="list-item"
              sx={{
                bgcolor: location.pathname === "/" ? "#7B3DF0" : "",
              }}
            >
              <DashboardIcon
                sx={{
                  marginLeft: 1,
                }}
              />
              <ListItemText className="list-item-text">Dashboard</ListItemText>
            </ListItem>
          </Box>
        </Tooltip>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/project"
      >
        <Tooltip title="projects" placement="right">
          <Box className="box-item">
            <Box
              className="front-line"
              sx={{
                display: location.pathname === "/project" ? "block" : "none",
              }}
            />
            <ListItem
              className="list-item"
              sx={{
                bgcolor: location.pathname === "/project" ? "#7B3DF0" : "",
              }}
            >
              <BusinessCenterIcon
                sx={{
                  marginLeft: 1,
                }}
              />
              <ListItemText className="list-item-text">Projects</ListItemText>
            </ListItem>
          </Box>
        </Tooltip>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/calendar"
      >
        <Tooltip title="calendar" placement="right">
          <Box className="box-item">
            <Box
              className="front-line"
              sx={{
                display: location.pathname === "/calendar" ? "block" : "none",
              }}
            />
            <ListItem
              className="list-item"
              sx={{
                bgcolor: location.pathname === "/calendar" ? "#7B3DF0" : "",
              }}
            >
              <DateRangeIcon
                sx={{
                  marginLeft: 1,
                }}
              />
              <ListItemText className="list-item-text">Calendar</ListItemText>
            </ListItem>
          </Box>
        </Tooltip>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/team"
      >
        <Tooltip title="teams" placement="right">
          <Box className="box-item">
            <Box
              className="front-line"
              sx={{
                display: location.pathname === "/team" ? "block" : "none",
              }}
            />
            <ListItem
              className="list-item"
              sx={{
                bgcolor: location.pathname === "/team" ? "#7B3DF0" : "",
              }}
            >
              <GroupAddIcon
                sx={{
                  marginLeft: 1,
                }}
              />
              <ListItemText className="list-item-text">Teams</ListItemText>
            </ListItem>
          </Box>
        </Tooltip>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/user"
      >
        <Tooltip title="users" placement="right">
          <Box className="box-item">
            <Box
              className="front-line"
              sx={{
                display: location.pathname === "/user" ? "block" : "none",
              }}
            />
            <ListItem
              className="list-item"
              sx={{
                bgcolor: location.pathname === "/user" ? "#7B3DF0" : "",
              }}
            >
              <GroupIcon
                sx={{
                  marginLeft: 1,
                }}
              />
              <ListItemText className="list-item-text">Users</ListItemText>
            </ListItem>
          </Box>
        </Tooltip>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/report"
      >
        <Tooltip title="reports" placement="right">
          <Box className="box-item">
            <Box
              className="front-line"
              sx={{
                display: location.pathname === "/report" ? "block" : "none",
              }}
            />
            <ListItem
              className="list-item"
              sx={{
                bgcolor: location.pathname === "/report" ? "#7B3DF0" : "",
              }}
            >
              <EqualizerIcon
                sx={{
                  marginLeft: 1,
                }}
              />
              <ListItemText className="list-item-text">Reports</ListItemText>
            </ListItem>
          </Box>
        </Tooltip>
      </Link>

      <Tooltip title="logout" placement="right">
        <ListItem
          className="list-item"
          onClick={handleOpenLogout}
          sx={{
            cursor: "pointer",
          }}
        >
          <PowerSettingsNewOutlinedIcon sx={{ marginLeft: 1 }} />
          <ListItemText className="list-item-text">Logout</ListItemText>
        </ListItem>
      </Tooltip>
      <Modal open={openLogout} onClose={handleCloseLogout}>
        <LogoutForm handleCloseLogout={handleCloseLogout} />
      </Modal>
    </List>
  );
}
