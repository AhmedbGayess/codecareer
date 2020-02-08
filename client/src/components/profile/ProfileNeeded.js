import React from "react";
import { Link } from "react-router-dom";
import "./ProfileNeeded.scss";

const ProfileNeeded = () => (
  <div className="no-profile">
    <div className="container">
      <h3 className="no-profile__text">You first need to create a profile!</h3>
      <Link to="/edit-profile" className="no-profile__link">
        Click to create your profile
      </Link>
    </div>
  </div>
);

export default ProfileNeeded;
