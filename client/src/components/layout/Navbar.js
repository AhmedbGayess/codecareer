import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/actions/auth";
import "./Navbar.scss";

const Navbar = ({ history, isAuthenticated, logout, isCompany }) => {
  const logoutUser = () => {
    logout();
    history.push("/");
  };

  return (
    <nav className="nav">
      <h1 className="nav__title">
        <NavLink to="/" className="nav__title-link">
          &#123;CodeCareer&#125;
        </NavLink>
      </h1>
      <ul className="nav__list">
        {!isAuthenticated && (
          <>
            <li className="nav__list-item">
              <NavLink
                to="/"
                exact
                className="nav__list-link"
                activeClassName="nav__list-link--active"
              >
                Login
              </NavLink>
            </li>
            <li className="nav__list-item">
              <NavLink
                to="/register"
                className="nav__list-link"
                activeClassName="nav__list-link--active"
              >
                Sign up
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li className="nav__list-item">
              <NavLink
                to="/jobs"
                className="nav__list-link"
                activeClassName="nav__list-link--active"
              >
                Jobs
              </NavLink>
            </li>
            {isCompany && (
              <>
                <li className="nav__list-item">
                  <NavLink
                    to="/my-jobs"
                    className="nav__list-link"
                    activeClassName="nav__list-link--active"
                  >
                    Our Jobs
                  </NavLink>
                </li>
                <li className="nav__list-item">
                  <NavLink
                    to="/add-job"
                    className="nav__list-link"
                    activeClassName="nav__list-link--active"
                  >
                    Add Job
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav__list-item">
              <NavLink
                to="/developers"
                className="nav__list-link"
                activeClassName="nav__list-link--active"
              >
                Profiles
              </NavLink>
            </li>
            <li className="nav__list-item">
              <NavLink
                to="/me"
                className="nav__list-link"
                activeClassName="nav__list-link--active"
              >
                My Profile
              </NavLink>
            </li>
            <li className="nav__list-item">
              <span className="nav__list-link" onClick={logoutUser}>
                Logout
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  isCompany: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCompany: state.auth.user.role === "company"
});

export default connect(mapStateToProps, { logout })(Navbar);
