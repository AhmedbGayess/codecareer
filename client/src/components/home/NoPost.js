import React from "react";
import { Link } from "react-router-dom";
import "./NoPost.scss";

const NoPost = () => (
  <div className="no-post">
    <h3 className="no-post__title">Want to post something ?</h3>
    <Link to="/edit-profile" className="no-post__link">
      Click here to first create your profile
    </Link>
  </div>
);

export default NoPost;
