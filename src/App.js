/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import I18Config from "./assets/i18n";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Application from "./components/app";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { routes } from "./route";
import ConfigDB from "./data/customizer/config";
// Signin page
import Signin from "./auth/signin";
import EmailVerification from "./auth/EmailVerification";
import ChangePassword from "./auth/ChangePassword";
import BeforeLead from "./components/crm/Before-lead/BeforeLead";
import SupplierOrderTokenVerification from "./Pages/SupplierCustomer/CustomerOrders/Modify/SupplierOrderTokenVerification";
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

  const params = useParams();
  const dispatch = useDispatch();
  dispatch(isTokenAvailable());
  dispatch(isTokenExpiryTime());

  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);

  //   // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  //   return () => clearInterval(loginCheckInterval);
  // }, [isTokenAvailableState, LOGIN_CHECK_IN_EVERY_SECOND_MS])

  const supplierOrderModifyRoute = window.location.pathname.includes("/supplier/customer/order/modify/");

  useEffect(() => {
    /** When any action perform then redirect to login page when the token expired. */

    // window.location.pathname.includes("/supplier/customer/order/modify/")
    if (isTokenAvailableState == false) {
      if (!window.location.pathname.includes("/change/password/")
        && !window.location.pathname.includes("/supplier/customer/order/modify/")) {
        if (!window.location.pathname.includes("login")) {
          window.location.href = `${process.env.PUBLIC_URL}/login`;
        }
      }
    }
  }, [isTokenAvailableState]);

  return (
    <Fragment>
      {/* <I18Config /> */}
      <BrowserRouter basename={`/`}>
        <Routes>
          {isTokenAvailableState === false && (
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              element={<Signin />}
            />
          )}

          {isTokenAvailableState === false && (
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/email/verification`}
              element={<EmailVerification />}
            />
          )}

          {isTokenAvailableState === false && (
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/change/password/:token/:id`}
              element={<ChangePassword />}
            />
          )}

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/before-lead`}
            element={<BeforeLead />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/supplier/customer/order/modify/:order_id/:supplier_id/:customer_id`}
            element={<SupplierOrderTokenVerification />}
          />
        </Routes>

        {isTokenAvailableState === true && !supplierOrderModifyRoute && (
          <Application>
            <Routes>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                render={() => {
                  return (
                    <Navigate
                      to={
                        atob(localStorage.getItem("role")) ==
                          "Supplier_Customer"
                          ? (window.location.href = `${process.env.PUBLIC_URL}/suppliers/customer/products/list`)
                          : (window.location.href = `${process.env.PUBLIC_URL}/dashboard/default`)
                      }
                      replace
                    />
                  );
                }}
              />
            </Routes>

            <TransitionGroup>
              <Routes>
                {routes.map(({ path, Component }) => (
                  <Route
                    key={path}
                    exact
                    path={`${process.env.PUBLIC_URL}${path}`}
                    element={<Component />}
                  ></Route>
                ))}
              </Routes>
            </TransitionGroup>
          </Application>
        )}

        <Routes>
          {window.location.href.indexOf(`${process.env.PUBLIC_URL}/login`) >
            -1 &&
            isTokenAvailableState === true &&
            (atob(localStorage.getItem("role")) == "Supplier_Customer"
              ? (window.location.href = `${process.env.PUBLIC_URL}/suppliers/customer/products/list`)
              : (window.location.href = `${process.env.PUBLIC_URL}/dashboard/default`))}
          {window.location.href.indexOf(
            `${process.env.PUBLIC_URL}/dashboard/default`
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
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
