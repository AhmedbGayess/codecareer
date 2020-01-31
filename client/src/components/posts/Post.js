import React from "react";
import PropTypes from "prop-types";
import avatar from "../../images/avatar.png";

import "./Post.scss";

const Post = ({ image, name, text }) => {
  return (
    <div className="post">
      <div className="post__user">
        <img
          src={image ? `/images/${image}` : avatar}
          className="post__image"
          alt="user"
        />
        <p className="post__name">{name}</p>
      </div>
      <p className="post__text">{text}</p>
    </div>
  );
};

Post.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Post;
