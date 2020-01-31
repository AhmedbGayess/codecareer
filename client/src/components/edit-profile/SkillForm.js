import React from "react";
import PropTypes from "prop-types";
import FormInput from "../common/FormInput";

const SkillForm = ({ skill, setSkill, addSkill }) => (
  <form onSubmit={addSkill}>
    <FormInput
      name="skill"
      label="Add a skill"
      placeholder="Add your skills one by one"
      value={skill}
      onChange={setSkill}
    />
    <button className="btn btn--secondary">Add skill</button>
  </form>
);

SkillForm.propTypes = {
  skill: PropTypes.string.isRequired,
  setSkill: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired
};

export default SkillForm;
