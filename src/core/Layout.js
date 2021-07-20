import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import $ from "jquery";

import Sidebar from "./Sidebar";
import NavMenu from "./NavMenu";

import "../nav.css";
import "../sidebar.css";

const Layout = ({ children, match, history }) => {
  useEffect(() => {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  });

  return (
    <div className="d-flex layout-container" id="wrapper">
      <Sidebar />

      <div id="page-content-wrapper">
        <NavMenu />
        <div className="container-fluid layout-children">{children}</div>
      </div>
    </div>
  );
};

export default withRouter(Layout);
