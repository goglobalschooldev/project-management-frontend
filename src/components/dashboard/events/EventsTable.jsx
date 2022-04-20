import React from "react";
import "./events.scss";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PlaceIcon from "@mui/icons-material/Place";
import AvatarGroup from "@mui/material/AvatarGroup";

const EventsTable = () => {
  return (
    <div className="events-table">
      <div className="top">
        <div className="title">Event's today</div>
        <Link to="">See All</Link>
      </div>
      <div className="body">
        <div className="event">
          <div className="event-title">
            <p className="title">Academic meeting</p>
            <div className="date">
              <div className="time">
                <AccessAlarmIcon className="icon" />
                <p>2pm</p>
              </div>
              <div className="place">
                <PlaceIcon className="icon" />
                <p>B20</p>
              </div>
            </div>
          </div>

          <div className="member">
            <AvatarGroup total={5}>
              <Avatar
                alt="Remy Sharp"
                src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/portrait-photography/CODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg"
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://members-api.parliament.uk/api/Members/1571/Portrait?cropType=ThreeTwo&webVersion=false"
              />
            </AvatarGroup>
          </div>

          <button className="accept-btn">Accepte</button>
        </div>

        <div className="event">
          <div className="event-title">
            <p className="title">Academic meeting</p>
            <div className="date">
              <div className="time">
                <AccessAlarmIcon className="icon" />
                <p>2pm</p>
              </div>
              <div className="place">
                <PlaceIcon className="icon" />
                <p>B20</p>
              </div>
            </div>
          </div>

          <div className="member">
            <AvatarGroup total={5}>
              <Avatar
                alt="Remy Sharp"
                src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/portrait-photography/CODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg"
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://members-api.parliament.uk/api/Members/1571/Portrait?cropType=ThreeTwo&webVersion=false"
              />
            </AvatarGroup>
          </div>

          <button className="accept-btn">Accepte</button>
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
