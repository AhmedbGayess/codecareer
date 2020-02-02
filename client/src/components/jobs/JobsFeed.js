import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import JobLink from "./JobLink";

const JobsFeed = ({ jobs, fetchJobs }) => (
  <InfiniteScroll dataLength={jobs.length} next={fetchJobs} hasMore={true}>
    {jobs.map((job) => {
      const { _id, title, company, location, updatedAt } = job;
      return (
        <JobLink
          key={_id}
          id={_id}
          title={title}
          company={company}
          location={location}
          updatedAt={updatedAt}
        />
      );
    })}
  </InfiniteScroll>
);

JobsFeed.propTypes = {
  jobs: PropTypes.array.isRequired,
  fetchJobs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs
});

export default connect(mapStateToProps)(JobsFeed);
