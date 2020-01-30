import React from "react";
import PropTypes from "prop-types";
import "./EducationList.scss";
import EducationListItem from "./EducationListItem";

const EducationList = ({ education, toggleEducationForm, deleteEducation }) => {
  const educationList = education.map((ed) => (
    <EducationListItem
      key={ed.id}
      school={ed.school}
      degree={ed.degree}
      from={ed.from}
      to={ed.to}
      id={ed.id}
      deleteEducation={deleteEducation}
    />
  ));
  return (
    <div className="education-list">
      <div className="education-header">
        <h1 className="education-header__title">Eduaction</h1>
        <button className="btn btn--primary" onClick={toggleEducationForm}>
          Add Eduaction
        </button>
      </div>
      <div>{educationList}</div>
    </div>
  );
};

EducationList.propTypes = {
  education: PropTypes.array.isRequired
};

export default EducationList;
