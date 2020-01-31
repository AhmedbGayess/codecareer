import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FormTextArea from "../common/FormTextArea";
import "./AddPost.scss";
import { addPost } from "../../store/actions/posts";

const AddPost = ({ addPost }) => {
  const [post, setPost] = useState("");

  const createPost = (e) => {
    e.preventDefault();
    addPost(post);
    setPost("");
  };

  return (
    <form className="post-form" onSubmit={createPost}>
      <h2 className="post-form__title">Create Post</h2>
      <FormTextArea
        name="post"
        value={post}
        onChange={setPost}
        placeholder="Do you have something to say..."
        rows="5"
      />
      <button className="btn btn--primary">Post</button>
    </form>
  );
};

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(AddPost);
