import React, { useState } from "react";
import PropTypes from "prop-types";
import FormTextArea from "../common/FormTextArea";
import "./PostForm.scss";

const PostForm = ({ title, submit }) => {
  const [post, setPost] = useState("");

  const createPost = (e) => {
    e.preventDefault();
    submit(post);
    setPost("");
  };

  return (
    <form className="post-form" onSubmit={createPost}>
      <h2 className="post-form__title">{title}</h2>
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

PostForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default PostForm;
