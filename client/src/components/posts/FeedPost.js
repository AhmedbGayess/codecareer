import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { likePost } from "../../store/actions/posts";
import avatar from "../../images/avatar.png";
import "./FeedPost.scss";

const FeedPost = ({
  id,
  text,
  name,
  image,
  likes,
  comments,
  userId,
  likePost
}) => {
  const isLiked = likes.find((like) => like._id === userId);

  const like = () => {
    likePost(id);
  };

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
        {likes.length} Like(s) - {comments} Comment(s)
      </p>
      <div className="feed-post__buttons">
        <button
          className={`feed-post__button ${isLiked &&
            "feed-post__button--liked"}`}
          onClick={like}
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
        <Link to="/" className="feed-post__button">
          Comments
        </Link>
      </div>
    </div>
  );
};

FeedPost.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  comments: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userId: state.auth.user.id
});

export default connect(mapStateToProps, { likePost })(FeedPost);
