import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  registerUser,
  resetAuthError,
  editUser
} from "../../store/actions/auth";
import FormInput from "../common/FormInput";
import SelectInput from "../common/SelectInput";
import "./SignupForm.scss";

const SignupForm = ({
  history,
  registerUser,
  authError,
  resetAuthError,
  editPage,
  user,
  editUser
}) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("developer");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    resetAuthError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }
    if (editPage) {
      editUser({ name, email, password }, history);
    } else {
      registerUser({ name, email, password, role }, history);
    }
  };

  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <FormInput
        name="name"
        label="Name"
        placeholder="Please enter your name"
        value={name}
        onChange={setName}
        error={nameError}
      />
      <FormInput
        name="email"
        type="email"
        label="Email"
        placeholder="Please enter your email address"
        value={email}
        onChange={setEmail}
        error={authError || emailError}
      />
      <FormInput
        name="password"
        type="password"
        label="Password"
        placeholder="Please enter a password for your account"
        value={password}
        onChange={setPassword}
        error={passwordError}
      />
      {!editPage && (
        <SelectInput
          name="role"
          choices={["developer", "company"]}
          value={role}
          onChange={setRole}
          label="You are a..."
        />
      )}
      <button className="btn btn--primary">
        {editPage ? "Save" : "Sign Up"}
      </button>
      {!editPage && (
        <p className="signup-form__join">
          Already have an account?{" "}
          <Link className="signup-form__link" to="/">
            Sign in!
          </Link>
        </p>
      )}
    </form>
  );
};

SignupForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  resetAuthError: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  editPage: PropTypes.bool.isRequired,
  user: PropTypes.object,
  editUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  registerUser,
  resetAuthError,
  editUser
})(SignupForm);
