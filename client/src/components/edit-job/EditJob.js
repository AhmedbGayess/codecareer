import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getOwnJob,
  addJob,
  editJob,
  deleteJob
} from "../../store/actions/jobs";
import JobForm from "./JobForm";
import Loader from "../common/Loader";
import "./EditJob.scss";
import Delete from "../common/Delete";

const EditJob = ({
  history,
  addJob,
  editJob,
  getOwnJob,
  match,
  jobs,
  deleteJob
}) => {
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

  const removeJob = () => {
    deleteJob(id, history);
  };

  const { job, loading } = jobs;

  if (id) {
    if (!job || loading) {
      return <Loader />;
    }

    if (Object.keys(job).length === 0) {
      return <p>No job found</p>;
    }
  }

  return (
    <div className="container edit-job">
      <h1 className="edit-job__title">{id ? "Edit Job" : "Post a new Job"}</h1>
      <JobForm
        onSubmit={onSubmit}
        fetchedTitle={job && job.title}
        fetchedLocation={job && job.location}
        fetchedDescription={job && job.description}
        fetchedSkills={job && job.skills}
      />
      {id && <Delete text="Delete job" remove={removeJob} />}
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
  editJob: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  jobs: state.jobs
});

export default connect(mapStateToProps, {
  getOwnJob,
  addJob,
  editJob,
  deleteJob
})(EditJob);
