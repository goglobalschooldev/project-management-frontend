import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Menu from "../components/navigation/menu/Menu";

export default function DashboardLayout() {
  return (
    <Box sx={{ margin: 0, display: "flex" }}>
      <Grid sx={{ width: { xs: "0%", xl: "15%" } }}>
        <Menu />
      </Grid>
      <Grid sx={{ width: { xs: "100%", xl: "84%" } }}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                flexGrow: 1,
                margin: "40px",
              }}
            >
              <Box>
                <Outlet />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
