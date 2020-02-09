import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getOwnJob,
  addJob,
  editJob,
  deleteJob
} from "../../store/actions/jobs";
import { getOwnProfile } from "../../store/actions/profiles";
import JobForm from "./JobForm";
import Loader from "../common/Loader";
import "./EditJob.scss";
import Delete from "../common/Delete";
import ProfileNeeded from "../profile/ProfileNeeded";

const EditJob = ({
  history,
  addJob,
  editJob,
  getOwnJob,
  match,
  jobs,
  deleteJob,
  getOwnProfile,
  profile
}) => {
  const id = match.params.id;

  useEffect(() => {
    getOwnProfile();
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

  if (profile && Object.keys(profile).length === 0) {
    return <ProfileNeeded />;
  }

  return (
    <div className="container edit-job">
      <h1 className="edit-job__title">{id ? "Edit Job" : "Post a new Job"}</h1>
      <JobForm
        onSubmit={onSubmit}
        fetchedTitle={id && job && job.title}
        fetchedLocation={id && job && job.location}
        fetchedDescription={id && job && job.description}
        fetchedSkills={id && job && job.skills}
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
  jobs: state.jobs,
  profile: state.profiles.profile
});

export default connect(mapStateToProps, {
  getOwnJob,
  addJob,
  editJob,
  deleteJob,
  getOwnProfile
})(EditJob);
