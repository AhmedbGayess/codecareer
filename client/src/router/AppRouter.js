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
import JobsPage from "../components/jobs/JobsPage";
import Footer from "../components/layout/Footer";
import NotFound from "../components/not-found/NotFound";
import Job from "../components/job/Job";

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
      <PrivateRoute path="/jobs" exact component={JobsPage} />
      <CompnayRoute path="/add-job" exact component={EditJob} />
      <CompnayRoute path="/edit-job/:id" exact component={EditJob} />
      <CompnayRoute path="/my-jobs" exact component={JobsPage} />
      <PrivateRoute path="/job/:id" exact component={Job} />
      <Route component={NotFound} />
    </Switch>
    <Route
      path={[
        "/home",
        "/register",
        "/edit-profile",
        "/me",
        "/profile/:id",
        "/post/:id",
        "/edit-user",
        "/developers",
        "/jobs",
        "/add-job",
        "/edit-job/:id",
        "/my-jobs",
        "/job/:id"
      ]}
      component={Footer}
    />
  </Router>
);

export default AppRouter;
