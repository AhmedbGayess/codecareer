import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser, resetAuthError } from "../../store/actions/auth";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import "./SignupForm.scss";

const SignupForm = ({ history, registerUser, authError, resetAuthError }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("developer");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    resetAuthError();
  }, []);

  const handleValidation = () => {
    let isFormValid = true;
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (name.length < 2) {
      setNameError("Please enter a valid name");
      isFormValid = false;
    } else {
      setNameError("");
    }

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
      registerUser({ name, email, password, role }, history);
    }
  };

  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <TextInput
        name="name"
        label="Name"
        placeholder="Please enter your name"
        value={name}
        onChange={setName}
        error={nameError}
      />
      <TextInput
        name="email"
        type="email"
        label="Email"
        placeholder="Please enter your email address"
        value={email}
        onChange={setEmail}
        error={authError || emailError}
      />
      <TextInput
        name="password"
        type="password"
        label="Password"
        placeholder="Please enter a password for your account"
        value={password}
        onChange={setPassword}
        error={passwordError}
      />
      <SelectInput
        name="role"
        choices={["developer", "company"]}
        value={role}
        onChange={setRole}
        label="You are a..."
      />
      <button className="btn btn--primary">Sign Up</button>
      <p className="signup-form__join">
        Already have an account?{" "}
        <Link className="signup-form__link" to="/">
          Sign in!
        </Link>
      </p>
    </form>
  );
};

SignupForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  resetAuthError: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError
});

export default connect(mapStateToProps, { registerUser, resetAuthError })(
  SignupForm
);
