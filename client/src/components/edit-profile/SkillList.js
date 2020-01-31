import React from "react";
import uuidv4 from "uuid";
import PropTypes from "prop-types";
import "./SkillList.scss";

const SkillList = ({ skills, deleteSkill }) => {
  const skillList = skills.map((skill) => (
    <span
      key={uuidv4()}
      className="skills__item"
      onClick={() => deleteSkill(skill)}
    >
      {skill}
    </span>
  ));
  return (
    <div className="skills">
      <h1 className="skills__title">Skills</h1>
      {skillList}
      <p className="skills__caution">Click on a skill to remove it</p>
    </div>
  );
};

SkillList.propTypes = {
  skills: PropTypes.array.isRequired,
  deleteSkill: PropTypes.func.isRequired
};

export default SkillList;
