import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Navbar from "../components/layout/Navbar";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import EditProfile from "../components/edit-profile/EditProfile";
import Profile from "../components/profile/Profile";
import Home from "../components/home/Home";
import PostPage from "../components/posts/PostPage";

const AppRouter = () => (
  <Router>
    <Route component={Navbar} />
    <Switch>
      <PublicRoute path="/" exact component={Login} />
      <PublicRoute path="/register" exact component={Signup} />
      <PrivateRoute path="/home" exact component={Home} />
      <PrivateRoute path="/edit-profile" exact component={EditProfile} />
      <PrivateRoute path="/me" exact component={Profile} />
      <PrivateRoute path="/post/:id" exact component={PostPage} />
    </Switch>
  </Router>
);

export default AppRouter;
