import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts, addPost, clearPosts } from "../../store/actions/posts";
import PostsFeed from "../posts/PostsFeed";
import PostForm from "../posts/PostForm";

const Home = ({ getPosts, addPost, clearPosts }) => {
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetchPosts();

    return () => {
      clearPosts();
    };
  }, []);

  const fetchPosts = () => {
    getPosts(skip);
    setSkip(skip + 10);
  };

  return (
    <div className="container">
      <PostForm title="Create Post" submit={addPost} />
      <PostsFeed fetchPosts={fetchPosts} />
    </div>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  clearPosts: PropTypes.func.isRequired
};

export default connect(null, { getPosts, addPost, clearPosts })(Home);
