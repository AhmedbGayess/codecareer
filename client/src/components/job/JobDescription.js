import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import { applyToJob } from "../../store/actions/jobs";
import "./JobDescription.scss";

const JobDescription = ({
  title,
  company,
  location,
  updatedAt,
  user,
  userId,
  id,
  isDeveloper,
  applied,
  applyToJob
}) => {
  const apply = () => {
    applyToJob(id);
  };

  return (
    <div className="job-description">
      {userId === user && (
        <Link
          className="btn btn--primary job-description__edit"
          to={`/edit-job/${id}`}
        >
          Edit Job
        </Link>
      )}
      {isDeveloper && (
        <button
          className="btn btn--primary job-description__edit"
          onClick={apply}
        >
          {applied ? "Remove Application" : "Apply To Job"}
        </button>
      )}
      <h2 className="job-description__title">{title}</h2>
      <Link to={`/profile/${user}`} className="job-description__company">
        {company}
      </Link>
      <p className="job-description__location">Location: {location}</p>
      <p className="job-description__date">
        {" "}
        Last update: {moment(updatedAt).format("dddd, MMMM Do YYYY, h:mm")}
      </p>
    </div>
  );
};

JobDescription.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDeveloper: PropTypes.bool.isRequired,
  applyToJob: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isDeveloper: state.auth.user.role === "developer"
});

export default connect(mapStateToProps, { applyToJob })(JobDescription);
