import React from "react";
import loader from "../../images/loader.svg";
import "./Loader.scss";

const Loader = () => (
  <div className="loader">
    <img src={loader} alt="Loading" className="loader__image" />
  </div>
);

export default Loader;
