import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="nav">
      <h1 className="nav__title">
        <NavLink to="/" className="nav__title-link">
          &#123;CodeCareer&#125;
        </NavLink>
      </h1>
      <ul className="nav__list">
        <li className="nav__list-item">
          <NavLink
            to="/"
            className="nav__list-link"
            activeClassName="nav__list-link--active"
          >
            Home
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink
            to="/azerrt"
            className="nav__list-link"
            activeClassName="nav__list-link--active"
          >
            Home
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink
            to="/ssss"
            className="nav__list-link"
            activeClassName="nav__list-link--active"
          >
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
