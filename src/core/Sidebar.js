import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth } from "../auth/helpers";
import $ from "jquery";

import "../nav.css";
import "../sidebar.css";

import dashboard from "../img/white_icons/dashboard-100.png";
import workExp from "../img/white_icons/resume-50.png";
import edu from "../img/white_icons/education-50.png";
import settings from "../img/white_icons/settings-50.png";

const Sidebar = ({ children, match, history }) => {
  useEffect(() => {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  });

  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#26D6D7" };
    } else {
      return { color: "#fff" };
    }
  };

  const sidebar = () => (
    <div className="border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">
        {" "}
        <Link to="/" id="side-nav-header">
          <h1 id="app_name">SmartRez</h1>
        </Link>
      </div>
      <div className="list-group list-group-flush">
        {isAuth() && isAuth().role === "subscriber" && (
          <Link
            to="/dashboard"
            className="list-group-item list-group-item-action "
            style={isActive("/dashboard")}
            id="side-nav-item"
          >
            <img src={dashboard} id="sidebar_icon" /> Dashboard
          </Link>
        )}

        <Link
          to="/#"
          className="list-group-item list-group-item-action "
          style={isActive("/#")}
          id="side-nav-item"
        >
          <img src={workExp} id="sidebar_icon" /> Work Experience
        </Link>

        <Link
          to="/#"
          className="list-group-item list-group-item-action "
          style={isActive("/#")}
          id="side-nav-item"
        >
          <img src={edu} id="sidebar_icon" /> Education
        </Link>

        <Link
          to="/#"
          className="list-group-item list-group-item-action "
          style={isActive("/#")}
          id="side-nav-item"
        >
          <img src={settings} id="sidebar_icon" /> Settings
        </Link>
      </div>
    </div>
  );

  return sidebar();
};

export default withRouter(Sidebar);
