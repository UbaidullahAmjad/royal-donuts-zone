/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, createContext } from "react";
import Header from "./Contents/header/header";
import Products from "./Contents/Products/products";
import Configurator from "./Contents/Configurator/configurator";
import Store from "./Contents/Store/store";
import Testimonials from "./Contents/Testimonials/testimonials";
import Instagram from "./Contents/Instagram/Instagram";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import Skeleton from "@mui/material/Skeleton";
import CopyRight from "../copy-right/CopyRight";
import { getSettings } from "../../redux/homeSettings/homeSettingsActions";
import { Helmet } from "react-helmet";
import { URL } from "../../env";
import { EccomSeoAction } from "../../redux/HomePage/Main/EccomSeoAction"
import { HomeImagesAction } from "../../redux/HomePage/Main/HomeImagesAction"

export const HeaderContext = createContext();

const Main = (props) => {
  const { t, i18n } = useTranslation();
  const trans = t;
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const location = useLocation();
  const dispatch = useDispatch();

  const [status, setStatus] = useState(location?.state?.status ?? 0);
  const EccomSEO = useSelector((state) => state.getEccomSeo.eccomSeoData);
  const homeInstaToken = useSelector((state) => state.getHomeImages.homeImagesToken);
  const LoadingInsta = useSelector((state) => state.getHomeImages.loading);
  const homeSetting = useSelector((state) => state.getSettingsData.settings);

  useEffect(() => {
    if (EccomSEO == null) {
      dispatch(EccomSeoAction());
    }
    if (homeInstaToken == null) {
      dispatch(HomeImagesAction());
    }

    if (status === 8) {
      toast.warn(trans("The Page is Inactive"), {
        position: "top-right",
        autoClose: 2000,
      });
      setStatus(0);
    }
    if (homeSetting == null) {
      dispatch(getSettings());
    }
  }, [])

  useEffect(() => {
    let body_script = EccomSEO?.body_script;
    var no_script = document.getElementsByTagName("noscript")[0];
    no_script.innerHTML = body_script;
  }, [EccomSEO]);

  const [HeaderLoader, setHeaderLoader] = useState({
    image1: false,
    image2: false,
    image3: false,
    image4: false,
    image5: false,
  });

  return (
    <>
      {EccomSEO != null && (
        <Helmet>
          <title>{EccomSEO.meta_title && EccomSEO.meta_title != null ? EccomSEO.meta_title : "Royal Donuts"}</title>
          <meta
            name="description"
            property="og:description"
            content={EccomSEO?.meta_description}
          />
          {/* <meta name="head" property="og:head" content={EccomSEO.head} /> */}
          <script>{EccomSEO?.head}</script>
          <meta
            name="robots_meta"
            property="og:robots_meta"
            content={EccomSEO.robots_meta}
          />
          <link rel="stylesheet" href={EccomSEO.canonical_url} />
          {/* <script> {EccomSEO.body} </script> */}
        </Helmet>
      )}
      <div style={{ overflow: "hidden !important", width: "100%" }}>
        {/* <ToastContainer /> */}
        <HeaderContext.Provider value={{ HeaderLoader, setHeaderLoader }}>
          <Header />
        </HeaderContext.Provider>
        <Products />
        <div className="pt-4"></div>
        <Configurator />
        <Store />
        <Testimonials />
        <Instagram
          instagramToken={homeInstaToken}
          limit={6}
          Loading={LoadingInsta}
        />
        <Footer />
        <CopyRight />
      </div>
    </>
  );
};

export default Main;
