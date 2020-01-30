import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import "./EducationListItem.scss";

const EducationListItem = ({
  school,
  degree,
  from,
  to,
  id,
  deleteEducation
}) => {
  const removeEducation = () => {
    deleteEducation(id);
  };

  return (
    <div className="education-item">
      <div>
        <p className="education-item__school">{school}</p>
        <p className="education-item__degree">{degree}</p>
        <p className="education-item__date">
          From {moment(from).format("MMMM YYYY")}
          {to && ` to ${moment(to).format("MMMM YYYY")}`}
        </p>
      </div>
      <button className="btn btn--delete" onClick={removeEducation}>
        Delete
      </button>
    </div>
  );
};

EducationListItem.propTypes = {
  school: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string
};

export default EducationListItem;
