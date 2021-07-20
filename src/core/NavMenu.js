import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";
import $ from "jquery";

import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";

import "../nav.css";
import "../sidebar.css";
import "../styles.css";

const NavMenu = ({ children, match, history }) => {
  useEffect(() => {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  });

  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#0854A8" };
    } else {
      return { color: "000" };
    }
  };

  const oldNav = () => (
    <Navbar expand="lg" className="nav_background">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            {" "}
            <Link to="/" className="nav-link" style={isActive("/")}>
              Home
            </Link>
          </Nav.Link>

          {!isAuth() && (
            <Fragment>
              <Nav.Link>
                {" "}
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive("/signin")}
                >
                  Signin
                </Link>
              </Nav.Link>

              <Nav.Link>
                {" "}
                <Link
                  to="/signup"
                  className="nav-link"
                  style={isActive("/signup")}
                >
                  Signup
                </Link>
              </Nav.Link>
            </Fragment>
          )}

          {isAuth() && isAuth().role === "admin" && (
            <Nav.Link>
              {" "}
              <Link className="nav-link" style={isActive("/admin")} to="/admin">
                {isAuth().name}
              </Link>
            </Nav.Link>
          )}

          {isAuth() && isAuth().role === "subscriber" && (
            <Nav.Link>
              {" "}
              <Link
                to="/dashboard"
                className="nav-link"
                style={isActive("/dashboard")}
              >
                Dashboard
              </Link>
            </Nav.Link>
          )}

          {isAuth() && (
            <Nav.Link>
              {" "}
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "rgba(255, 255, 255, 0.7)" }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const nav = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <button className="btn btn-primary" id="menu-toggle">
        Toggle Menu
      </button>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link to="/" className="nav-link" style={isActive("/")}>
              Home
            </Link>
          </li>

          {!isAuth() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive("/signin")}
                >
                  Signin
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/signup"
                  className="nav-link"
                  style={isActive("/signup")}
                >
                  Signup
                </Link>
              </li>
            </Fragment>
          )}

          {isAuth() && isAuth().role === "admin" && (
            <li className="nav-item">
              <Link className="nav-link" style={isActive("/admin")} to="/admin">
                {isAuth().name}
              </Link>
            </li>
          )}

          {isAuth() && isAuth().role === "subscriber" && (
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link"
                style={isActive("/dashboard")}
              >
                Dashboard
              </Link>
            </li>
          )}

          {isAuth() && (
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#000" }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );

  return nav();
};

export default withRouter(NavMenu);
