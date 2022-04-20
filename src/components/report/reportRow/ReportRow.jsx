import React, { useState } from "react";
import "./reportRow.scss";
import { Typography, TableRow, TableCell, Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  menuitem: {
    color: theme.palette.secondary.main,
  },
  status: {
    boxShadow: "none",
    background: theme.palette.thirth.main,
    "&:hover": {
      background: theme.palette.thirth.main,
      boxShadow: "none",
    },
  },
}));

export default function ReportRow({ row }) {
  // console.log("all row", row);
  const classes = useStyles();
  return (
    <TableRow
      key={row.projectname}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className="table-row"
    >
      <TableCell component="th" scope="row">
        <Typography className="font-english"> {row?.name}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className="row-data">
          {row?.tasks?.filter((task) => task?.percent === 100).length}/
          {row?.tasks?.length}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography className="row-data">
          {moment(row?.startDate).format("DD-MMM-YYYY")}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography className="row-data">
          {moment(row?.dueDate).format("DD-MMM-YYYY")}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography className="row-data">{row?.team?.name}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography className="row-data">{row?.progress} %</Typography>
      </TableCell>
    </TableRow>
  );
}
