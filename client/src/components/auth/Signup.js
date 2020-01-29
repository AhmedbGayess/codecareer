import React from "react";
import "./Signup.scss";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="signup">
      <div className="container">
        <h1 className="signup__title">
          Join us to boost your developer career
        </h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
