import React from "react";
import PropTypes from "prop-types";
import avatar from "../../images/avatar.png";
import "./Post.scss";

const Post = ({ id, text, name, image, likes, comments }) => {
  return (
    <div className="feed-post">
      <div className="feed-post__user">
        <img
          src={image ? `/images/${image}` : avatar}
          className="feed-post__image"
          alt="user"
        />
        <p className="feed-post__name">{name}</p>
      </div>
      <p className="feed-post__text">{text}</p>
      <p className="feed-post__users">
        {likes} Likes - {comments} Comments
      </p>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired
};

export default Post;
