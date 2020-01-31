import React from "react";
import PropTypes from "prop-types";
import "./EdExpList.scss";
import EdExpListItem from "./EdExpListItem";

const EdExpList = ({ edExp, toggleForm, deleteEdExp, title }) => {
  const edExpList = edExp.map((el) => (
    <EdExpListItem
      key={el.id || el._id}
      establishment={el.school || el.company}
      title={el.degree || el.position}
      from={el.from}
      to={el.to}
      id={el.id || el._id}
      deleteEdExp={deleteEdExp}
    />
  ));
  return (
    <div className="edex-list">
      <div className="edex-header">
        <h1 className="edex-header__title">{title}</h1>
        <button className="btn btn--primary" onClick={toggleForm}>
          Add {title}
        </button>
      </div>
      <div>{edExpList}</div>
    </div>
  );
};

EdExpList.propTypes = {
  edExp: PropTypes.array.isRequired
};

export default EdExpList;
