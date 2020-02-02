import React from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid";
import "./JobSkills.scss";

const JobSkills = ({ skills, userSkills }) => {
  const skillsItems = skills.map((skill) =>
    userSkills
      .join("")
      .toLowerCase()
      .includes(skill.toLowerCase()) ? (
      <li key={uuidv4()}>{skill}&#10003;</li>
    ) : (
      <li key={uuidv4()}>{skill}</li>
    )
  );
  return <ul className="job-skills">{skillsItems}</ul>;
};

JobSkills.propTypes = {
  skills: PropTypes.array.isRequired
};

export default JobSkills;
