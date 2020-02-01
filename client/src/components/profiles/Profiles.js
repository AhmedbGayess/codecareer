import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import { getProfiles, clearProfiles } from "../../store/actions/profiles";
import SearchForm from "../common/SearchForm";
import ProfileLink from "./ProfileLink";

const Profiles = ({ getProfiles, profiles, clearProfiles }) => {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    return () => {
      clearProfiles();
    };
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    clearProfiles();
    getProfiles(0, search);
    setSkip(10);
    setSearchQuery(search);
  };

  const searchProfiles = () => {
    getProfiles(skip, search);
    setSkip(skip + 10);
  };

  return (
    <div className="container">
      <SearchForm
        onChange={setSearch}
        value={search}
        placeholder="Search a developer by name, skills, location..."
        title="a developer"
        onSubmit={submitSearch}
      />
      <InfiniteScroll
        dataLength={profiles.length}
        next={searchProfiles}
        hasMore={true}
      >
        {profiles.map((profile) => (
          <ProfileLink
            key={profile._id}
            id={profile._id}
            name={profile.name}
            image={profile.profilePicture}
            location={profile.location}
            about={profile.about}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

Profiles.propTypes = {
  profiles: PropTypes.array.isRequired,
  getProfiles: PropTypes.func.isRequired,
  clearProfiles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profiles: state.profiles.profiles
});

export default connect(mapStateToProps, { getProfiles, clearProfiles })(
  Profiles
);
