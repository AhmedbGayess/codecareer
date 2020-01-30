import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, resetAuthError } from "../../store/actions/auth";
import TextInput from "../common/TextInput";
import "./LoginForm.scss";

const LoginForm = ({ login, history, authError, resetAuthError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    resetAuthError();
  }, []);

  const handleValidation = () => {
    let isFormValid = true;
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (email === "" || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isFormValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 5) {
      setPasswordError("Please enter your password (at least 5 characters)");
      isFormValid = false;
    } else {
      setPasswordError("");
    }
    return isFormValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isFormValid = handleValidation();
    if (!isFormValid) {
      return;
    } else {
      login({ email, password }, history);
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <TextInput
        name="email"
        label="Email"
        placeholder="Please enter your email address"
        value={email}
        onChange={setEmail}
        error={emailError}
      />
      <TextInput
        name="password"
        type="password"
        label="Password"
        placeholder="Please enter a your password"
        value={password}
        onChange={setPassword}
        error={authError || passwordError}
      />
      <button className="btn btn--primary">Login</button>
      <p className="login-form__join">
        Dont have an account?{" "}
        <Link className="login-form__link" to="/register">
          Join us!
        </Link>
      </p>
    </form>
  );
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError
});

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  resetAuthError: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { login, resetAuthError })(LoginForm);
