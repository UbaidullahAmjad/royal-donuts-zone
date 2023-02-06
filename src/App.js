/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { Component, Fragment, useEffect, useState, createContext } from "react";
import "./assets/i18n/react_i18n_Config"
import "./App.css";
// import "./Components/GlobalScssSetting/Global_scss_setting.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";
import EcommerceApp from "./Components/AppEcommerce/EcommerceApp"

const App = () => {

  return (
    <>
      <div className="App">
        <EcommerceApp />
      </div>
    </>
  );
};

export default App;
