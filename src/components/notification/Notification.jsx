import * as React from "react";
import {
  Box,
  Avatar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { makeStyles } from "@material-ui/core";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const useStyles = makeStyles((theme) => ({
  name: {
    color: theme.palette.secondary.main,
  },
  logoIcon: {
    background: theme.palette.secondary.main,
  },
  Icon: {
    color: theme.palette.secondary.main,
  },
}));

export default function Notification() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <NotificationsNoneIcon fontSize="large" className={classes.Icon} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            border: "1px solid #5B5BF6",
            width: 450,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 450,
              height: 250,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              border: "1px solid #5B5BF6",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem className={classes.name}>YOUR NOTIFICATION</MenuItem>

        <MenuItem
          sx={{ mt: 1, mb: 1, borderTop: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 20 }}>
                <FaRegMoneyBillAlt className={classes.Icon} />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Stack direction="row" spacing={1}>
                <Typography className="font-english-body">
                  Capital has been increased
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  400$
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Typography className="font-english-body">1 day</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          sx={{ mt: 1, mb: 1, borderTop: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 20 }}>
                <FaRegMoneyBillAlt className={classes.Icon} />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Stack direction="row" spacing={2}>
                <Typography className="font-english-body">
                  Share holder
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  Mr. Lok Lundy
                </Typography>
                {/* <Typography className="font-english-body">
                  has been Remove
                </Typography> */}
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Typography>3 day</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          sx={{ mt: 1, mb: 1, borderTop: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 20 }}>
                <FaRegMoneyBillAlt className={classes.Icon} />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Stack direction="row" spacing={1}>
                <Typography className="font-english">
                  Capital has been increased 400$
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Typography>4 day</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          sx={{ mt: 1, mb: 1, borderTop: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 20 }}>
                <FaRegMoneyBillAlt className={classes.Icon} />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Stack direction="column" spacing={0}>
                <Typography className="font-english-body">
                  Shares Authorize has update:
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  - Common $2000
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  - Preferred $2000
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  - Options $2000
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  - Warrants $2000
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  PAR Value: $1
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Typography>5 day</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          sx={{ mt: 1, mb: 1, borderTop: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 20 }}>
                <FaRegMoneyBillAlt className={classes.Icon} />
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Stack direction="column" spacing={0}>
                <Typography className="font-english-body">
                  Shares Authorize has sold:
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  - Common $2000
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  - Preferred $2000
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  - Options $2000
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  - Warrants $2000
                </Typography>
                <Typography className={`font-english-body ${classes.name}`}>
                  Buyer: Lok Lundy
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Typography>5 day</Typography>
            </Grid>
          </Grid>
        </MenuItem>

        <MenuItem
          sx={{ mt: 1, mb: 1, borderTop: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Stack direction="row">
                <Typography className={classes.name}>View All</Typography>
                <Typography className={classes.name}>
                  <NavigateNextIcon />
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>

      <Avatar sx={{ marginLeft: 2 }} className={classes.logoIcon}>
        <AccountCircleIcon />
      </Avatar>
    </>
  );
}
