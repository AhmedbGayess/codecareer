import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "../common/FormInput";

const ExperienceForm = ({ addExperience }) => {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form>
      <FormInput
        name="company"
        label="Company"
        placeholder="The company's name"
        value={company}
        onChange={setCompany}
      />
      <FormInput
        name="title"
        label="Title"
        placeholder="Your job's title"
        value={title}
        onChange={setTitle}
      />
      <FormInput
        name="from"
        type="month"
        label="From"
        value={from}
        onChange={setFrom}
      />
      <FormInput
        name="to"
        type="month"
        label="To"
        value={to}
        onChange={setTo}
      />
      <button className="btn btn--primary">Add Experience</button>
    </form>
  );
};

ExperienceForm.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default ExperienceForm;
