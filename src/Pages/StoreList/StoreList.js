/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import CopyRight from "../copy-right/CopyRight";
import LeftColumn from "./Contents/LeftColumn";
import "./Storelist.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Helmet } from "react-helmet";
import { URL } from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { EccomSeoAction } from "../../redux/HomePage/Main/EccomSeoAction"

const StoreList = () => {
  const dispatch = useDispatch();
  // const [EccomSEO, setEccomSEO] = useState(null);
  const EccomSEO = useSelector((state) => state.getEccomSeo.eccomSeoData);

  useEffect(() => {
    // window.scrollTo(0, 0);
    window.scrollTo(0, 0);
    if (EccomSEO == null) {
      dispatch(EccomSeoAction());
    }
  }, [])

  useEffect(() => {
    let body_script = EccomSEO?.body_script;
    var no_script = document.getElementsByTagName("noscript")[0];
    no_script.innerHTML = body_script;
  }, [EccomSEO]);

  return (
    <>
      {EccomSEO != null && (
        <Helmet>
          <title>
            {EccomSEO.meta_title && EccomSEO.meta_title != null
              ? EccomSEO.meta_title
              : "Royal Donuts"}
          </title>
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
      <Header />
      <div className="storelistMain">
        <LeftColumn />
      </div>
      <Footer />
      <CopyRight />
    </>
  );
};

export default StoreList;
