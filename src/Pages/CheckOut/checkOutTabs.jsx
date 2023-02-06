/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./checkOut.css";
import CheckOutGuest from "./CheckOutGuest";
import CheckOutUser from "./CheckOutUser";
import secure from "../../assets/secure.webp";
import LoginUserForm from "../UserAuth/CheckoutForms/Login/LoginUserForm";
import RegisterUser from "../UserAuth/CheckoutForms/Register/RegisterUser";
import { TabContext, TabPanel } from "@mui/lab";
import { Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { isTokenAvailable } from "../../redux/Tokens/token";
import { useTranslation, } from "react-i18next";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import { Button } from "react-bootstrap";
import OrderSummary from "./Contents/OrderSummary";
import PaymentBox from "./PaymentMethod/PaymentBox";
import DeliveryDetail from "./Contents/DeliveryDetail";
import { Controller, useForm } from "react-hook-form";
import logo from "../../assets/royal_donuts_logo_checkout.webp";

var CryptoJS = require("crypto-js");

const checkOutTabs = (props) => {
    const { t } = useTranslation();
    const trans = t;
    const { isCartFilled, showGuestTabOnTabLogin } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        control,
        formState: { errors },
    } = useForm();

    const [loadingState, setLoadingState] = useState(false);

    const dispatch = useDispatch();
    dispatch(isTokenAvailable());
    const isTokenAvailableState = useSelector((state) => state.tokenAvailable)

    const [userId, setUserId] = useState(
        localStorage.getItem("user_id") != null
            ? localStorage.getItem("user_id")
            : ""
    );
    var bytes = CryptoJS.AES.decrypt("" + userId, "_#userid_");
    var user_id = null;
    if (bytes != null) {
        user_id = bytes.toString(CryptoJS?.enc?.Utf8);
    }

    const [proceedShipping, setProceedShipping] = useState(false);
    const handleProceedShipping = () => {
        setProceedShipping(!proceedShipping);
    };

    const [TabSwitch, setTabSwitch] = useState(1);
    const [tabValue, setTabValue] = useState(
        showGuestTabOnTabLogin != undefined ? 0 : 1
    );
    const handleCheckTab = (event, newValue) => {
        setTabValue(newValue);
        if (newValue == 0) {
            setTabSwitch(0);
        } else {
            setTabSwitch(1);
        }
    };

    const [loginTab, setLoginTab] = useState(true);

    const [active, setActive] = useState(null);
    const setActiveClass = (e) => {
        setActive(e.target.id);
    };

    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        let is_logged = localStorage.getItem("token");
        if (String(is_logged) != "null") {
            setLoginStatus(true);
        }
    }, []);

    return (
        <>
            <TabContext value={tabValue}>
                <div className="row">
                    <div className="col-12">
                        <div className="cart_rd_logo_wraper">
                            <img src={logo} alt="" />
                        </div>
                    </div>
                </div>
                <div className="row d-flex flex-direction-row tabs_header_main">
                    <div className="col-md-8 tabs_row p-0">
                        <Tabs
                            onChange={handleCheckTab}
                            TabIndicatorProps={{
                                style: { background: "#FF629500" },
                            }}
                            value={tabValue}
                            className="cartpage__box_tab TabContext__tab mt-2 tab_btns_responsive tabs_header"
                            aria-label="icon tabs example"
                        >
                            <Tab
                                className="tabs_btn_main"
                                icon={
                                    <span className="tabsBtn form_labels">
                                        {trans("Continue as User")}
                                    </span>
                                }
                                aria-label="shipping_part"
                            />

                            <Tab
                                className="tabs_btn_main"
                                icon={
                                    <span className="tabsBtn form_labels">
                                        {trans("Continue as Guest")}
                                    </span>
                                }
                                aria-label="final_part"
                                disabled={loginStatus == true}
                            />
                        </Tabs>
                    </div>
                    <div className="col-md-4">
                        <div className="checkout_secure_image_wrapper">
                            <img
                                className="img-fluid checkout_secure_image"
                                src={secure}
                                alt="secure"
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-7 col-lg-8 mb-3 ps-0 pe-md-2 pe-0">
                        <TabPanel value={0} className="tab_pane_checkout p-0">
                            <div className="checkout__options">
                                {!isTokenAvailableState ? (
                                    <div className="row justify-content-center m-0">
                                        <div className="col-12 col-sm-10 col-md-12 p-0 mt-4">
                                            <Card>
                                                {loginTab == true ? (
                                                    <CardContent>
                                                        <LoginUserForm
                                                            checkOut={true}
                                                            page={"checkout"}
                                                            isCartFilled={true}
                                                            setLoginStatus={setLoginStatus}
                                                        />
                                                        <div className="user_switch_account">
                                                            <p>
                                                                {trans("Don't have an Account?")}
                                                            </p>
                                                            <Button
                                                                onClick={() => setLoginTab(false)}
                                                            >
                                                                {trans("Register")}
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                ) : (
                                                    <CardContent>
                                                        <RegisterUser
                                                            checkOut={true}
                                                            page={"checkout"}
                                                            isCartFilled={true}
                                                            setLoginStatus={setLoginStatus}
                                                        />
                                                        <div className="user_switch_account">
                                                            <p>
                                                                {trans("Already have an Account?")}
                                                            </p>
                                                            <Button
                                                                onClick={() => setLoginTab(true)}
                                                            >
                                                                {trans("Login")}
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                )}
                                            </Card>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <CheckOutUser store={location.state.store} />
                                        <div className="user_payment_box">
                                            <PaymentBox
                                                setError={setError}
                                                type="user"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabPanel>

                        <TabPanel value={1} className="tab_pane_checkout">
                            <CheckOutGuest />
                            <div className="guest_payment_box">
                                <PaymentBox
                                    setError={setError}
                                    type="guest"
                                />
                            </div>
                        </TabPanel>
                    </div>
                    <div className="col-sm-12 col-md-5 col-lg-4 mb-3 p-0 mt-4">
                        <OrderSummary />
                        <DeliveryDetail />
                    </div>
                </div>
            </TabContext>
            <div className="payment_box_mix">
                <PaymentBox
                    setError={setError}
                    store={location.state.store}
                    type={tabValue == 0 ? "user" : "guest"}
                />
            </div>
        </>
    )
}

export default checkOutTabs