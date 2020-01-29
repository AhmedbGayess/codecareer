import React from "react";
import PropTypes from "prop-types";
import "./TextInput.scss";

const TextInput = ({
  name,
  label,
  placeholder,
  type,
  error,
  onChange,
  value
}) => {
  return (
    <div className="input-container">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        id={name}
        type={type ? type : "text"}
        name={name}
        className="input-field"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextInput;
