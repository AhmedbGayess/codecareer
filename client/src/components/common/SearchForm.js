import React from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import "./SearchForm.scss";

const SearchForm = ({ onChange, value, placeholder, title, onSubmit }) => {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <h1 className="search-form__title">Search {title}</h1>
      <FormInput
        name="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button className="btn btn--primary">Search</button>
    </form>
  );
};

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default SearchForm;
