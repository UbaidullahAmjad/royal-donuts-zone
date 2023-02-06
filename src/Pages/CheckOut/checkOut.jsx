/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./checkOut.css";
import { useTranslation, } from "react-i18next";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import CopyRight from "../copy-right/CopyRight";
import { ArrowBack } from "@material-ui/icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckOutTabs from "./checkOutTabs";

const checkOut = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const isCartFilled = location.state ? location.state.isCartFilled : false;
  const showGuestTabOnTabLogin =
    location.state && location.state.showGuestTabOnTabLogin;


  return (
    <>
      {isCartFilled === true ? (
        <>
          <div
            className="top_back_to_shipping_btn"
            onClick={() => navigate("/produits", { replace: true })}
          >
            <ArrowBackIcon className="icon" />
          </div>
          <div className="container-fluid">
            <div className="checkout__page_wrapped">
              <div className="row m-0 justify-content-center">
                <div className="col-sm-12 col-md-11 col-lg-10">
                  <div className="backBtn_config_cartPage col-12">
                    <button className="arrow_back_cartPage">
                      <ArrowBack
                        onClick={() => navigate("/cart")}
                        style={{ cursor: "pointer" }}
                      />
                    </button>
                  </div>
                  <CheckOutTabs isCartFilled={isCartFilled} showGuestTabOnTabLogin={showGuestTabOnTabLogin} />
                </div>
              </div>
            </div>
          </div>
          <CopyRight />
        </>
      ) : (
        <Navigate to="/cart" replace />
      )}
    </>
  );
};

export default checkOut;
