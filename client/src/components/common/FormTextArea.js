import React from "react";
import PropTypes from "prop-types";
import "./FormInput.scss";

const FormTextArea = ({
  name,
  placeholder,
  onChange,
  value,
  rows,
  label,
  error
}) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        className="input-textarea"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        rows={rows}
      ></textarea>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

FormTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
};

export default FormTextArea;
