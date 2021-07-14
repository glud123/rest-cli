import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./route";
import Platform from "./platform";
import "./styles/index.less";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Platform>
        <RouteConfig />
      </Platform>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
