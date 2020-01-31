import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProfileCard.scss";

const ProfileCard = ({ name, profilePicture, about, location, skills }) => {
  const skillsList = skills.map((skill, i) =>
    i !== skills.length - 1 ? (
      <span key={skill}>{skill}, </span>
    ) : (
      <span key={skill}>{skill}</span>
    )
  );
  return (
    <div className="profile-card">
      <div className="profile-card__header"></div>
      <img src={`/images/${profilePicture}`} className="profile-card__image" />
      <div className="profile-card__description">
        <div className="profile-card__text">
          <h1 className="profile-card__name">{name}</h1>
          <p className="profile-card__about">{about}</p>
          <p className="profile-card__location">{location}</p>
          <p>Skills: {skillsList}</p>
        </div>
        <Link to="/edit-profile" className="btn btn--secondary">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default ProfileCard;
