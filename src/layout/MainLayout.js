import React from "react";
import { Box } from "@mui/material";
import WebsiteLayout from "./WebsiteLayout";
import ResponsiveLayout from "./ResponsiveLayout";

export default function DashboardLayout() {
  return (
    <>
      <Box sx={{ display: { xs: "none", xl: "block" } }}>
        <WebsiteLayout />
      </Box>
      <Box sx={{ display: { xs: "flex", xl: "none" } }}>
        <ResponsiveLayout />
      </Box>
    </>
  );
}
