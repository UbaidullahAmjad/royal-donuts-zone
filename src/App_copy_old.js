/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Application from "./components/app";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { routes } from "./route";
import ConfigDB from "./data/customizer/config";

// Signin page
import Signin from "./auth/signin";
import BeforeLead from "./components/crm/Before-lead/BeforeLead";
import { classes } from "./data/layouts";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { isTokenExpiryTime } from "./redux/tokens/tokenexpire/action";
import { isTokenAvailable } from "./redux/tokens/token/action";


function App() {
  const [anim, setAnim] = useState("");
  const animation =
    localStorage.getItem("animation") ||
    ConfigDB.data.router_animation ||
    "fade";
  const abortController = new AbortController();
  const [currentUser, setCurrentUser] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const jwt_token = localStorage.getItem("token");
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  const dispatch = useDispatch();
  dispatch(isTokenAvailable());
  dispatch(isTokenExpiryTime());

  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);

  // useEffect(() => {
  //   console.log(
  //     "----------- isTokenAvailableState -----------: ",
  //     isTokenAvailableState
  //   );

  //   const requestOptions = { method: "GET", headers: authHeader() };
  //   fetch("/users", requestOptions).then(handleResponse);
  //   setAnim(animation);
  //   firebase_app.auth().onAuthStateChanged(setCurrentUser);
  //   setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
  //   console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
  //   console.disableYellowBox = true;
  //   return function cleanup() {
  //     abortController.abort();
  //   };
  //   // eslint-disable-next-line
  // }, []);

  // const LOGIN_CHECK_IN_EVERY_SECOND_MS = 1000;
  // useEffect(() => {
  // /** Automatically redirect to login page when the token expired. */
  //   const loginCheckInterval = setInterval(() => {
  //     // console.log(
  //     //   "----------- isTokenAvailableState -----------: ",
  //     //   isTokenAvailableState
  //     // );
  //     if (isTokenAvailableState == false) {
  //       if (!window.location.pathname.includes('login')) {
  //         console.log( "main----- isTokenAvailableState -----: ", isTokenAvailableState );
  //         window.location.href = `${process.env.PUBLIC_URL}/login`;
  //       }
  //     }
  //   }, LOGIN_CHECK_IN_EVERY_SECOND_MS);

  //   // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  //   return () => clearInterval(loginCheckInterval); 
  // }, [isTokenAvailableState, LOGIN_CHECK_IN_EVERY_SECOND_MS])

  useEffect(() => {
    /** When any action perform then redirect to login page when the token expired. */
    console.log(
      "----------- isTokenAvailableState -----------: ",
      isTokenAvailableState
    );

    if (isTokenAvailableState == false) {
      if (!window.location.pathname.includes('login')) {
        window.location.href = `${process.env.PUBLIC_URL}/login`;
      }
    }
  }, [isTokenAvailableState]);

  return (
    <Fragment>
      {/* <Auth0Provider
        domain={auth0.domain}
        clientId={auth0.clientId}
        redirectUri={auth0.redirectUri}
      > */}
      {/* <Provider store={store}> */}
      <BrowserRouter basename={`/`}>
        <Routes>
          {isTokenAvailableState === false && (
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              element={<Signin />}
            />
          )}

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/before-lead`}
            element={<BeforeLead />}
          />

          {isTokenAvailableState === true && (
            <Application>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                render={() => {
                  return (
                    <Navigate
                      to={
                        atob(localStorage.getItem("role")) ==
                          "Supplier_Customer"
                          ? (window.location.href = `${process.env.PUBLIC_URL}/customer-suppliers/customerSuppliers/${layout}`)
                          : (window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/${layout}`)
                      }
                      replace
                    />
                  );
                }}
              />
              <TransitionGroup>
                {routes.map(({ path, Component }) => (
                  <Route
                    key={path}
                    exact
                    path={`${process.env.PUBLIC_URL}${path}`}
                  >
                    {({ match }) => (
                      <CSSTransition
                        in={match != null}
                        timeout={100}
                        classNames={anim}
                        unmountOnExit
                      >
                        <div>
                          <Component />
                        </div>
                      </CSSTransition>
                    )}
                  </Route>
                ))}
              </TransitionGroup>
            </Application>
          )}

          {window.location.href.indexOf(`${process.env.PUBLIC_URL}/login`) >
            -1 &&
            isTokenAvailableState === true &&
            (atob(localStorage.getItem("role")) == "Supplier_Customer"
              ? (window.location.href = `${process.env.PUBLIC_URL}/customer-suppliers/customerSuppliers/${layout}`)
              : (window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/${layout}`))}
          {window.location.href.indexOf(
            `${process.env.PUBLIC_URL}/dashboard/default/${layout}`
          ) > -1 &&
            isTokenAvailableState === false && (
              <Navigate
                to={(window.location.href = `${process.env.PUBLIC_URL}/login`)}
                replace
              />
            )}
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            render={() => {
              return (
                isTokenAvailableState === false && (
                  <Navigate
                    to={
                      (window.location.href = `${process.env.PUBLIC_URL}/login`)
                    }
                    replace
                  />
                )
              );
            }}
          />
        </Routes>

        {/* When no route found.  */}
        {/* <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Ooops! This Route not found....</p>
            </main>
          }
        /> */}
      </BrowserRouter>
      {/* </Provider> */}
      {/* </Auth0Provider> */}
    </Fragment>
  );
}

export default App;
