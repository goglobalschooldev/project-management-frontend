import React from "react";
import { Grid, Box, Button, Typography, TextField } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

//Style Modal
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  color: "#000",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "fit-content",
  textAlign: "center",
  borderRadius: "10px",
  bgcolor: "background.paper",
  p: 3,
};

export default function DeleteIncome({ handleCloseLogout }) {
  const handleOnClose = () => {
    handleCloseLogout();
  };
  return (
    <Box sx={styleModal}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex">
            <Typography
              color="orange"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                width: "95%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Are you absolutely sure?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                width: "5%",
              }}
            >
              <CloseIcon
                onClick={handleCloseLogout}
                sx={{ color: "black", cursor: "pointer" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }}>
              Do you want to logout?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link to="/login">
              <Button
                onClick={handleOnClose}
                sx={{
                  width: "50%",
                  height: "42px",
                  variant: "contained",
                  bgcolor: "orange",
                  color: "WHITE",
                  borderRadius: 2,
                  paddingTop: 1,
                }}
              >
                <LogoutIcon />
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
