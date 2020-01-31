import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import "./DevEdExpItem.scss";

const DevEdExpItem = ({ establishment, title, from, to }) => {
  return (
    <div className="profile-edexp-item">
      <p className="edexp-item__establishment">{establishment}</p>
      <p className="edexp-item__title">{title}</p>
      <p className="edexp-item__date">
        From {moment(from).format("MMMM YYYY")}
        {to && ` to ${moment(to).format("MMMM YYYY")}`}
      </p>
    </div>
  );
};

DevEdExpItem.propTypes = {
  establishment: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string
};

export default DevEdExpItem;
