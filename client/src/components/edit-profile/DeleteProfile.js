import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteProfile } from "../../store/actions/profiles";
import "./DeleteProfile.scss";

const DeleteProfile = ({ deleteProfile }) => {
  return (
    <div className="delete-profile">
      <p className="delete-profile__warning">Delete your profile</p>
      <button className="btn btn--delete" onClick={deleteProfile}>
        Delete
      </button>
    </div>
  );
};

DeleteProfile.propTypes = {
  deleteProfile: PropTypes.func.isRequired
};

export default connect(null, { deleteProfile })(DeleteProfile);
