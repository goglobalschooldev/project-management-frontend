import React from "react";
import "./header.scss";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import MobileNavbar from "../mobileNav/MobileNavbar";

const Header = ({ title }) => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="mobile-sidebar">
          <h3>{title}</h3>
        </div>

        <div className="nortifiation">
          <div className="icon-container">
            <NotificationsNoneIcon className="icon" />
            <p>99+</p>
          </div>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
