import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import avatar from "../../images/avatar.png";
import "./ProfileLink.scss";

const ProfileLink = ({ id, name, image, location, about, userId }) => {
  const link = id === userId ? "/me" : `/profile/${id}`;
  return (
    <Link to={link} className="profile-link">
      <img
        src={image ? `/images/${image}` : avatar}
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

const mapStateToProps = (state) => ({
  userId: state.auth.user.id
});

export default connect(mapStateToProps)(ProfileLink);
