/* eslint-disable no-unused-expressions */
/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import getWindowDimensions from "../Hooks/useWindowDimensions";
import NavbarDesk from "./NavbarDesk";
import NavbarMobi from "./NavbarMobi/NavbarMobi";

const CompNavbar = (props) => {
  const trans = props.t;

  const { screenWidth, screenHeight } = getWindowDimensions();

  const navigate = useNavigate();

  // 992
  return <>{screenWidth < 992 ? <NavbarMobi /> : <NavbarDesk />}</>;
};

export default CompNavbar;
