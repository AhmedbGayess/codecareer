import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import "./LoginForm.scss";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;
  return (
    <form className="login-form">
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

export default LoginForm;
