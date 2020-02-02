import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import "./JobLink.scss";

const JobLink = ({ id, title, company, location, updatedAt }) => {
  return (
    <Link to={`/job/${id}`} className="job-link">
      <p className="job-link__title">{title}</p>
      <p className="job-link__company">Company: {company}</p>
      <p className="job-link__location">Location: {location}</p>
      <p className="job-link__date">
        Last update: {moment(updatedAt).format("dddd, MMMM Do YYYY, h:mm")}
      </p>
    </Link>
  );
};

JobLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
};

export default JobLink;
