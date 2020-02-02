import React from "react";
import PropTypes from "prop-types";
import "./Delete.scss";

const Delete = ({ remove, text }) => (
  <div className="delete">
    <p className="delete__warning">{text}</p>
    <button className="btn btn--delete" onClick={remove}>
      Delete
    </button>
  </div>
);

Delete.propTypes = {
  remove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Delete;
