import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import JobForm from "./JobForm";

const EditJob = () => {
  return (
    <div className="container">
      <h1>Edit page</h1>
      <JobForm />
    </div>
  );
};

export default EditJob;
