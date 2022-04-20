import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import "./widget.scss";

const Widget = ({ title, value, seeAll, icon, color, get_links }) => {
  return (
    <div className={color}>
      <div className="title">{title}</div>
      <div className="number">{value}</div>
      <div className="bottom">
        <div className="link">
          <Link to={`${get_links}`} className="left">
            {seeAll}
          </Link>
        </div>
        <div className="div-icon">
          <a className="icon">{icon}</a>
        </div>
      </div>
    </div>
  );
};

export default Widget;
