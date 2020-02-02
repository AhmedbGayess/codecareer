import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";
import SkillForm from "../edit-profile/SkillForm";
import SkillList from "../edit-profile/SkillList";
import "./JobForm.scss";

const JobForm = (props) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const addSkill = (e) => {
    e.preventDefault();
    if (skill !== "") {
      setSkills([...skills, skill]);
      setSkill("");
    }
  };

  const deleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleValidation = () => {
    let isFormValid = true;
    if (title === "") {
      setTitleError("The title is required");
      isFormValid = false;
    } else {
      setTitleError("");
    }

    if (location === "") {
      setLocationError("Please specify the location of the job");
      isFormValid = false;
    } else {
      setLocationError("");
    }

    if (description === "") {
      setDescriptionError("The description of the job is required");
      isFormValid = false;
    } else {
      setDescriptionError("");
    }

    return isFormValid;
  };

  const onSubmit = () => {
    const isFormValid = handleValidation();
    if (!isFormValid) {
      return;
    }

    console.log("shit");
  };

  return (
    <div className="job-form">
      <form>
        <FormInput
          name="title"
          label="Title"
          placeholder="A title for the job"
          value={title}
          onChange={setTitle}
          error={titleError}
        />
        <FormInput
          name="location"
          label="Location"
          placeholder="The location of the job"
          value={location}
          onChange={setLocation}
          error={locationError}
        />
        <FormTextArea
          name="description"
          label="Description"
          placeholder="The description of the job"
          value={description}
          onChange={setDescription}
          rows="6"
          error={locationError}
        />
      </form>
      <SkillForm skill={skill} setSkill={setSkill} addSkill={addSkill} />
      <SkillList skills={skills} deleteSkill={deleteSkill} />
      <button className="btn btn--primary" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

JobForm.propTypes = {};

export default JobForm;
