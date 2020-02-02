import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";
import SkillForm from "../edit-profile/SkillForm";
import SkillList from "../edit-profile/SkillList";
import "./JobForm.scss";

const JobForm = ({
  onSubmit,
  fetchedTitle,
  fetchedLocation,
  fetchedDescription,
  fetchedSkills
}) => {
  const [title, setTitle] = useState(fetchedTitle || "");
  const [location, setLocation] = useState(fetchedLocation || "");
  const [description, setDescription] = useState(fetchedDescription || "");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState(fetchedSkills || []);
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

  const submit = () => {
    const isFormValid = handleValidation();
    if (!isFormValid) {
      return;
    }

    onSubmit({ title, location, description, skills });
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
          error={descriptionError}
        />
      </form>
      <SkillForm skill={skill} setSkill={setSkill} addSkill={addSkill} />
      <SkillList skills={skills} deleteSkill={deleteSkill} />
      <button className="btn btn--primary" onClick={submit}>
        Submit
      </button>
    </div>
  );
};

JobForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default JobForm;
