import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "../components/auth/Signup";

const AppRouter = () => (
  <Router>
    <Route path="/" exact component={Signup} />
  </Router>
);

export default AppRouter;
