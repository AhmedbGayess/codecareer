import React from "react";
import PropTypes from "prop-types";
import "./FormInput.scss";

const SelectInput = ({ name, label, choices, error, onChange, value }) => {
  const options = choices.map((option) => (
    <option key={option} value={option}>
      {option.replace(/\b\w/g, (l) => l.toUpperCase())}
    </option>
  ));
  return (
    <div className="input-container">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="input-field"
        onChange={onChange}
        value={value}
      >
        {options}
      </select>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

SelectInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default SelectInput;
