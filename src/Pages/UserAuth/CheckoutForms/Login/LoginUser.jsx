/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../../UserAuth.css";
import { Card, Button } from "react-bootstrap";
import Footer from "../../../../Components/Footer/Footer";
import Header from "../../../../Components/Header/Header";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserAuth.css";
import LoginUserForm from "./LoginUserForm";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpiryTime } from "../../../../redux/actions/tokenexpire";
import { isTokenAvailable } from "../../../../redux/actions/token";
import { useTranslation, } from "react-i18next";

const LoginUser = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  let pageRedirect = location.state ? location.state.page : null;
  let zipCode = location.state ? location.state.zipCode : null;
  let valueTime = location.state ? location.state.valueTime : null;
  let valueDateRange = location.state ? location.state.valueDateRange : null;
  let address = location.state ? location.state.address : null;
  let orderType = location.state ? location.state.orderType : null;
  let isCartFilled = location.state ? location.state.isCartFilled : false;

  useEffect(() => {
    dispatch(isTokenAvailable());
    dispatch(isTokenExpiryTime());
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid">
        <div className="user_auth__wrapped">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="p-3">
                <LoginUserForm
                  pageRedirect={pageRedirect}
                  zipCode={zipCode}
                  valueTime={valueTime}
                  valueDateRange={valueDateRange}
                  address={address}
                  orderType={orderType}
                  isCartFilled={isCartFilled}
                />
                <div className="user_switch_account">
                  <p>{trans("Don't have an Account?")}</p>
                  {pageRedirect !== undefined &&
                    pageRedirect !== null &&
                    pageRedirect == "checkout" ? (
                    <Button
                      onClick={() => {
                        navigate("/register", {
                          state: {
                            page: "checkout",
                            zipCode: zipCode,
                            valueTime: valueTime,
                            valueDateRange: valueDateRange,
                            address: address,
                            orderType: orderType,
                            isCartFilled: isCartFilled,
                          },
                        });
                      }}
                    >
                      {trans("Register")}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      {trans("Register")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;
