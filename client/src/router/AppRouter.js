import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Navbar from "../components/layout/Navbar";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import EditProfile from "../components/profile/EditProfile";

const AppRouter = () => (
  <Router>
    <Route component={Navbar} />
    <Switch>
      <PublicRoute path="/" exact component={Login} />
      <PublicRoute path="/register" exact component={Signup} />
      <PrivateRoute path="/edit-profile" exact component={EditProfile} />
    </Switch>
  </Router>
);

export default AppRouter;
