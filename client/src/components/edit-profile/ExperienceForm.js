import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid";
import FormInput from "../common/FormInput";
import "./EducationForm.scss";

const ExperienceForm = ({ addExperience, toggleExperienceForm }) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [fromError, setFromError] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      toggleExperienceForm();
    }
  };

  const handleEscapePress = (e) => {
    if (e.keyCode === 27) {
      toggleExperienceForm();
    }
  };

  const handleValidation = () => {
    let isFormValid = true;

    if (company.length < 2) {
      setCompanyError("Please enter the company's name");
      isFormValid = false;
    } else {
      setCompanyError("");
    }

    if (position === "") {
      setPositionError("Please enter your position in that company");
    } else {
      setPositionError("");
    }

    if (from === "") {
      setFromError("Please enter the date of your first degree");
    } else {
      setFromError("");
    }
    return isFormValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isFormValid = handleValidation();
    if (!isFormValid) {
      return;
    }

    addExperience({ id: uuidv4(), company, position, from, to });
    setCompany("");
    setPosition("");
    setFrom("");
    setTo("");
    toggleExperienceForm();
  };

  return (
    <div className="education-modal">
      <form onSubmit={onSubmit} className="education-form" ref={wrapperRef}>
        <FormInput
          name="company"
          label="Company"
          placeholder="The company's name"
          value={company}
          onChange={setCompany}
          error={companyError}
        />
        <FormInput
          name="position"
          label="Position"
          placeholder="Your position in the company"
          value={position}
          onChange={setPosition}
          error={positionError}
        />
        <FormInput
          name="from"
          type="month"
          label="From"
          value={from}
          onChange={setFrom}
          error={fromError}
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
    </div>
  );
};

ExperienceForm.propTypes = {
  addExperience: PropTypes.func.isRequired,
  toggleExperienceForm: PropTypes.func.isRequired
};

export default ExperienceForm;
