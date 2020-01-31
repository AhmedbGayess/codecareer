import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AddPost from "../posts/AddPost";
import { getPosts } from "../../store/actions/posts";
import PostsFeed from "../posts/PostsFeed";

const Home = ({ getPosts }) => {
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    getPosts(skip);
    setSkip(skip + 10);
  };

  return (
    <div className="container">
      <AddPost />
      <PostsFeed fetchPosts={fetchPosts} />
    </div>
  );
};

export default connect(null, { getPosts })(Home);
