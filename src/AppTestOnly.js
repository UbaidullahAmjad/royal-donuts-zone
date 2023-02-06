/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
// import { firebase_app, auth0 } from "./data/config";
import { BrowserRouter, Switch, Route, useNavigate } from "react-router-dom";
import ConfigDB from "./data/customizer/config";
import {
  configureFakeBackend,
  authHeader,
  handleResponse,
} from "./services/fack.backend";

import TestPage from "./TestPage";

// setup fake backend
configureFakeBackend();

function AppTestOnly() {
  return (
    <Fragment>
      <BrowserRouter basename={`/`}>
        <Switch>
          <Route path={"/"} component={TestPage} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default AppTestOnly;
