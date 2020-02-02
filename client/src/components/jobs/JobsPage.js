import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getJobs, clearJobs, getOwnJobs } from "../../store/actions/jobs";
import PropTypes from "prop-types";
import SearchForm from "../common/SearchForm";
import JobsFeed from "./JobsFeed";

const JobsPage = ({ getJobs, clearJobs, match, getOwnJobs }) => {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    clearJobs();
    if (match.path === "/my-jobs") {
      getOwnJobs(0);
    } else {
      getJobs(0, searchQuery);
    }
    setSkip(10);
    return () => {
      clearJobs();
    };
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    clearJobs();
    if (match.path === "/my-jobs") {
      getOwnJobs(0);
    } else {
      getJobs(0, search);
    }
    setSkip(10);
    setSearchQuery(search);
  };

  const searchJobs = () => {
    if (match.path === "/my-jobs") {
      getOwnJobs(skip);
    } else {
      getJobs(skip, searchQuery);
    }
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
      <JobsFeed fetchJobs={searchJobs} />
    </div>
  );
};

JobsPage.propTypes = {
  getJobs: PropTypes.func.isRequired,
  clearJobs: PropTypes.func.isRequired,
  getOwnJobs: PropTypes.func.isRequired
};

export default connect(null, { getJobs, clearJobs, getOwnJobs })(JobsPage);
