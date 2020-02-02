import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOwnJob, addJob, editJob } from "../../store/actions/jobs";
import JobForm from "./JobForm";
import Loader from "../common/Loader";
import "./EditJob.scss";

const EditJob = ({ history, addJob, editJob, getOwnJob, match, jobs }) => {
  const id = match.params.id;

  useEffect(() => {
    if (id) {
      getOwnJob(id);
    }
  }, []);

  const onSubmit = (jobData) => {
    if (id) {
      editJob(id, jobData, history);
    } else {
      addJob(jobData, history);
    }
  };

  const { job, loading } = jobs;

  if (!job || loading) {
    return <Loader />;
  }

  if (Object.keys(job).length === 0) {
    return <p>No job found</p>;
  }

  const { title, location, description, skills } = job;
  return (
    <div className="container edit-job">
      <h1 className="edit-job__title">{id ? "Edit Job" : "Post a new Job"}</h1>
      <JobForm
        onSubmit={onSubmit}
        fetchedTitle={title}
        fetchedLocation={location}
        fetchedDescription={description}
        fetchedSkills={skills}
      />
    </div>
  );
};

EditJob.propTypes = {
  job: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.instanceOf(null).isRequired
  ]),
  getOwnJob: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
  editJob: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  jobs: state.jobs
});

export default connect(mapStateToProps, { getOwnJob, addJob, editJob })(
  EditJob
);
