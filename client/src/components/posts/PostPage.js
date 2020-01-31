import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost, addComment } from "../../store/actions/posts";
import Loader from "../common/Loader";
import Post from "./Post";
import PostForm from "./PostForm";

const PostPage = ({ getPost, posts, match, addComment }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, []);

  const { post, loading } = posts;

  if (!post || loading) {
    return <Loader />;
  }

  const postComment = (comment) => {
    addComment(match.params.id, comment);
  };

  const { name, profilePicture, text, comments } = post;
  return (
    <div className="container">
      <Post name={name} image={profilePicture} text={text} />
      <PostForm title="Add Comment" submit={postComment} />
    </div>
  );
};

PostPage.propTypes = {
  getPost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPost, addComment })(PostPage);
