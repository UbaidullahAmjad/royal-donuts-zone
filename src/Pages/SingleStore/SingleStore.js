/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import RightSide from "./Contents/RightContent/RightSide";
import "./SingleStore.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStore } from "../../redux/SingleStore/singleStoreActions";
import { Helmet } from "react-helmet";
import Skeleton from "@mui/material/Skeleton";
import RightSideSkeleton from "./Contents/RightContent/RightSideSkeleton";
import { Card, CardBody } from "reactstrap";
import { EccomSeoAction } from "../../redux/HomePage/Main/EccomSeoAction"

import SmallMap from "./Contents/RightContent/SmallMap";
import StoreHeader from "./Contents/Header/Header";
import ShopInformation from "./Contents/ShopInformation/ShopInformation";
import CopyRight from "../copy-right/CopyRight";
import backgroundImage from "../../assets/single_store_donuts.webp";
import StoreInstagram from "./Contents/StoreInstagram/StoreInstagram";
import { SIMPLE_URL, URL } from "../../env";

const InfoPage = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const location = useLocation();
  const params = location.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const store = useParams();
  const [loading, setLoading] = useState(false);

  const getStoreData = useSelector((state) => state.storeData);
  const storeContentList = getStoreData?.singleStoreContentList ?? [];
  const stores = storeContentList.length > 0
    ? storeContentList.find((item) => item.url_field == store.idd)?.single_store ?? null : null;
  const storeDays = storeContentList.length > 0
    ? storeContentList.find((item) => item.url_field == store.idd)?.store_days ?? [] : [];
  const storeImageGallery = storeContentList.length > 0
    ? storeContentList.find((item) => item.url_field == store.idd)?.store_image_gallery ?? [] : [];
  const instagramToken = storeContentList.length > 0
    ? storeContentList.find((item) => item.url_field == store.idd)?.insta_token ?? "" : "";
  const storeSEOTags = storeContentList.length > 0
    ? storeContentList.find((item) => item.url_field == store.idd)?.store_seo ?? null : null;
  const Eccom_SEO = useSelector((state) => state.getEccomSeo.eccomSeoData);

  useEffect(() => {
    if ((params == null || params.id == undefined) && store.idd == undefined) {
      navigate("/points-vente");
    } else {
      window.scrollTo(0, 0);

      const findStoreUrl = storeContentList.some((item) => item.url_field == store.idd)
      if (findStoreUrl == false) {
        dispatch(getStore(store.idd));
      }
    }
  }, [location]);

  useEffect(() => {
    let stores_list_page = window.location.pathname == "/points-vente/";
    const body_script = null;
    if (stores_list_page) {
      var no_script = document.getElementsByTagName("noscript")[0];
      no_script.innerHTML =
        storeSEOTags != null && storeSEOTags?.body != undefined &&
          storeSEOTags?.body != null &&
          storeSEOTags?.body != ""
          ? storeSEOTags?.body
          : storeSEOTags?.body
            ? storeSEOTags?.body
            : Eccom_SEO?.body_script;
    }
  }, [location]);

  return (
    <>
      {storeSEOTags != null && (
        <Helmet>
          <title>
            {storeSEOTags != null && storeSEOTags.meta_title != null
              ? storeSEOTags.meta_title
              : Eccom_SEO != null && Eccom_SEO?.meta_title != null
                ? Eccom_SEO.meta_title
                : "Royal Donuts"}
          </title>
          <meta
            property="og:description"
            content={
              storeSEOTags != null && storeSEOTags.meta_description != null
                ? storeSEOTags.meta_description
                : Eccom_SEO != null && Eccom_SEO?.meta_description != null
                  ? Eccom_SEO.meta_description
                  : ""
            }
          />

          {/* <meta property="og:head" content={storeSEOTags != null && storeSEOTags.head != null ? storeSEOTags.head : Eccom_SEO != null && Eccom_SEO?.head != null ? Eccom_SEO.head : ""} /> */}
          <script>
            {storeSEOTags != null && storeSEOTags.head != null
              ? storeSEOTags.head
              : Eccom_SEO != null && Eccom_SEO?.head != null
                ? Eccom_SEO.head
                : ""}
          </script>
          <link
            rel="stylesheet"
            href={
              storeSEOTags != null && storeSEOTags.canonical_url != null
                ? storeSEOTags?.canonical_url
                : Eccom_SEO != null && Eccom_SEO?.canonical_url != null
                  ? Eccom_SEO.canonical_url
                  : ""
            }
          />

          <meta
            property="og:robots_meta"
            content={
              storeSEOTags != null && storeSEOTags.robots_meta != null
                ? storeSEOTags.robots_meta
                : Eccom_SEO != null && Eccom_SEO?.robots_meta != null
                  ? Eccom_SEO.robots_meta
                  : ""
            }
          />
          {/* <meta property="og:body" content={storeSEOTags != null && storeSEOTags.robots_meta != null ? storeSEOTags.robots_meta :  Eccom_SEO != null && Eccom_SEO?.robots_meta != null ? Eccom_SEO.robots_meta : ""} /> */}
        </Helmet>
      )}

      <Header single_store={true} />
      {stores != null && (
        <div className="single_store__section">
          <div className="col-md-12 infoPageParent">
            {/* <p>{store?.header_image}</p> */}
            <div
              className="infoLeftCont___bg_image"
              style={
                stores?.header_image != null
                  ? {
                    backgroundImage: `url(${SIMPLE_URL}/images/Store/header/${stores.header_image})`,
                  }
                  : {
                    backgroundImage: `url(${backgroundImage})`,
                  }
              }
            >
              {/* <div className="info_bg_layer"></div> */}
              <StoreHeader stores={stores} />
            </div>
            <ShopInformation stores={stores} storeDays={storeDays} />
            <div className="container-fluid">
              <div className="row justify-content-center m-0">
                <div className="col-md-11">
                  <div className="row mb-5">
                    <div className="infoRightCont">
                      <div className="row m-0">
                        <div className="col-sm-12 col-md-12 col-lg-8 mt-4">
                          <div className="leftRow3 px-1">
                            <Card>
                              <CardBody>
                                <h5 className="leftRow3_desc">
                                  {trans(`Description`)}
                                </h5>
                                {stores != null ? (
                                  <article className="Article">
                                    <p
                                      className="leftRow3_para"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          stores != null &&
                                          stores.description_en,
                                      }}
                                    ></p>
                                  </article>
                                ) : (
                                  <article className="Article">
                                    <p>
                                      <Skeleton
                                        animation="wave"
                                        variant="text"
                                      />
                                    </p>
                                  </article>
                                )}
                              </CardBody>
                            </Card>
                            <Card style={{ marginTop: 10 }} id="myMap">
                              <CardBody>
                                <SmallMap stores={stores} />
                              </CardBody>
                            </Card>
                            {
                              instagramToken != "" && <Card style={{ marginTop: 20 }}>
                                <CardBody>
                                  {stores != null ? (
                                    <div className="LeftRow1">
                                      {instagramToken != "" && (
                                        <div
                                          style={{
                                            width: "100%",
                                          }}
                                        >
                                          <h3>{trans("Instagram")}</h3>
                                          <StoreInstagram
                                            instagramToken={instagramToken}
                                            limit={6}
                                            Loading={loading}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div style={{ marginTop: "100px" }}>
                                      <Skeleton
                                        variant="rectangular"
                                        width={500}
                                        height={40}
                                      />
                                    </div>
                                  )}
                                </CardBody>
                              </Card>
                            }
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-4 infoRightCont__right_side_store mt-4">
                          {stores != null ? (
                            <RightSide
                              stores={stores}
                              storeDays={storeDays}
                              trans={trans}
                            />
                          ) : (
                            <RightSideSkeleton />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <CopyRight />
    </>
  );
};
export default InfoPage;
