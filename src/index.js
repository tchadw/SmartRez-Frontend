// import React from 'react';
// import ReactDOM from 'react-dom';
// import Routes from './Routes';

// ReactDOM.render(<Routes />, document.getElementById('root'));

import React from "react";
import ReactDOM, { hydrate, render } from "react-dom";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<Routes />, rootElement);
} else {
  render(<Routes />, rootElement);
}
