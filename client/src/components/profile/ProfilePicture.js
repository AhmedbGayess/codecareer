import React from "react";
import PropTypes from "prop-types";

const ProfilePicture = ({ profilePicture, deleteImage }) => (
  <div className="edit-profile__image-container">
    <img
      src={`/images/${profilePicture}`}
      alt="profile"
      className="edit-profile__image"
    />
    <button className="btn btn--delete" onClick={deleteImage}>
      Delete profile picture
    </button>
  </div>
);

ProfilePicture.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  deleteImage: PropTypes.func.isRequired
};

export default ProfilePicture;
