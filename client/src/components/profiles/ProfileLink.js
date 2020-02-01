import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import avatar from "../../images/avatar.png";
import "./ProfileLink.scss";

const ProfileLink = ({ id, name, image, location, about }) => {
  return (
    <Link to={`/profile/${id}`} className="profile-link">
      <img
        src={image ? `/images/${image}` : avatar}
        className=""
        alt="user"
        className="profile-link__image"
      />
      <div>
        <p>{name}</p>
        <p>{about}</p>
        <p>{location}</p>
      </div>
    </Link>
  );
};

ProfileLink.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired
};

export default ProfileLink;
