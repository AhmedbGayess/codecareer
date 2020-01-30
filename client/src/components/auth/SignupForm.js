import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../store/actions/auth";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import "./SignupForm.scss";

const SignupForm = ({ history, registerUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer"
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(formData, history);
  };

  const { name, email, password, role } = formData;
  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <TextInput
        name="name"
        label="Name"
        placeholder="Please enter your name"
        value={name}
        onChange={onChange}
      />
      <TextInput
        name="email"
        type="email"
        label="Email"
        placeholder="Please enter your email address"
        value={email}
        onChange={onChange}
      />
      <TextInput
        name="password"
        type="password"
        label="Password"
        placeholder="Please enter a password for your account"
        value={password}
        onChange={onChange}
      />
      <SelectInput
        name="role"
        choices={["developer", "company"]}
        value={role}
        onChange={onChange}
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
  history: PropTypes.object.isRequired
};

export default connect(null, { registerUser })(SignupForm);
