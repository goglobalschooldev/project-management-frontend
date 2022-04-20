import React, { useState, useEffect } from "react";
import "./menu.scss";
import {
  List,
  ListItemText,
  ListItem,
  Divider,
  Button,
  Box,
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

export default function Navigation() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [id, setId] = useState(null);
  useEffect(() => {
    setId(params.get("id"));
  }, [location.search]);

  //   Modal logout
  const [openLogout, setOpenLogout] = useState(false);
  const handleOpenLogout = (e) => {
    setOpenLogout(true);
  };
  const handleCloseLogout = (e) => {
    setOpenLogout(false);
  };

  return (
    <List className="list" sx={{ position: "fixed" }}>
      <Box className="logos">
        <Box className="logo">
          <img src={`${Logo}`} alt="logo" style={{ width: "80%" }} />
        </Box>
      </Box>
      <Box className="dividers">
        <Divider className="divider" />
      </Box>
      <Box className="box-item">
        <ListItem className="list-item">
          <ListItemText sx={{ marginTop: 5, marginLeft: 2 }}>MENU</ListItemText>
        </ListItem>
      </Box>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/"
      >
        <Box className="box-item" sx={{ marginTop: 3 }}>
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
                marginLeft: 2,
                color: "#fff",
              }}
            />
            <ListItemText className="list-item-text">Dashboard</ListItemText>
          </ListItem>
        </Box>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/project"
      >
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
                marginLeft: 2,
                color: "#fff",
              }}
            />
            <ListItemText className="list-item-text">Projects</ListItemText>
          </ListItem>
        </Box>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/calendar"
      >
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
                marginLeft: 2,
                color: "#fff",
              }}
            />
            <ListItemText className="list-item-text">Calendar</ListItemText>
          </ListItem>
        </Box>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/team"
      >
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
                marginLeft: 2,
              }}
            />
            <ListItemText className="list-item-text">Teams</ListItemText>
          </ListItem>
        </Box>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/user"
      >
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
                marginLeft: 2,
              }}
            />
            <ListItemText className="list-item-text">Users</ListItemText>
          </ListItem>
        </Box>
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to="/report"
      >
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
                marginLeft: 2,
              }}
            />
            <ListItemText className="list-item-text">Reports</ListItemText>
          </ListItem>
        </Box>
      </Link>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box className="box-logout">
        <Button onClick={handleOpenLogout} className="button-logout">
          <ListItem className="list-button-logout">
            <PowerSettingsNewOutlinedIcon className="icon" />
            <ListItemText className="list-item-logout">Logout</ListItemText>
          </ListItem>
        </Button>
        <Modal open={openLogout} onClose={handleCloseLogout}>
          <LogoutForm handleCloseLogout={handleCloseLogout} />
        </Modal>
      </Box>
    </List>
  );
}
