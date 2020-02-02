import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => (
  <div className="not-found">
    <div className="container">
      <h1 className="not-found__title">404</h1>
      <h3 className="not-found__text">Sorry, this page does not exist</h3>
      <Link to="/" className="not-found__link">
        Go back to Homepage
      </Link>
    </div>
  </div>
);

export default NotFound;
