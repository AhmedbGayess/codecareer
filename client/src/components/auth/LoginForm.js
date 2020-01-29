import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import "./LoginForm.scss";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer"
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, email, password, role } = formData;
  return (
    <form className="login-form">
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
      <SelectInput name="role" choices={["developer", "company"]} value={role} onChange={onChange} label="You are a..." />  
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
