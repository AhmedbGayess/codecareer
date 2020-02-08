import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProfileCard.scss";
import avatar from "../../images/avatar.png";

const ProfileCard = ({
  name,
  profilePicture,
  about,
  location,
  skills,
  github,
  website,
  myProfile,
  isDeveloper
}) => {
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
      <img
        src={profilePicture ? `/images/${profilePicture}` : avatar}
        className="profile-card__image"
        alt="user"
      />
      <div className="profile-card__description">
        <div className="profile-card__text">
          <h1 className="profile-card__name">{name}</h1>
          <p className="profile-card__about">{about}</p>
          <p className="profile-card__location">{location}</p>
          {isDeveloper && skills.length > 0 && <p>Skills: {skillsList}</p>}
          {isDeveloper && github && (
            <a
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-card__link"
            >
              Github Profile
            </a>
          )}
          {website && (
            <a
              href={`http://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-card__link"
            >
              {website}
            </a>
          )}
        </div>
        {myProfile && (
          <>
            <Link to="/edit-profile" className="btn btn--secondary">
              Edit Profile
            </Link>
            <Link
              to="/edit-user"
              className="btn btn--secondary profile-card__edit"
            >
              Edit Info
            </Link>
          </>
        )}
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
