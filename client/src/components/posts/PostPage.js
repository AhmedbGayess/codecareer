import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getPost,
  addComment,
  deleteComment,
  deletePost
} from "../../store/actions/posts";
import Loader from "../common/Loader";
import Post from "./Post";
import PostForm from "./PostForm";

const PostPage = ({
  getPost,
  posts,
  match,
  addComment,
  deletePost,
  deleteComment,
  history
}) => {
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

  const removePost = async () => {
    await deletePost(match.params.id);
    history.push("/home");
  };

  const removeComment = (postId) => {
    deleteComment(match.params.id, postId);
  };

  const { user, name, profilePicture, text, comments } = post;
  return (
    <div className="container">
      <Post
        name={name}
        image={profilePicture}
        text={text}
        remove={removePost}
        user={user}
      />
      <PostForm title="Add Comment" submit={postComment} />
      <h1>Comments</h1>
      {comments.map((comment) => (
        <Post
          key={comment._id}
          name={comment.name}
          image={comment.profilePicture}
          text={comment.text}
          remove={removeComment}
          id={comment._id}
          user={comment.user}
        />
      ))}
    </div>
  );
};

PostPage.propTypes = {
  getPost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps, {
  getPost,
  addComment,
  deleteComment,
  deletePost
})(PostPage);
