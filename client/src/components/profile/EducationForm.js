import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import FormInput from "../common/FormInput";
import "./EducationForm.scss";
import uuidv4 from "uuid";

const EducationForm = ({ addEducation, toggleEducationForm }) => {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [schoolError, setSchoolError] = useState("");
  const [degreeError, setDegreeError] = useState("");
  const [fromError, setFromError] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      toggleEducationForm();
    }
  };

  const handleEscapePress = (e) => {
    if (e.keyCode === 27) {
      toggleEducationForm();
    }
  };

  const handleValidation = () => {
    let isFormValid = true;

    if (school.length < 2) {
      setSchoolError("Please enter your school's name");
      isFormValid = false;
    } else {
      setSchoolError("");
    }

    if (degree === "") {
      setDegreeError("Please enter your degree");
    } else {
      setDegreeError("");
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

    addEducation({ school, degree, from, to, id: uuidv4() });
    setSchool("");
    setDegree("");
    setFrom("");
    setTo("");
    toggleEducationForm();
  };

  return (
    <div className="education-modal">
      <form onSubmit={onSubmit} className="education-form" ref={wrapperRef}>
        <FormInput
          name="school"
          label="School"
          placeholder="The school's name"
          value={school}
          onChange={setSchool}
          error={schoolError}
        />
        <FormInput
          name="degree"
          label="Degree"
          placeholder="Your degree"
          value={degree}
          onChange={setDegree}
          error={degreeError}
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
        <button className="btn btn--primary">Add Education</button>
      </form>
    </div>
  );
};

EducationForm.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default EducationForm;
