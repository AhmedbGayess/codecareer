import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CompanyRoute = ({
  isAuthenticated,
  role,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && role === "company" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

CompanyRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.user.role
});

export default connect(mapStateToProps)(CompanyRoute);
