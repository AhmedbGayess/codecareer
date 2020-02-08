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
      <li key={uuidv4()} className="job-skills__item job-skills__item--checked">
        &#10003; {skill}
      </li>
    ) : (
      <li key={uuidv4()} className="job-skills__item">
        {skill}
      </li>
    )
  );
  return (
    <div className="job-skills">
      <h3>Required Skills</h3>
      <ul className="job-skills__list">{skillsItems}</ul>
    </div>
  );
};

JobSkills.propTypes = {
  skills: PropTypes.array.isRequired
};

export default JobSkills;
