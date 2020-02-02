import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getJobs, clearJobs } from "../../store/actions/jobs";
import PropTypes from "prop-types";
import SearchForm from "../common/SearchForm";

const JobsPage = ({ jobs, getJobs, clearJobs }) => {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getJobs(0, searchQuery);
    return () => {
      clearJobs();
    };
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    clearJobs();
    getJobs(0, search);
    setSkip(10);
    setSearchQuery(search);
  };

  const searchJobs = () => {
    getJobs(skip, searchQuery);
    setSkip(skip + 10);
  };

  return (
    <div className="container">
      <SearchForm
        onChange={setSearch}
        value={search}
        placeholder="Search a job by title, skills, location..."
        title="a job"
        onSubmit={submitSearch}
      />
      <InfiniteScroll dataLength={jobs.length} next={searchJobs} hasMore={true}>
        {jobs.map((job) => (
          <p key={job._id}>{job.title}</p>
        ))}
      </InfiniteScroll>
    </div>
  );
};

JobsPage.propTypes = {};

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobs
});

export default connect(mapStateToProps, { getJobs, clearJobs })(JobsPage);
