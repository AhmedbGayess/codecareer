import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import avatar from "../../images/avatar.png";

import "./Post.scss";
import { Link } from "react-router-dom";

const Post = ({ user, image, name, text, id, remove, userId }) => {
  const deletePost = () => {
    remove(id);
  };

  const isUser = user === userId;

  return (
    <div className="post">
      <div className="post__user">
        <Link to={`/profile/${user}`}>
          <img
            src={image ? `/images/${image}` : avatar}
            className="post__image"
            alt="user"
          />
        </Link>
        <Link to={`/profile/${user}`} className="post__name">
          {name}
        </Link>
      </div>
      <p className="post__text">{text}</p>
      {isUser && (
        <button className="btn btn--delete post__delete" onClick={deletePost}>
          Delete
        </button>
      )}
    </div>
  );
};

Post.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userId: state.auth.user.id
});

export default connect(mapStateToProps)(Post);
