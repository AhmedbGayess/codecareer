import React from "react";
import PropTypes from "prop-types";
import DevEdExpItem from "./DevEdExpItem";
import "./DevEdExpList.scss";

const DevEdExpList = ({ list, title }) => {
  const edExpList = list.map((devexp) => (
    <DevEdExpItem
      key={devexp._id}
      establishment={devexp.school || devexp.company}
      title={devexp.degree || devexp.position}
      from={devexp.from}
      to={devexp.to}
    />
  ));

  return (
    <div className="profile-edex">
      <h1 className="profile-edex__title">{title}</h1>
      <div>{edExpList}</div>
    </div>
  );
};

DevEdExpList.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default DevEdExpList;
