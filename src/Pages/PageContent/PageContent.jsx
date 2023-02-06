/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useTranslation, } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import Skeleton from "@mui/material/Skeleton";
import CopyRight from "../copy-right/CopyRight";
import { URL } from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { PageContentGetDataAction } from "../../redux/PageContent/PageContentAction"

const PageContent = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const location = useLocation();

  const params = useParams();
  const page_url = params?.url;

  const PageContentData = useSelector((state) => state.getPageContent)
  const PagesContentList = PageContentData?.pagesContentList ?? [];
  const PageContent = PagesContentList.length > 0 ? PagesContentList.find((page) => page.page_url == page_url)?.page : null;
  const PageSEOContent = PagesContentList.length > 0 ? PagesContentList.find((page) => page.page_url == page_url)?.page_seo : null;
  const Eccom_SEO = useSelector((state) => state.getEccomSeo.eccomSeoData);

  useEffect(() => {
    window.scrollTo(0, 0);

    const findPageUrl = PagesContentList.some((page) => page.page_url == page_url)
    if (findPageUrl == false) {
      dispatch(PageContentGetDataAction(page_url))
    }

  }, [location])

  useEffect(() => {
    let pages_path = window.location.pathname.includes("/pages/");
    const body_script = null;
    if (pages_path) {
      var no_script = document.getElementsByTagName("noscript")[0];
      no_script.innerHTML =
        PageSEOContent != null && PageSEOContent?.body != undefined &&
          PageSEOContent?.body != null &&
          PageSEOContent?.body != ""
          ? PageSEOContent?.body
          : PageSEOContent?.body
            ? PageSEOContent?.body
            : Eccom_SEO?.body_script;
    }
  }, [location]);

  return (
    <>
      {PageSEOContent != null && (
        <Helmet>
          <title>
            {PageSEOContent != null && PageSEOContent.meta_title != null
              ? PageSEOContent.meta_title
              : Eccom_SEO != null && Eccom_SEO?.meta_title != null
                ? Eccom_SEO.meta_title
                : "Royal Donuts"}
          </title>

          <meta
            property="og:description"
            content={
              PageSEOContent != null && PageSEOContent.meta_description != null
                ? PageSEOContent.meta_description
                : Eccom_SEO != null && Eccom_SEO?.meta_description != null
                  ? Eccom_SEO.meta_description
                  : ""
            }
          />

          {/* <meta property="og:head" content={PageSEOContent != null && PageSEOContent.head != null ? PageSEOContent.head : Eccom_SEO != null && Eccom_SEO?.head != null ? Eccom_SEO.head : ""} /> */}
          <script>
            {PageSEOContent != null && PageSEOContent.head != null
              ? PageSEOContent.head
              : Eccom_SEO != null && Eccom_SEO?.head != null
                ? Eccom_SEO.head
                : ""}
          </script>
          <link
            rel="stylesheet"
            href={
              PageSEOContent != null && PageSEOContent.canonical_url != null
                ? PageSEOContent?.canonical_url
                : Eccom_SEO != null && Eccom_SEO?.canonical_url != null
                  ? Eccom_SEO.canonical_url
                  : ""
            }
          />

          <meta
            property="og:robots_meta"
            content={
              PageSEOContent != null && PageSEOContent.robots_meta != null
                ? PageSEOContent.robots_meta
                : Eccom_SEO != null && Eccom_SEO?.robots_meta != null
                  ? Eccom_SEO.robots_meta
                  : ""
            }
          />
          {/* <meta property="og:body" content={PageSEOContent != null && PageSEOContent.robots_meta != null ? PageSEOContent.robots_meta :  Eccom_SEO != null && Eccom_SEO?.robots_meta != null ? Eccom_SEO.robots_meta : ""} /> */}
        </Helmet>
      )}

      <div>
        {PageContent != null && PageContent.status === "0" ||
          (PageContent != null && PageContent.status === "0" && PageContent.is_footer === 0) ? (
          <>
            <Navigate to="/" state={{ status: 8 }} replace />
          </>
        ) : (
          <>
            <Header />
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                fontFamily: "Poppins",
              }}
            >
              {PageContentData.loading == false ? (
                <Container style={{ marginTop: "5rem", marginBottom: "2rem" }}>
                  {PageContent != null && PageContent != "" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          (PageContent != null && PageContent.content_fr) || "",
                      }}
                    ></div>
                  ) : (
                    <div>
                      <h5>{trans("This Page have no Content")}</h5>
                    </div>
                  )}
                </Container>
              ) : (
                <Container style={{ marginTop: "5rem", marginBottom: "2rem" }}>
                  <Skeleton animation="wave" variant="text" width={"100%"} />
                  <Skeleton animation="wave" variant="text" width={"100%"} />
                  <Skeleton animation="wave" variant="text" width={"100%"} />
                  <Skeleton animation="wave" variant="text" width={"100%"} />
                </Container>
              )}
            </div>
            <div style={{ marginTop: "auto" }}>
              <Footer />
              <CopyRight />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PageContent;
