import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import Listing from "./core/Listing";
import Dashboard from "./user/UserDashboard";
import UserSettings from "./user/UserSettings";
import WorkExperience from "./user/WorkExperience/ViewWorkExperience";
import UpdateWorkExperience from "./user/WorkExperience/UpdateWorkExperience";
import Admin from "./core/Admin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/auth/activate/:token" exact component={Activate} />
        <PrivateRoute path="/private" exact component={Private} />
        <PrivateRoute path="/scrapper/listing" exact component={Listing} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/user/settings" exact component={UserSettings} />
        <PrivateRoute
          path="/user/work-experience"
          exact
          component={WorkExperience}
        />
        <PrivateRoute
          //path="/user/work-experience/update"
          path="/user/:id/:experienceId"
          exact
          component={UpdateWorkExperience}
        />
        <AdminRoute path="/admin" exact component={Admin} />
        <Route path="/auth/password/forgot" exact component={Forgot} />
        <Route path="/auth/password/reset/:token" exact component={Reset} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
