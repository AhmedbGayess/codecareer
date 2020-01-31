import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import "./EdExpListItem.scss";

const EdExpListItem = ({ establishment, title, from, to, id, deleteEdExp }) => {
  const removeEdExp = () => {
    deleteEdExp(id);
  };

  return (
    <div className="edexp-item">
      <div>
        <p className="edexp-item__establishment">{establishment}</p>
        <p className="edexp-item__title">{title}</p>
        <p className="edexp-item__date">
          From {moment(from).format("MMMM YYYY")}
          {to && ` to ${moment(to).format("MMMM YYYY")}`}
        </p>
      </div>
      <button className="btn btn--delete" onClick={removeEdExp}>
        Delete
      </button>
    </div>
  );
};

EdExpListItem.propTypes = {
  establishment: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
  deleteEdExp: PropTypes.func.isRequired
};

export default EdExpListItem;
