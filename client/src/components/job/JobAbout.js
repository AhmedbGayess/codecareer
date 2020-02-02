import React from "react";
import PropTypes from "prop-types";
import "./JobAbout.scss";

const JobAbout = ({ description }) => (
  <div className="job-about">
    <h3 className="job-about__title">Job description</h3>
    <p>{description}</p>
  </div>
);

JobAbout.propTypes = {
  description: PropTypes.string.isRequired
};

export default JobAbout;
