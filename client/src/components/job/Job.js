import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getJob } from "../../store/actions/jobs";
import { getOwnProfile } from "../../store/actions/profiles";
import PropTypes from "prop-types";
import Loader from "../common/Loader";
import JobDescription from "./JobDescription";
import JobSkills from "./JobSkills";
import JobAbout from "./JobAbout";
import ProfileLink from "../profiles/ProfileLink";
import "./Job.scss";
import ProfileNeeded from "../profile/ProfileNeeded";

const Job = ({ jobs, getJob, match, userId, getOwnProfile, profiles }) => {
  useEffect(() => {
    getJob(match.params.id);
    getOwnProfile();
  }, []);

  const { job, loading } = jobs;
  const { profile, loading: profileLoading } = profiles;

  if (!job || loading || !profile || profileLoading) {
    return <Loader />;
  }

  if (Object.keys(job).length === 0) {
    return <p>No job found</p>;
  }

  if (Object.keys(profile).length === 0) {
    return <ProfileNeeded />;
  }

  const {
    _id,
    user,
    company,
    title,
    location,
    description,
    updatedAt,
    applicants,
    skills
  } = job;

  const applied = applicants.find((applicant) => applicant.user === userId);
  return (
    <div className="container">
      <div className="job__header">
        <JobDescription
          title={title}
          company={company}
          updatedAt={updatedAt}
          location={location}
          user={user}
          userId={userId}
          id={_id}
          applied={!!applied}
        />
        <JobSkills skills={skills} userSkills={profile.skills} />
      </div>
      <JobAbout description={description} />
      {user === userId && (
        <>
          <h1>Applicants</h1>
          {applicants.map((applicant) => (
            <ProfileLink
              key={applicant._id}
              id={applicant.user}
              name={applicant.name}
              image={applicant.profilePicture}
              location={applicant.location}
              about={applicant.about}
            />
          ))}
        </>
      )}
    </div>
  );
};

Job.propTypes = {
  jobs: PropTypes.object.isRequired,
  getJob: PropTypes.func.isRequired,
  getOwnProfile: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  userId: state.auth.user.id,
  profiles: state.profiles
});

export default connect(mapStateToProps, { getJob, getOwnProfile })(Job);
