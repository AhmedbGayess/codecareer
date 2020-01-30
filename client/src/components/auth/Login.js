import React from "react";
import "./Login.scss";
import LoginForm from "./LoginForm";

const Login = ({ history }) => {
  return (
    <div className="login">
      <div className="container">
        <div className="login__container">
          <div className="login__intro">
            <h1 className="login__title">Your coding career begins here</h1>
            <p className="login__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vulputate, tortor in blandit ornare, magna sapien vehicula diam,
              at lacinia arcu turpis nec odio.
            </p>
          </div>
          <LoginForm history={history} />
        </div>
      </div>
    </div>
  );
};

export default Login;
