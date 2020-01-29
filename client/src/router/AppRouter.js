import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const AppRouter = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Login} />
    </Switch>
  </Router>
);

export default AppRouter;
