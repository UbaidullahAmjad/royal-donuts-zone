/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./UserAuth.css";
import { Card, Button } from "react-bootstrap";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpiryTime } from "../../redux/Tokens/tokenexpire";
import { isTokenAvailable } from "../../redux/Tokens/token";
import { useTranslation, } from "react-i18next";
import CopyRight from "../copy-right/CopyRight";

const Login = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const {
    pageRedirect,
    zipCode,
    valueTime,
    valueDateRange,
    address,
    orderType,
    isCartFilled,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(isTokenAvailable());
    dispatch(isTokenExpiryTime());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="user_auth__wrapped">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-6 col-lg-6">
              <Card className="p-3">
                <h4 className="text-center">{trans("User Login")}</h4>
                <LoginForm />
                <div className="user_switch_account">
                  <p>{trans("Don't have an Account?")}</p>
                  <Button
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    {trans("Register")}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CopyRight />
    </>
  );
};

export default Login;
