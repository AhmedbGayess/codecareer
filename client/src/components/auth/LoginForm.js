import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../store/actions/auth";
import TextInput from "../common/TextInput";
import "./LoginForm.scss";

const LoginForm = ({ login, history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData, history);
  };

  const { email, password } = formData;
  return (
    <form className="login-form" onSubmit={onSubmit}>
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
        placeholder="Please enter a your password"
        value={password}
        onChange={onChange}
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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null, { login })(LoginForm);
