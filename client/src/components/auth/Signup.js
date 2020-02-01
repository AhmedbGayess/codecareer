import React from "react";
import "./Signup.scss";
import SignupForm from "./SignupForm";

const Signup = ({ history }) => {
  const editPage = history.location.pathname === "/edit-user";
  return (
    <div className="signup">
      <div className="container">
        <h1 className="signup__title">
          {editPage
            ? "Edit your info"
            : "Join us to boost your developer career"}
        </h1>
        <SignupForm history={history} editPage={editPage} />
      </div>
    </div>
  );
};

export default Signup;
