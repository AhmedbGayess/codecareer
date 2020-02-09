import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts, addPost, clearPosts } from "../../store/actions/posts";
import { getOwnProfile } from "../../store/actions/profiles";
import PostsFeed from "../posts/PostsFeed";
import PostForm from "../posts/PostForm";
import NoPost from "./NoPost";

const Home = ({ getPosts, addPost, clearPosts, getOwnProfile, profile }) => {
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetchPosts();
    getOwnProfile();

    return () => {
      clearPosts();
    };
  }, []);

  const fetchPosts = () => {
    getPosts(skip);
    setSkip(skip + 10);
  };

  let postComponent = <PostForm title="Create Post" submit={addPost} />;

  if (profile && Object.keys(profile).length === 0) {
    postComponent = <NoPost />;
  }

  return (
    <div className="container">
      {postComponent}
      <PostsFeed fetchPosts={fetchPosts} />
    </div>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  clearPosts: PropTypes.func.isRequired,
  profile: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.instanceOf(null).isRequired
  ]),
  getOwnProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profiles.profile
});

export default connect(mapStateToProps, {
  getPosts,
  addPost,
  clearPosts,
  getOwnProfile
})(Home);
