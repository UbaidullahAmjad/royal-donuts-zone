/* eslint-disable no-unused-expressions */
/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import "./navbar.css";
import { Button } from "@mui/material";
import { Nav, Navbar, Dropdown, NavDropdown, Container } from "react-bootstrap";
import { ReactComponent as CartIcon } from "../../assets/Cart.svg";
import getDeviceType from "../Hooks/useDeviceDetector";
import getWindowDimensions from "../Hooks/useWindowDimensions";

import { useTranslation, Trans } from "react-i18next";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { isTokenExpiryTime } from "../../redux/Tokens/tokenexpire";
import { isTokenAvailable } from "../../redux/Tokens/token";
import { DashboardLogoutAction } from "../../redux/Dashboard/DashboardDataAction"
import { checkoutFormUserData_Clear, checkoutFormFill_Clear } from "../../redux/CheckOut/checkOutFormAction"
import { ClearCheckoutGetUserDataAction } from "../../redux/CheckOut/CheckOutUser/CheckoutGetUserAction";
import NavbarCart from "./NavbarCart";
import Cookies from "universal-cookie";
import { Brightness1 } from "@material-ui/icons";
import { SIMPLE_URL } from "../../env";

var CryptoJS = require("crypto-js");
var cookies = new Cookies();

// Decrypt
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

const NavbarDesk = (props) => {
  const { t, i18n } = useTranslation();
  const trans = t;

  const homeSetting = useSelector((state) => state.getSettingsData.settings);

  const blue = {
    500: "#f36292",
    600: "#C25C7C",
    700: "#C25C7C",
  };

  const CustomButtonRoot = styled(Button)({
    fontFamily: "JellyDonuts",
    // fontSize: "26px",
    fontSize: "17px",
    fontWeight: "bold",
    // backgroundColor: `${blue[500]}`,
    backgroundColor: `${homeSetting?.button_color != null ? homeSetting?.button_color : `#f05a8b`
      }`,
    padding: "0px 24px",
    borderRadius: "25px",
    marginRight: "10px",
    color: "white",
    transition: "all 150ms ease",
    cursor: "pointer",
    border: "none",
    // paddingTop: "4px",
    // paddingBottom: "4px",
    width: "260px",
    height: "50px",
    overflow: "hidden",
    lineHeight: "1.2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      // backgroundColor: `${homeSetting?.button_color + "66"}`,
      // borderColor: `${blue[600]}`,
      // boxShadow: "none",
      boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    },

    "&:active": {
      boxShadow: "none",
      // backgroundColor: `${blue[700]}`,
      // borderColor: `${blue[700]}`,
      boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    },

    "&:focus": {
      // boxShadow: `0 0 0 0.2rem ${blue[500]}`,
    },
    "@media (max-width: 1199.98px)": {
      width: "240px",
      fontSize: "16px",
      lineHeight: 1.2,
    },
  });

  function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
  }

  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [ShowNavbarCart, setShowNavbarCart] = useState(false);
  const { deviceType } = getDeviceType();
  const { screenWidth, screenHeight } = getWindowDimensions();
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

  const handleLoginDropdown = () => {

    const LoginDropdown_ID = document.getElementById("LoginDropdown_ID");
    const dropdown_custom_components = document.getElementById(
      "dropdown-custom-components"
    );
    console.log(
      "handleLoginDropdown-LoginDropdown_Toggle_ID",
      dropdown_custom_components.ariaExpanded
    );
    if (dropdown_custom_components) {
      // if (dropdown_custom_components.ariaExpanded == true) {
      LoginDropdown_ID.click();
      LoginDropdown_ID.classList.remove("show");
      dropdown_custom_components.ariaExpanded = false;
      // }
    }

    const LoginDropdown_Menu_ID = document.getElementById(
      "LoginDropdown_Menu_ID"
    );
    if (LoginDropdown_Menu_ID) {
      document.getElementById("LoginDropdown_Menu_ID").classList.remove("show");
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

    // setScrollYPosition(scrolled)
    if (window.location.pathname.includes("/produit/")) {
      if (scrolled >= 0.24) {
        setBottomCartBtnMargin(100);
      } else {
        setBottomCartBtnMargin(0);
      }
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

  dispatch(isTokenAvailable());
  dispatch(isTokenExpiryTime());
  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);

  return (
    <>
      <div>
        <Navbar bg="transparent" expand="lg">
          <Container>
            <Navbar.Brand
              /** href="/" */ onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  homeSetting
                    ? `${SIMPLE_URL}/images/general_home_setting/${homeSetting.image}`
                    : "/images/royal_donuts_logo.png"
                }
                height={50}
                alt=""
                id="logo_image"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link
                  /*href="/produits"*/ onClick={() => navigate("/produits")}
                >
                  <CustomButton id="products" variant="contained">
                    {trans("Our Products")}
                  </CustomButton>
                </Nav.Link>
                <Nav.Link
                  /*href="/points-vente"*/ onClick={() =>
                    navigate("/points-vente")
                  }
                >
                  <CustomButton id="store_header" variant="contained">
                    {trans("Points of Sale")}
                  </CustomButton>
                </Nav.Link>
                {/* NavbarCart of Tabs and Desktops */}
                {screenWidth >= 768 && (
                  <span
                    className="prod_cart_box_wrapper mt-2 me-2"
                    onMouseEnter={() => {
                      deviceType == "Desktop" && setShowNavbarCart(true);
                      handleLoginDropdown();
                    }}
                    onMouseLeave={() => setShowNavbarCart(false)}
                    onClick={() =>
                      deviceType == "Mobile" &&
                      setShowNavbarCart(!ShowNavbarCart)
                    }
                  >
                    <span className="prod_cart_box">
                      <span className="prod_cart_box_icon_box">
                        <ShoppingBasketIcon className="prod_cart_box_icon" />
                      </span>
                      <span
                        className="prod_cart_item_count"
                        style={{ color: "rgb(255, 98, 149)!important" }}
                      >
                        {Array.isArray(products) && products.length > 0
                          ? products.reduce(
                            (prev, current) => prev + current.quantity,
                            0
                          )
                          : 0}
                      </span>
                      {ShowNavbarCart == true && (
                        <NavbarCart
                          screenWidth={screenWidth}
                          deviceType={deviceType}
                          productLength={products.length}
                          opacity={ShowNavbarCart ? 1 : 0}
                        />
                      )}
                    </span>
                  </span>
                )}
                <>
                  {isTokenAvailableState ? (
                    <Dropdown
                      id="LoginDropdown_ID"
                      className="desk_nav_dropdown"
                    >
                      <Dropdown.Toggle
                        as={AccountCircleIcon}
                        id="dropdown-custom-components"
                        className="nav_user_icon"
                      >
                        {trans("User Profile")}
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        id="LoginDropdown_Menu_ID"
                        style={{ marginTop: 10 }}
                      >
                        <Dropdown.Item eventKey="2" disabled>
                          {localStorage.getItem("name")}
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="1">
                          {" "}
                          <Link
                            to="/dashboard"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {trans("Dashboard")}
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="3"
                          onClick={() => {
                            localStorage.removeItem("user_id");
                            localStorage.removeItem("token");
                            localStorage.removeItem("token_expiry_time");
                            localStorage.removeItem("name");
                            dispatch(isTokenAvailable());
                            dispatch(isTokenExpiryTime());
                            dispatch(DashboardLogoutAction())
                            dispatch(checkoutFormUserData_Clear());
                            dispatch(checkoutFormFill_Clear());
                            dispatch(ClearCheckoutGetUserDataAction())
                            localStorage.removeItem("user_temp");
                            localStorage.clear();

                            setTimeout(function () {
                              dispatch(isTokenAvailable());
                              dispatch(isTokenExpiryTime());
                            }, 1000);
                          }}
                        >
                          {trans("Logout")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <>
                      <span
                        onClick={() => navigate("/login")}
                        style={{
                          cursor: "pointer",
                          color: `#fff`,
                          fontFamily: "Poppins-Bold",
                        }}
                      >
                        {trans("Login")}
                      </span>
                    </>
                  )}
                </>
                <span
                  className="mx-2"
                  onClick={handleSetLanguage}
                  style={{
                    cursor: "pointer",
                    fontSize: 14,
                    zIndex: 9999,
                    display: "block",
                    margin: "auto",
                    padding: "6px",
                    color: "white",
                    fontFamily: "Poppins-Bold",
                  }}
                >
                  {i18n.language == "fr" ? "FR" : "EN"}
                </span>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Show on Mobile Devices */}
      {screenWidth < 768 && products.length > 0 && (
        <span
          className="prod_cart_box_wrapper mt-2 me-2"
          onMouseEnter={() =>
            deviceType == "Desktop" && setShowNavbarCart(true)
          }
          onMouseLeave={() => setShowNavbarCart(false)}
          onClick={() =>
            deviceType == "Mobile" && setShowNavbarCart(!ShowNavbarCart)
          }
          style={{ marginBottom: bottomCartBtnMargin }}
        >
          <span className="prod_cart_box">
            <span className="prod_cart_box_icon_box">
              <ShoppingBasketIcon className="prod_cart_box_icon" />
            </span>
            <span className="prod_cart_item_count">
              {Array.isArray(products) &&
                products.length > 0 &&
                products.reduce((prev, current) => prev + current.quantity, 0)}
            </span>
            {ShowNavbarCart == true && (
              <NavbarCart
                screenWidth={screenWidth}
                deviceType={deviceType}
                productLength={products.length}
                opacity={ShowNavbarCart ? 1 : 0}
              />
            )}
          </span>
        </span>
      )}
    </>
  );
};

export default NavbarDesk;
