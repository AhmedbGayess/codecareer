import React from "react";
import PropTypes from "prop-types";
import "../common/FormInput.scss";

const ProfileImageInput = ({ onChange, error }) => {
  return (
    <div className="input-container">
      <label htmlFor="image-input" className="input-label">
        Profile Picture
      </label>
      <input
        id="image-input"
        type="file"
        name="image"
        className="input-field"
        onChange={onChange}
      />
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

ProfileImageInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ProfileImageInput;
