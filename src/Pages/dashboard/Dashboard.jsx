import React from "react";
import "./dashboard.scss";
import { Box, Grid, Typography } from "@mui/material";
//compoents
import Header from "../../components/navigation/header/Header";
import Widget from "../../components/dashboard/widgets/Widget";
import Widgets from "../../components/dashboard/widgets/Widgets";
import EventsTable from "../../components/dashboard/events/EventsTable";
import TasksTable from "../../components/dashboard/tasksTable/TasksTable";
import ChartbyMonths from "../../components/dashboard/chartByMonth/ChartbyMonths";
import PieCharts from "../../components/dashboard/pieCharts/PieCharts";

export default function Dashboard() {
  return (
    <Box>
      <Header title="Dashboard" />
      <Grid item xs={12} className="top-card" sx={{ marginTop: 3 }}>
        <Widgets />
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8} sx={{ marginTop: 2 }}>
          <ChartbyMonths />
        </Grid>
        <Grid item xs={12} lg={4} sx={{ marginTop: 2 }}>
          <PieCharts />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6} sx={{ marginTop: 2 }}>
          <TasksTable />
        </Grid>
        <Grid item xs={12} lg={6} sx={{ marginTop: 2 }}>
          <EventsTable />
        </Grid>
      </Grid>
    </Box>
  );
}
