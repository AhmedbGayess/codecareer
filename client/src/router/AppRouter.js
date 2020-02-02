import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import CompnayRoute from "./CompanyRoute";
import Navbar from "../components/layout/Navbar";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import EditProfile from "../components/edit-profile/EditProfile";
import Profile from "../components/profile/Profile";
import Home from "../components/home/Home";
import PostPage from "../components/posts/PostPage";
import Profiles from "../components/profiles/Profiles";
import EditJob from "../components/edit-job/EditJob";

const AppRouter = () => (
  <Router>
    <Route component={Navbar} />
    <Switch>
      <PublicRoute path="/" exact component={Login} />
      <PublicRoute path="/register" exact component={Signup} />
      <PrivateRoute path="/home" exact component={Home} />
      <PrivateRoute path="/edit-profile" exact component={EditProfile} />
      <PrivateRoute path="/me" exact component={Profile} />
      <PrivateRoute path="/profile/:id" exact component={Profile} />
      <PrivateRoute path="/post/:id" exact component={PostPage} />
      <PrivateRoute path="/edit-user" exact component={Signup} />
      <PrivateRoute path="/developers" exact component={Profiles} />
      <CompnayRoute path="/add-job" exact component={EditJob} />
      <CompnayRoute path="/edit-job/:id" exact component={EditJob} />
    </Switch>
  </Router>
);

export default AppRouter;
