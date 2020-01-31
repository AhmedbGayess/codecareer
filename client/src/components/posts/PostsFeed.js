import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import Post from "./Post";

const PostsFeed = ({ posts, fetchPosts }) => (
  <InfiniteScroll dataLength={posts.length} next={fetchPosts} hasMore={true}>
    {posts.map((post) => {
      const { _id, text, name, profilePicture, likes, comments } = post;
      return (
        <Post
          key={_id}
          text={text}
          id={_id}
          name={name}
          image={profilePicture}
          likes={likes}
          comments={comments.length}
        />
      );
    })}
  </InfiniteScroll>
);

PostsFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps)(PostsFeed);
