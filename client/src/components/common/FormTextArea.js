import React from "react";
import PropTypes from "prop-types";
import "./FormInput.scss";

const FormTextArea = ({ name, placeholder, onChange, value, rows }) => {
  return (
    <div className="input-container">
      <textarea
        id={name}
        name={name}
        className="input-textarea"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        rows={rows}
      ></textarea>
    </div>
  );
};

FormTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default FormTextArea;
