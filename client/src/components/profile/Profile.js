import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOwnProfile } from "../../store/actions/profiles";
import { getUserPosts, clearPosts } from "../../store/actions/posts";
import Loader from "../common/Loader";
import ProfileCard from "./ProfileCard";
import DevEdExpList from "./DevEdExpList";
import PostsFeed from "../posts/PostsFeed";

const Profile = ({
  profile,
  loading,
  getOwnProfile,
  getUserPosts,
  history,
  role,
  userId,
  posts,
  match,
  clearPosts
}) => {
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getOwnProfile();
    fetchPosts();

    return () => {
      clearPosts();
    };
  }, []);

  const fetchPosts = () => {
    const id = match.path === "/me" ? userId : match.params.id;
    getUserPosts(id, skip);
    setSkip(skip + 10);
  };

  if (!profile || loading) {
    return <Loader />;
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
        {isDeveloper && experience && (
          <DevEdExpList list={experience} title="Experience" />
        )}
        {isDeveloper && education && (
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
  getUserPosts: PropTypes.func.isRequired,
  clearPosts: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
  loading: state.profiles.loading,
  role: state.auth.user.role,
  userId: state.auth.user.id,
  posts: state.posts.posts
});

export default connect(mapStateToProps, {
  getOwnProfile,
  getUserPosts,
  clearPosts
})(Profile);
