/* eslint-disable no-unused-expressions */
/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import "./NavbarMobi.css";
import "../navbar.css";
import { Button } from "@mui/material";
import { Nav, Navbar, Dropdown, NavDropdown, Container } from "react-bootstrap";
import { AccordionNavbar } from "./AccordionNavbar";
import { ReactComponent as CartIcon } from "../../../assets/Cart.svg";
import getDeviceType from "../../Hooks/useDeviceDetector";
import getWindowDimensions from "../../Hooks/useWindowDimensions";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { checkoutFormUserData_Clear, checkoutFormFill_Clear } from "../../../redux/CheckOut/checkOutFormAction"
import { ClearCheckoutGetUserDataAction } from "../../../redux/CheckOut/CheckOutUser/CheckoutGetUserAction";

import { useTranslation, Trans } from "react-i18next";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useDispatch, useSelector } from "react-redux";
import en from "../../../assets/lang/en.json";
import fr from "../../../assets/lang/fr.json";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { isTokenExpiryTime } from "../../../redux/Tokens/tokenexpire";
import { isTokenAvailable } from "../../../redux/Tokens/token";
import NavbarCart from "../NavbarCart";
import styles from "./HeadNavbar2.module.css";
import { ScrollPositionContext } from "../../../App";
import axios from "axios";
import Cookies from "universal-cookie";
import { URL } from "../../../env";

var CryptoJS = require("crypto-js");
var cookies = new Cookies();
var isCookieAllow_Encrypted = cookies.get("is_cookie_allow");
var bytesIsCookieAllow = CryptoJS.AES.decrypt(
  isCookieAllow_Encrypted ? isCookieAllow_Encrypted : "no_value",
  "#is_cookie_allow"
);
var isCookieAllowDecode = false;
try {
  isCookieAllowDecode =
    bytesIsCookieAllow != null &&
    bytesIsCookieAllow != undefined &&
    bytesIsCookieAllow?.toString().length > 0 &&
    JSON.parse(bytesIsCookieAllow?.toString(CryptoJS?.enc?.Utf8));
} catch (e) {
  console.log("ERROIR ---------", e);
}

const Item = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&:hover": {
    backgroundColor: blue[700],
  },
}));

const blue = {
  500: "#f36292",
  600: "#C25C7C",
  700: "#C25C7C",
};

const CustomButtonRoot = styled(Button)({
  fontFamily: "JellyDonuts",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: `${blue[500]}`,
  padding: "0px 24px",
  borderRadius: "25px",
  marginRight: "10px",
  color: "white",
  transition: "all 150ms ease",
  cursor: "pointer",
  border: "none",

  "&:hover": {
    backgroundColor: `${blue[600]}`,
    borderColor: `${blue[600]}`,
    boxShadow: "none",
  },

  "&:active": {
    boxShadow: "none",
    backgroundColor: `${blue[700]}`,
    borderColor: `${blue[700]}`,
  },

  "&:focus": {
    boxShadow: `0 0 0 0.2rem ${blue[500]}`,
  },
});

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

const NavbarMobi = (props) => {
  const { t, i18n } = useTranslation();
  const trans = t;

  const homeSetting = useSelector((state) => state.getSettingsData.settings);

  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [ShowNavbarCart, setShowNavbarCart] = useState(false);
  const { deviceType } = getDeviceType();
  const { screenWidth, screenHeight } = getWindowDimensions();
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [bottomCartBtnMargin, setBottomCartBtnMargin] = useState(0);

  // OPEN SIDEBAR
  const [openNav, setOpenNav] = useState(false);
  // Change Navbar Bg Color on Scroll
  const [navBar, setNavBar] = useState(false);

  const navBarBg = () => {
    if (window.scrollY >= 10) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  const handleSetLanguage = () => {
    if (i18n.language == "en") {
      // console.log("language_fr");
      if (isCookieAllowDecode == true) {
        const cookie_expires_date = new Date();
        cookie_expires_date.setFullYear(new Date().getFullYear() + 1);
        cookies.set("language_cookie", "fr", {
          path: "/",
          expires: cookie_expires_date,
        });
      }
      i18n.changeLanguage("fr");
      setSelectedLang("fr");
    } else {
      // console.log("language_en");
      if (isCookieAllowDecode == true) {
        const cookie_expires_date = new Date();
        cookie_expires_date.setFullYear(new Date().getFullYear() + 1);
        cookies.set("language_cookie", "en", {
          path: "/",
          expires: cookie_expires_date,
        });
      }
      i18n.changeLanguage("en");
      setSelectedLang("en");
    }
  };

  const navigate = useNavigate();
  let products = useSelector((state) => state.myProductsCart.cartItems);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    setScrollYPosition(scrolled);
    if (window.location.pathname.includes("/produit/")) {
      console.log(
        "navbar-path",
        window.location.pathname.includes("/produit/")
      );
      if (scrolled >= 0.24) {
        setBottomCartBtnMargin(50);
      } else {
        setBottomCartBtnMargin(0);
      }
    } else {
      setBottomCartBtnMargin(0);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setSelectedLang(i18n.language);
    window.addEventListener("scroll", listenToScroll);
    window.addEventListener("scroll", navBarBg);

    return () => {
      window.addEventListener("scroll", listenToScroll);
    };
  }, []);

  useEffect(() => {
    if (openNav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [openNav]);

  dispatch(isTokenAvailable());
  dispatch(isTokenExpiryTime());
  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);

  const url_symbol = window.location.pathname;

  let defaultHomeBGColor =
    "linear-gradient(90deg, rgba(245,145,178,1) 0%, rgba(240,91,140,1) 50%, rgba(236,56,115,1) 100%)";
  const [HomeBGColor, setHomeBGColor] = useState(defaultHomeBGColor);

  useEffect(() => {
    getHomeSettings();
  }, []);

  const getHomeSettings = async () => {
    await axios
      .post(`${URL}/general_home_setting`)
      .then((response) => {
        setHomeBGColor(response.data.setting.background_color);
      })
      .catch((error) => {
        console.log("erorror", error);
      });
  };

  return (
    <>
      {openNav && (
        <div
          className="mobi_navbar_menus_overlay"
          onClick={() => {
            setOpenNav(!openNav);
            setShowNavbarCart(false);
          }}
        ></div>
      )}
      <div>
        <nav
          className={styles.D_navbar}
          style={{
            background:
              HomeBGColor != null && HomeBGColor != ""
                ? `linear-gradient(90deg, ${HomeBGColor}A0 0%, ${HomeBGColor}D0 50%, ${HomeBGColor} 100%)`
                : defaultHomeBGColor,
          }}
        >
          <div className="container" style={{ height: "100%" }}>
            <div className={styles.inner}>
              {/* LOGO */}
              <div className={styles.logo}>
                <Navbar.Brand
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="/images/royal_donuts_logo.png"
                    height={50}
                    alt=""
                    id="logo_image"
                  />
                </Navbar.Brand>
              </div>

              <div
                className={
                  openNav
                    ? `${styles.links} ${styles.active}`
                    : `${styles.links}`
                }
                style={{
                  background: `linear-gradient(90deg, ${homeSetting?.background_color + "f9"
                    } 0%, ${homeSetting?.background_color + "e6"} 50% ,${homeSetting?.background_color + "a0"
                    } 100%)`,
                }}
              >
                <div className="mobi_navbar_menu_top_items">
                  {isTokenAvailableState && (
                    <>
                      <div
                        className="mb_navbar_items_box"
                        style={{ marginBottom: 0 }}
                      >
                        <p
                          className="mb_navbar_items disabled"
                          style={{ cursor: "default" }}
                        >
                          {localStorage.getItem("name")}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className={`mobi_navbar_items_wrapper`}>
                  {/* Item */}
                  <div className="mb_navbar_items_box">
                    <KeyboardArrowRightIcon className={"arrow_icon"} />
                    <p
                      className="mb_navbar_items"
                      onClick={() => navigate("/produits")}
                    >
                      {trans("Our Products")}
                    </p>
                  </div>

                  {/* Item */}
                  <div className="mb_navbar_items_box">
                    <KeyboardArrowRightIcon className={"arrow_icon"} />
                    <p
                      className="mb_navbar_items"
                      onClick={() => navigate("/points-vente")}
                    >
                      {trans("Points of Sale")}
                    </p>
                  </div>

                  {isTokenAvailableState ? (
                    <>
                      <div className="mb_navbar_items_box">
                        <KeyboardArrowRightIcon className={"arrow_icon mt-2"} />
                        <AccordionNavbar
                          className="mb_navbar_dropdown"
                          open={1}
                        >
                          <AccordionNavbar.Item>
                            <AccordionNavbar.Header>
                              <Dropdown.Toggle
                                as={AccountCircleIcon}
                                id="dropdown-custom-components"
                                className="nav_user_icon"
                              >
                                {trans("User Profile")}
                              </Dropdown.Toggle>
                            </AccordionNavbar.Header>
                            <AccordionNavbar.Body>
                              <div className="mb_navbar_items_box">
                                <KeyboardArrowRightIcon
                                  className={"arrow_icon"}
                                />
                                <p
                                  className="mb_navbar_items"
                                  onClick={() => navigate("/dashboard")}
                                >
                                  {trans("Dashboard")}
                                </p>
                              </div>
                              <div className="mb_navbar_items_box">
                                <KeyboardArrowRightIcon
                                  className={"arrow_icon"}
                                />
                                <p
                                  className="mb_navbar_items"
                                  onClick={() => {
                                    localStorage.removeItem("user_id");
                                    localStorage.removeItem("token");
                                    localStorage.removeItem(
                                      "token_expiry_time"
                                    );
                                    localStorage.removeItem("name");
                                    dispatch(isTokenAvailable());
                                    dispatch(isTokenExpiryTime());
                                    dispatch(checkoutFormUserData_Clear());
                                    dispatch(checkoutFormFill_Clear());
                                    dispatch(ClearCheckoutGetUserDataAction());
                                    localStorage.removeItem("user_temp");
                                    localStorage.clear();

                                    setTimeout(function () {
                                      dispatch(isTokenAvailable());
                                      dispatch(isTokenExpiryTime());
                                    }, 1000);
                                  }}
                                >
                                  {trans("Logout")}
                                </p>
                              </div>
                            </AccordionNavbar.Body>
                          </AccordionNavbar.Item>
                        </AccordionNavbar>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb_navbar_items_box">
                        <KeyboardArrowRightIcon className={"arrow_icon"} />
                        <p
                          className="mb_navbar_items"
                          onClick={() => navigate("/login")}
                        >
                          {trans("Login")}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="mb_navbar_items_box">
                    <KeyboardArrowRightIcon className={"arrow_icon"} />
                    <p className="mb_navbar_items" onClick={handleSetLanguage}>
                      {i18n.language == "fr" ? "FR" : "EN"}
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: 40,
                  marginTop: 4,
                }}
              >
                {/* Show on Mobile Devices */}
                {screenWidth > 768 && screenWidth < 992 && (
                  <span
                    className="prod_cart_box_wrapper mt-2 me-2"
                    onMouseEnter={() =>
                      deviceType == "Desktop" && setShowNavbarCart(true)
                    }
                    onMouseLeave={() => setShowNavbarCart(false)}
                    onClick={() =>
                      deviceType == "Mobile" &&
                      setShowNavbarCart(!ShowNavbarCart)
                    }
                    style={{
                      marginBottom: bottomCartBtnMargin,
                      // bottom:
                      //   scrollPostion?.scrollPostionValue >= 0.18 ? 8 : 68,
                    }}
                  >
                    <span className="prod_cart_box">
                      <span className="prod_cart_box_icon_box">
                        <ShoppingBasketIcon className="prod_cart_box_icon" />
                      </span>
                      <span className="prod_cart_item_count">
                        {Array.isArray(products)
                          ? products.length > 0
                            ? products.reduce(
                              (prev, current) => prev + current.quantity,
                              0
                            )
                            : 0
                          : "0"}
                      </span>
                      {ShowNavbarCart == true && (
                        <NavbarCart
                          screenWidth={screenWidth}
                          deviceType={deviceType}
                          productLength={
                            products.length > 0 ? products.length : 0
                          }
                          opacity={ShowNavbarCart ? 1 : 0}
                        />
                      )}
                    </span>
                  </span>
                )}
              </div>

              {/* HAMBURGER */}
              <div
                className={styles.hamburger}
                onClick={() => setOpenNav(!openNav)}
              >
                <input className={styles.checkbox} type="checkbox" />
                <div
                  className={
                    openNav
                      ? `${styles.hamburger_lines} ${styles.active}`
                      : `${styles.hamburger_lines}` && navBar
                        ? `${styles.hamburger_lines} ${styles.color_active}`
                        : `${styles.hamburger_lines}`
                  }
                >
                  <span
                    className={`${styles.line} ${styles.line1}`}
                    style={{ background: "#fff" }}
                  ></span>
                  <span
                    className={`${styles.line} ${styles.line2}`}
                    style={{ background: "#fff" }}
                  ></span>
                  <span
                    className={`${styles.line} ${styles.line3}`}
                    style={{ background: "#fff" }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Show on Mobile Devices */}

      {screenWidth < 769 && ShowNavbarCart == true && (
        <div
          className="prod_cart_box_overlay"
          onClick={() => setShowNavbarCart(false)}
        >
          {" "}
        </div>
      )}
      {screenWidth < 769 && (
        <span
          className="prod_cart_box_wrapper mt-2 me-2"
          style={
            url_symbol.includes(`/produit/`) ? { bottom: 68 } : { bottom: 8 }
          }
        >
          <span
            className="prod_cart_box"
            onClick={() => setShowNavbarCart(!ShowNavbarCart)}
          >
            <span className="prod_cart_box_icon_box">
              <ShoppingBasketIcon className="prod_cart_box_icon" />
            </span>
            <span className="prod_cart_item_count">
              {Array.isArray(products)
                ? products.length > 0
                  ? products.reduce(
                    (prev, current) => prev + current.quantity,
                    0
                  )
                  : 0
                : "0"}
            </span>
          </span>
          {ShowNavbarCart == true && (
            <NavbarCart
              screenWidth={screenWidth}
              deviceType={deviceType}
              productLength={products.length > 0 ? products.length : 0}
              opacity={ShowNavbarCart ? 1 : 0}
            />
          )}
        </span>
      )}
    </>
  );
};

export default NavbarMobi;
