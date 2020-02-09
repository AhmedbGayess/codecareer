import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { getOwnProfile, getProfile } from "../../store/actions/profiles";
import { getUserPosts, clearPosts } from "../../store/actions/posts";
import Loader from "../common/Loader";
import ProfileCard from "./ProfileCard";
import DevEdExpList from "./DevEdExpList";
import PostsFeed from "../posts/PostsFeed";
import ProfileNeeded from "./ProfileNeeded";

const Profile = ({
  profile,
  loading,
  getOwnProfile,
  getUserPosts,
  history,
  role,
  userId,
  match,
  clearPosts,
  getProfile
}) => {
  const [skip, setSkip] = useState(0);
  const id = match.path === "/me" ? userId : match.params.id;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (match.path === "/me") {
      getOwnProfile(id);
    } else {
      getProfile(id);
    }
    fetchPosts();

    return () => {
      clearPosts();
    };
  }, []);

  const fetchPosts = () => {
    getUserPosts(id, skip);
    setSkip(skip + 10);
  };

  if (!profile || loading) {
    return <Loader />;
  }

  if (Object.keys(profile).length === 0 && match.path === "/me") {
    return <ProfileNeeded />;
  } else if (Object.keys(profile).length === 0) {
    return <h1 className="no-profile">No profile found</h1>;
  }

  const {
    name,
    about,
    location,
    experience,
    education,
    github,
    website,
    skills,
    profilePicture
  } = profile;

  const myProfile = history.location.pathname === "/me";
  const isDeveloper = role === "developer";

  return (
    <div>
      <div className="container">
        <ProfileCard
          name={name}
          about={about}
          location={location}
          profilePicture={profilePicture}
          skills={skills}
          github={github}
          website={website}
          myProfile={myProfile}
          isDeveloper={isDeveloper}
        />
        {isDeveloper && experience.length > 0 && (
          <DevEdExpList list={experience} title="Experience" />
        )}
        {isDeveloper && education.length > 0 && (
          <DevEdExpList list={education} title="Education" />
        )}
        <PostsFeed fetchPosts={fetchPosts} />
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.instanceOf(null).isRequired
  ]),
  loading: PropTypes.bool.isRequired,
  getOwnProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  clearPosts: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
  loading: state.profiles.loading,
  role: state.auth.user.role,
  userId: state.auth.user.id
});

export default connect(mapStateToProps, {
  getOwnProfile,
  getUserPosts,
  clearPosts,
  getProfile
})(Profile);
