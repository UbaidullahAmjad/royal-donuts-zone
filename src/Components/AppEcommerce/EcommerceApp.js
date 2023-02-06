/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import "../../App.css";
import "../GlobalScssSetting/Global_scss_setting.scss";
import EcommerceAppContext from "./EcommerceAppContext";
import AppContextProvider from "./AppContextProvider";
import "../../fonts/Poppins/Poppins.ttf";
import "../../fonts/Poppins/Poppins-Bold.ttf";
import "../../fonts/Poppins/Poppins-Black.ttf";
import "../../fonts/Poppins/Poppins-Black.ttf";
import "../../fonts/JellyDonuts.woff";
import { useDispatch, useSelector } from "react-redux";
import { isTokenAvailable } from "../../redux/Tokens/token";
import { EccomSeoAction } from "../../redux/HomePage/Main/EccomSeoAction"
import { getSettings } from "../../redux/homeSettings/homeSettingsActions";
import { DashboardDataAction, DashboardLogoutAction } from "../../redux/Dashboard/DashboardDataAction"
import { checkoutFormFill_Clear } from "../../redux/CheckOut/checkOutFormAction";
import { ThemeProvider, createTheme } from '@mui/material'

const EcommerceApp = () => {
  const dispatch = useDispatch();
  const getFontLoader = useContext(AppContextProvider);

  const [isLoadedPoppins, setIsLoadedPoppins] = useState(getFontLoader.FontLoadedPoppins)
  const [isLoadedPoppinsBold, setIsLoadedPoppinsBold] = useState(getFontLoader.FontLoadedPoppinsBold)
  const [isLoadedPoppinsBlack, setIsLoadedPoppinsBlack] = useState(getFontLoader.FontLoadedPoppinsBlack)
  const [isLoadedJellyDonuts, setIsLoadedJellyDonuts] = useState(getFontLoader.FontLoadedJellyDonuts)

  const fontLoader = {
    FontLoadedPoppins: isLoadedPoppins,
    FontLoadedPoppinsBold: isLoadedPoppinsBold,
    FontLoadedPoppinsBlack: isLoadedPoppinsBlack,
    FontLoadedJellyDonuts: isLoadedJellyDonuts,
  }

  useEffect(() => {
    var FontFaceObserver = require("font-face-observer");
    var observerPoppins = new FontFaceObserver("Poppins", {});
    observerPoppins.check(null, 8000).then(
      function () {
        setIsLoadedPoppins(true)
      },
      function () {
        setIsLoadedPoppins(true)
      }
    );

    var observerPoppinsBold = new FontFaceObserver("Poppins-Bold", {});
    observerPoppinsBold.check(null, 8000).then(
      function () {
        setIsLoadedPoppinsBold(true);
      },
      function () {
        setIsLoadedPoppinsBold(true);
      }
    );

    var observerPoppinsBlack = new FontFaceObserver("Poppins-Black", {});
    observerPoppinsBlack.check(null, 8000).then(
      function () {
        setIsLoadedPoppinsBlack(true);
      },
      function () {
        setIsLoadedPoppinsBlack(true);
      }
    );

    var observerJellyDonuts = new FontFaceObserver("JellyDonuts", {});
    observerJellyDonuts.check(null, 8000).then(
      function () {
        // console.log('JellyDonuts - Font is available');
        setIsLoadedJellyDonuts(true);
      },
      function () {
        // console.log('JellyDonuts - Font is not available after waiting 8 seconds');
        setIsLoadedJellyDonuts(true);
      }
    );
  }, [])

  dispatch(isTokenAvailable());
  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);
  const DashboardDataCheck = useSelector((state) => state.getDashboardData.dashboardData?.user ?? null)

  const Eccom_SEO = useSelector((state) => state.getEccomSeo.eccomSeoData);

  const homeSetting = useSelector((state) => state.getSettingsData.settings);

  useEffect(() => {
    if (isTokenAvailableState == false) {
      if (window.location.pathname == "/") {
        dispatch(checkoutFormFill_Clear());
      }
      if (DashboardDataCheck != null) {
        dispatch(DashboardLogoutAction())
      }
    }
  }, [isTokenAvailableState])

  useEffect(() => {
    if (Eccom_SEO == null) {
      dispatch(EccomSeoAction());
    }

    if (homeSetting == null) {
      dispatch(getSettings());
    }
  }, []);

  const defaultMaterialTheme = createTheme();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <AppContextProvider.Provider value={fontLoader}>
        <EcommerceAppContext />
      </AppContextProvider.Provider>
    </ThemeProvider>
  )
}

export default EcommerceApp