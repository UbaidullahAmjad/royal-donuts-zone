/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useRef, useState } from "react";
import "./CartPage.css";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import {
  Tabs,
  Tab,
  Checkbox,
  Button,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import Geocode from "react-geocode";
import axios from "axios";
import { TabContext, TabPanel } from "@mui/lab";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "@date-io/date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartPageItem from "./Contents/CartPageItem";
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation, } from "react-i18next";
import { NavLink } from "react-router-dom";
import { getDeliveryMethod } from "../../redux/CheckOut/checkOutActions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { checkoutFormPushData, checkoutFormStoreData } from "../../redux/CheckOut/checkOutFormAction";
import { Card, CardBody } from "reactstrap";
import { Table } from "react-bootstrap";
import CopyRight from "../copy-right/CopyRight";
import getWindowDimensions from "../../Components/Hooks/useWindowDimensions";
import {
  StoreMinutes_EQ_CLOSE_HOURS,
  StoreMinutes_EQ_OPEN_HOURS,
  StoreMinutes_GT_OPEN_HOURS,
  StoreMinutes_Hours_EQ_CURRENT_HOURS,
  StoreMinutes_Not_CurrentDay,
} from "./Functions/store_time_minutes";
import {
  StoreHours_EQ_CurrentHour,
  StoreHours_GT_EQ_OPEN_HOURS_LT_EQ_CLOSE_HOURS,
  StoreHours_NOT_CurrentDay,
} from "./Functions/store_time_hours";
import { URL } from "../../env";
import moment from "moment";
import { ClearPaypalPaymentInvoiceAction } from "../../redux/CheckOut/PaymentMethod/Paypal/PaypalPaymentAction";
import { ClearStripePaymentInvoiceAction } from "../../redux/CheckOut/PaymentMethod/Stripe/StripePaymentAction"

var CryptoJS = require("crypto-js");

const min = 1;

const CartPage = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [tabValue, setTabValue] = useState(0);
  const [checkTab_1, setCheckTab_1] = useState(false);
  const [checkTab_2, setCheckTab_2] = useState(false);
  const [checkTab_3, setCheckTab_3] = useState(false);
  const [termsCondition, setTermsCondition] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [storeName, setStoreName] = useState([]);
  const [storeValue, setStoreValue] = useState("");
  const [storeValueTakeaway, setStoreValueTakeaway] = useState("");
  const [valueDateRange, setValueDateRange] = useState([null, null]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoursTime, setHoursTime] = useState(null);
  const [minutesTime, setMinutesTime] = useState(null);
  const [hourSelected, setHourSelected] = useState();
  const [minuteSelected, setMinuteSelected] = useState();
  const [store, setStore] = useState(null);
  const [StoreDays, setStoreDays] = useState([]);
  const { screenWidth, screenHeight } = getWindowDimensions();

  const dispatch = useDispatch()
  const [distance, setDistance] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const currentTime = new Date().toLocaleTimeString();

  const [userId, setUserId] = useState(null);

  let storedays =
    StoreDays.length > 0 ? StoreDays.map((item) => item.day_name) : [];

  const [open_time_hours, setOpen_time_hours] = useState(null);
  const [open_time_minuts, setOpen_time_minuts] = useState(null);
  const [close_time_hours, setClose_time_hours] = useState(null);
  const [close_time_minuts, setClose_time_minuts] = useState(null);

  const checkOpenDays = (date1) => {
    let date = new Date(date1);
    let calendarDay = date.getDay();

    var store_disable_days = storedays.map(
      (day) =>
        (day == "Sunday" && 0) ||
        (day == "Monday" && 1) ||
        (day == "Tuesday" && 2) ||
        (day == "Wednesday" && 3) ||
        (day == "Thursday" && 4) ||
        (day == "Friday" && 5) ||
        (day == "Saturday" && 6)
    );
    return !store_disable_days.some((item) => item == calendarDay);
  };

  useEffect(() => {
    if (
      localStorage.getItem("user_id") != undefined &&
      localStorage.getItem("user_id") != ""
    ) {
      var bytes = CryptoJS.AES.decrypt(
        "" + localStorage.getItem("user_id"),
        "_#userid_"
      );
      var user_id = null;
      if (bytes != null) {
        user_id = bytes.toString(CryptoJS?.enc?.Utf8);
        setUserId(user_id);
      }
    } else {
      setUserId(null);
    }
  }, [localStorage.getItem("user_id")]);

  const setHTime = (e) => {
    setHourSelected(e.target.value);
    setHoursTime(e.target.value);
    if (e.target.value < 10) {
      setHourVal("0" + String(e.target.value));
    }
    if (e.target.value >= 10) {
      setHourVal(String(e.target.value));
    }

    if (e.target.value == close_time_hours) {
      if (minuteSelected > close_time_minuts) {
        setMinuteSelected();
        setMinutesTime();
      }
    } else if (e.target.value == open_time_hours) {
      if (minuteSelected < open_time_minuts) {
        setMinuteSelected();
        setMinutesTime();
      }
    } else if (e.target.value == currentHour) {
      if (minuteSelected < currentMinute) {
        setMinuteSelected();
        setMinutesTime();
      }
    }
  };

  const setMTime = (e) => {
    setMinuteSelected(e.target.value);
    setMinutesTime(e.target.value);
  };
  useEffect(() => {
    if (tabValue == 0) {
      let delivery_method = "delivery";
      dispatch(getDeliveryMethod(delivery_method));
    } else if (tabValue == 1) {
      let delivery_method = "take away";
      dispatch(getDeliveryMethod(delivery_method));
    }
  }, [tabValue]);

  useEffect(() => {
    getAllStores();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (tabValue == 0) {
      checkTab_3(true);
    }
  };

  // ----------------------------------------------------

  const [devileryTime, setDevileryTime] = useState(null);
  const [isDevileryTimeOpen, setIsDevileryTimeOpen] = useState(false);

  const [currentMinute, setCurrentMinute] = useState(
    String(new Date().getMinutes())
  );
  const [currentHour, setCurrentHour] = useState(
    String(new Date().getHours()) < 10
      ? "0" + String(new Date().getHours())
      : String(new Date().getHours())
  );

  const [hourVal, setHourVal] = useState(null);
  const [dateVal, setDateVal] = useState(null);

  const handleDevileryTimeClick = () => {
    setIsDevileryTimeOpen(true);
  };

  useEffect(() => {
    const selected_store_day = StoreDays?.find(
      (item) =>
        item.day_name ==
        new Date(valueDateRange).toLocaleDateString("us-US", {
          weekday: "long",
        })
    );

    setOpen_time_hours(
      selected_store_day != null &&
      selected_store_day?.day_start_time?.split(":")[0]
    );
    setOpen_time_minuts(
      selected_store_day != null &&
      selected_store_day?.day_start_time?.split(":")[1]
    );
    setClose_time_hours(
      selected_store_day != null &&
      selected_store_day?.day_end_time?.split(":")[0]
    );
    setClose_time_minuts(
      selected_store_day != null &&
      selected_store_day?.day_end_time?.split(":")[1]
    );

    setDevileryTime(null);
    setHourSelected();
    setMinuteSelected();
    setHoursTime(null);
    setMinutesTime(null);

    if (new Date(valueDateRange).getDate() != new Date().getDate()) {
      setDateVal(false);
    } else {
      setDateVal(true);
    }
  }, [valueDateRange]);

  const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];
  const minuts = ["00", "15", "30", "45"];

  const handleDevileryTimeSelect = () => {
    if (hoursTime != null && minutesTime != null) {
      if (hoursTime < 10 && minutesTime > 9) {
        setDevileryTime("0" + hoursTime + ":" + minutesTime);
      }
      if (minutesTime < 10 && hoursTime > 9) {
        setDevileryTime(hoursTime + ":" + "0" + minutesTime);
      }
      if (minutesTime < 10 && hoursTime < 10) {
        setDevileryTime("0" + hoursTime + ":" + "0" + minutesTime);
      }
      if (minutesTime > 9 && hoursTime > 9) {
        setDevileryTime(hoursTime + ":" + minutesTime);
        setIsDevileryTimeOpen(false);
        setHoursTime(null);
        setMinutesTime(null);
      }
    } else {
      alert("select time first!");
    }
  };

  // ----------------------------------------------------

  const handleNextCheckout = (objectData) => {
    const date = new Date(valueDateRange).toLocaleDateString();
    dispatch(
      checkoutFormPushData({
        key: "date_time",
        value: moment(
          date + ` ` + devileryTime,
          "MM/DD/YYYY hh:mm:ss"
        ).format("ddd, Do MMM, YYYY HH:mm:ss"),
      })
    );

    dispatch(
      checkoutFormPushData({
        key: "date",
        value: moment(
          date.toString(),
          "MM/DD/YYYY"
        ).format("ddd, Do MMM, YYYY"),
      })
    );

    dispatch(
      checkoutFormPushData({
        key: "delivery_time",
        value: devileryTime,
      })
    );

    dispatch(
      checkoutFormPushData({
        key: "delivery_method",
        value: objectData.orderType,
      })
    );

    dispatch(
      checkoutFormPushData({
        key: "delivery_info",
        value: tabValue == 0 ? storeValue : tabValue == 1 ? storeValueTakeaway : storeValue
      })
    );

    dispatch(
      checkoutFormStoreData(store)
    );

  };

  let products = useSelector((state) => state.myProductsCart?.cartItems);

  const getAllStores = () => {
    setStoreList([]);
    axios
      .get(`${URL}/get_stores_with_days`)
      .then((response) => {
        if (storeList.length == 0) {
          response?.data.stores.map((store) =>
            setStoreList((prevState) => [...prevState, store])
          );
        }
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  let tempArray = [];
  const getStores = (zip) => {
    setLoading(true);
    setDistance([]);

    Geocode.setApiKey("AIzaSyCYfmupb01hv66OR_AqMNP11qTNO-zJ95k");
    Geocode.setLanguage("en");
    Geocode.setRegion("fr");

    Geocode.fromAddress(zip)
      .then((response) => {
        if (response) {
          setLoading(false);
        }
        if (storeList.length > 0) {
          storeList.map((store_data) => {
            let storeLat = parseFloat(store_data.store.latitude);
            let storeLang = parseFloat(store_data.store.longitude);
            const { lat, lng } = response.results[0].geometry.location;
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat - storeLat); // deg2rad below
            var dLon = deg2rad(lng - storeLang);
            var a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(storeLat)) *
              Math.cos(deg2rad(lat)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km

            let tempDistance = parseFloat(d).toFixed(2);
            let tempObj;

            if (tempDistance <= 15) {
              tempObj = {
                store: store_data.store,
                store_days: store_data.store_days,
                distance: tempDistance,
              };
              tempArray.push(tempObj);
              setMeasuringDistance(tempObj);
            }
          });
        }

        if (tempArray.length == 0) {
          toast.error(trans("No store found in this area"));
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(trans("Invalid zip code"));
      });

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
  };

  const setMeasuringDistance = (tempObj) => {
    setDistance((prevState) => [...prevState, tempObj]);
  };
  const elementRef = useRef(null);
  const [cartDivSize, setCartDivSize] = useState(
    elementRef.current?.clientHeight
  );

  useEffect(() => {
    dispatch(ClearPaypalPaymentInvoiceAction());
    dispatch(ClearStripePaymentInvoiceAction());

    setCartDivSize(elementRef.current?.clientHeight);
    if (currentMinute < 10) {
      setCurrentMinute("0" + `${currentMinute}`);
    }
  }, []);


  return (
    <>
      <ToastContainer style={{ zIndex: 99999 }} />
      <Header />
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div className="cartpage__wrapper">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-11 col-lg-10 px-0">
                <Card>
                  <CardBody className="px-1 px-md-3">
                    <p className="c_title">
                      {trans("HOME YOUR SHOPPING CART Cart")} (
                      {products != undefined ? products.length : 0}{" "}
                      {trans("items")})
                    </p>
                    {products != undefined && products.length !== 0 ? (
                      <>
                        <div className="cartpage_cart_box_wrapper">
                          <div
                            className="cartpage_cart_box"
                            ref={elementRef}
                            style={{
                              maxHeight: 500,
                              overflowY:
                                cartDivSize >= 500 ? "scroll" : "initial",
                            }}
                          >
                            <div className="cartpage_cart_data cartpage_cart_header">
                              <p className="title product_item mb-0">
                                {trans("Product")}
                              </p>
                              <p className="title item_price mb-0">
                                {trans("Price")}
                              </p>
                              <p className="title quantity mb-0">
                                {trans("Quantity")}
                              </p>
                              <p className="title subtotal mb-0">
                                {trans("Subtotal")}
                              </p>
                              <p className="title delete mb-0"></p>
                            </div>
                            {products.map((product) => {
                              return (
                                <CartPageItem
                                  product={product}
                                />
                              );
                            })}
                          </div>
                        </div>

                        <div className="cartpage__box">
                          <div className="row justify-content-center">
                            <div
                              className="col-md-8 col-lg-6 pt-4"
                              style={{ position: "relative" }}
                            >
                              <div className="cartpage_bg_imagebox">
                                <img
                                  className="img-fluid"
                                  src={`${process.env.PUBLIC_URL}/images/store_detail_top_bg.png`}
                                  alt=""
                                />
                              </div>
                              <TabContext value={tabValue}>
                                <Tabs
                                  TabIndicatorProps={{
                                    style: { background: "#FF629500" },
                                  }}
                                  value={tabValue}
                                  onChange={handleTabChange}
                                  className="cartpage__box_tab TabContext__tab"
                                  aria-label="icon tabs example"
                                >
                                  <Tab
                                    icon={
                                      <LocalShippingIcon className="cartpage_icon" />
                                    }
                                    label={trans("Delivery")}
                                    aria-label="shipping_part"
                                    className="TabContext__tab"
                                    disabled={
                                      storeValueTakeaway !== "" &&
                                      storeValueTakeaway != undefined
                                    }
                                  />
                                  <Tab
                                    icon={
                                      <SettingsInputSvideoIcon className="cartpage_icon" />
                                    }
                                    label={trans("Takeaway")}
                                    aria-label="final_part"
                                    className="TabContext__tab"
                                    disabled={
                                      storeValue !== "" &&
                                      storeValue != undefined
                                    }
                                  />{" "}
                                </Tabs>
                                <div className="tabpanel_wrapped mt-3">
                                  {tabValue == 0 && (
                                    <TabPanel
                                      value={0}
                                      className="cartpage_tabpanel cp_tabpanel_1"
                                    >
                                      {distance.length === 0 ? (
                                        <div className="zip_code">
                                          <TextField
                                            id="cart_zip_code"
                                            label={trans("Enter Zip")}
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            type="number"
                                            maxLength="9"
                                            pattern="/^d{0,9}$/"
                                            inputProps={{
                                              min,
                                              maxlength: 9,
                                            }}
                                            // onKeyDown={(e) =>
                                            //   e.key == "Enter" &&
                                            //   getStores(zipCode)
                                            // }
                                            value={zipCode}
                                            onChange={(e) => {
                                              if (e.target.value < min) {
                                                setZipCode("");
                                              } else if (
                                                e.target.value == "."
                                              ) {
                                                setZipCode("");
                                              } else {
                                                setZipCode(e.target.value);
                                              }
                                            }}
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter") {
                                                document
                                                  .getElementById(
                                                    "zipcode_submit_btn"
                                                  )
                                                  .click();
                                              }
                                            }}
                                          />
                                        </div>
                                      ) : (
                                        <span
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            fontWeight: "700",
                                            margin: "8px 0px 8px 0px",
                                          }}
                                        >
                                          {storeValue}
                                        </span>
                                      )}

                                      {distance.length > 0 && (
                                        <div>
                                          <Select
                                            className="col-12 p-2 rounded mt-2"
                                            label=" "
                                            displayEmpty={true}
                                            inputProps={{
                                              "aria-label": "Without label",
                                            }}
                                            onChange={(e) => {
                                              setStoreValue(e.target.value);
                                            }}
                                            defaultValue={""}
                                          >
                                            <MenuItem
                                              value=""
                                              onClick={() => setStoreValue("")}
                                            >
                                              {trans("Select Store")}
                                            </MenuItem>
                                            {distance
                                              .sort(
                                                (a, b) =>
                                                  a.distance - b.distance
                                              )
                                              .map((val) => {
                                                return (
                                                  <MenuItem
                                                    value={val.store.name_fr}
                                                    onClick={() => {
                                                      setStore(val.store);
                                                      setStoreDays(
                                                        val.store_days
                                                      );
                                                    }}
                                                  >
                                                    <div className="d-flex justify-content-between w-100">
                                                      <span id="store_info">
                                                        {val.store.name_fr}{" "}
                                                      </span>
                                                      <span>
                                                        {val.distance} KM{" "}
                                                      </span>
                                                    </div>
                                                  </MenuItem>
                                                );
                                              })}
                                          </Select>
                                        </div>
                                      )}
                                      {distance?.length === 0 ? (
                                        <>
                                          <div className="cartpage_next_btn_wrapped d-flex justify-content-center mt-3">
                                            <Button
                                              id="zipcode_submit_btn"
                                              className="cartpage_submit_btn"
                                              disabled={
                                                zipCode.length != 9 &&
                                                zipCode.length != 5
                                              }
                                              onClick={() => getStores(zipCode)}
                                            >
                                              {loading === true ? (
                                                <Spinner
                                                  animation="border"
                                                  variant="light"
                                                />
                                              ) : (
                                                trans("Submit")
                                              )}
                                            </Button>
                                          </div>
                                          {errorMessage !== "" && (
                                            <Stack
                                              sx={{
                                                width: "50%",
                                                marginTop: "1rem",
                                              }}
                                              spacing={2}
                                            >
                                              <Alert
                                                variant="filled"
                                                severity="error"
                                                autoHideDuration={2000}
                                              >
                                                {trans(errorMessage)}
                                              </Alert>
                                            </Stack>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {storeValue !== "" && (
                                            <div className="cp_calendar_section">
                                              <div className="calendar_ico_wrapped">
                                                <CalendarMonthIcon className="ico mb-4" />
                                              </div>
                                              <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                              >
                                                <StaticDatePicker
                                                  disablePast
                                                  displayStaticWrapperAs="desktop"
                                                  value={valueDateRange}
                                                  shouldDisableDate={
                                                    checkOpenDays
                                                  }
                                                  // allowSameDateSelection={false}
                                                  minDate={1}
                                                  calendars={1}
                                                  endText="OK"
                                                  onChange={(newValue) => {
                                                    setValueDateRange(newValue);
                                                    if (
                                                      valueDateRange[1] === null
                                                    ) {
                                                      setCheckTab_2(true);
                                                    } else {
                                                      setCheckTab_2(false);
                                                    }
                                                  }}
                                                  renderInput={(
                                                    startProps,
                                                    endProps
                                                  ) => (
                                                    <Fragment>
                                                      <TextField
                                                        {...startProps}
                                                      />
                                                      <Box sx={{ mx: 2 }}>
                                                        {" "}
                                                        to{" "}
                                                      </Box>
                                                      <TextField
                                                        {...endProps}
                                                      />
                                                    </Fragment>
                                                  )}
                                                />
                                                {valueDateRange[0] !== null && (
                                                  <div className="date_picker__delivery_time_buttons">
                                                    <Button
                                                      disabled={
                                                        devileryTime === null
                                                      }
                                                      onClick={() => {
                                                        setDevileryTime(null);
                                                        // setTermsCondition(false)
                                                        setHourSelected();
                                                        setMinuteSelected();
                                                      }}
                                                    >
                                                      {trans("Abort")}
                                                    </Button>
                                                    <Button
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#staticBackdrop"
                                                      onClick={() => {
                                                        setCurrentMinute(
                                                          String(
                                                            new Date().getMinutes()
                                                          ) < 10
                                                            ? "0" +
                                                            String(
                                                              new Date().getMinutes()
                                                            )
                                                            : String(
                                                              new Date().getMinutes()
                                                            )
                                                        );

                                                        setCurrentHour(
                                                          String(
                                                            new Date().getHours()
                                                          ) < 10
                                                            ? "0" +
                                                            String(
                                                              new Date().getHours()
                                                            )
                                                            : String(
                                                              new Date().getHours()
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      {trans("Further")}
                                                    </Button>
                                                  </div>
                                                )}
                                                <div
                                                  className="modal fade mt-2"
                                                  id="staticBackdrop"
                                                  data-bs-backdrop="static"
                                                  data-bs-keyboard="false"
                                                  tabindex="-1"
                                                  aria-labelledby="staticBackdropLabel"
                                                  aria-hidden="true"
                                                >
                                                  <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                      <div
                                                        className="modal-header d-flex justify-content-center align-items-center"
                                                        style={{
                                                          backgroundColor:
                                                            "#ff6295",
                                                          height: "50px",
                                                          color: "#FFFF",
                                                        }}
                                                      >
                                                        {currentTime}
                                                      </div>
                                                      <div
                                                        className="modal-body d-flex"
                                                        style={{
                                                          maxHeight: "250px",
                                                          overflow: "hidden",
                                                        }}
                                                      >
                                                        <ul
                                                          className="d-flex flex-column justify-content-center"
                                                          style={{
                                                            listStyle: "none",
                                                            alignItems:
                                                              "center",
                                                            width: "250px",
                                                            padding: "0px",
                                                            position:
                                                              "relative",
                                                          }}
                                                        >
                                                          <div
                                                            className="d-flex align-items-center flex-column"
                                                            style={{
                                                              overflowY:
                                                                "scroll",
                                                              width: "100%",
                                                              height: "200px",
                                                            }}
                                                          >
                                                            {hours.map(
                                                              (hour) => {
                                                                return (
                                                                  <li
                                                                    className={
                                                                      dateVal ==
                                                                        true
                                                                        ? StoreHours_EQ_CurrentHour(
                                                                          dateVal,
                                                                          hour,
                                                                          open_time_hours,
                                                                          close_time_hours,
                                                                          open_time_minuts,
                                                                          close_time_minuts,
                                                                          currentHour,
                                                                          currentMinute
                                                                        ) ||
                                                                        StoreHours_GT_EQ_OPEN_HOURS_LT_EQ_CLOSE_HOURS(
                                                                          dateVal,
                                                                          hour,
                                                                          open_time_hours,
                                                                          close_time_hours,
                                                                          open_time_minuts,
                                                                          close_time_minuts,
                                                                          currentHour,
                                                                          currentMinute,
                                                                          minuteSelected,
                                                                          setMinuteSelected
                                                                        )
                                                                        : StoreHours_NOT_CurrentDay(
                                                                          dateVal,
                                                                          hour,
                                                                          open_time_hours,
                                                                          close_time_hours,
                                                                          open_time_minuts,
                                                                          close_time_minuts,
                                                                          currentHour,
                                                                          currentMinute
                                                                        )
                                                                    }
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      setHTime(
                                                                        e
                                                                      )
                                                                    }
                                                                    value={hour}
                                                                    style={{
                                                                      fontSize:
                                                                        "25px",
                                                                      marginTop:
                                                                        "5px",
                                                                      marginBottom:
                                                                        "5px",
                                                                      cursor:
                                                                        "pointer",
                                                                      color:
                                                                        hourSelected ==
                                                                          hour
                                                                          ? "#ff6295"
                                                                          : "",
                                                                      transform:
                                                                        hourSelected ==
                                                                          hour
                                                                          ? "scale(1.5)"
                                                                          : "",
                                                                    }}
                                                                  >
                                                                    {hour}
                                                                  </li>
                                                                );
                                                              }
                                                            )}
                                                          </div>
                                                        </ul>
                                                        <ul
                                                          className="d-flex flex-column justify-content-center"
                                                          style={{
                                                            listStyle: "none",
                                                            alignItems:
                                                              "center",
                                                            width: "250px",
                                                            padding: "0px",
                                                            position:
                                                              "relative",
                                                            cursor: "pointer",
                                                          }}
                                                        >
                                                          <div
                                                            className="d-flex align-items-center flex-column"
                                                            style={{
                                                              overflowY:
                                                                "scroll",
                                                              width: "100%",
                                                              height: "200px",
                                                            }}
                                                          >
                                                            {minuts.map(
                                                              (minute) => {
                                                                return (
                                                                  <li
                                                                    className={
                                                                      (hourSelected ==
                                                                        null &&
                                                                        "disabled_time") ||
                                                                      (hourVal ==
                                                                        null &&
                                                                        "disabled_time") ||
                                                                      StoreMinutes_Not_CurrentDay(
                                                                        dateVal,
                                                                        hourVal,
                                                                        currentHour,
                                                                        open_time_hours,
                                                                        close_time_hours,
                                                                        currentMinute,
                                                                        open_time_minuts,
                                                                        close_time_minuts,
                                                                        minute
                                                                      ) ||
                                                                      StoreMinutes_GT_OPEN_HOURS(
                                                                        dateVal,
                                                                        hourVal,
                                                                        currentHour,
                                                                        open_time_hours,
                                                                        close_time_hours
                                                                      ) ||
                                                                      StoreMinutes_EQ_OPEN_HOURS(
                                                                        dateVal,
                                                                        hourVal,
                                                                        currentHour,
                                                                        open_time_hours,
                                                                        close_time_hours,
                                                                        currentMinute,
                                                                        open_time_minuts,
                                                                        minute
                                                                      ) ||
                                                                      StoreMinutes_EQ_CLOSE_HOURS(
                                                                        dateVal,
                                                                        hourVal,
                                                                        currentHour,
                                                                        open_time_hours,
                                                                        close_time_hours,
                                                                        currentMinute,
                                                                        open_time_minuts,
                                                                        close_time_minuts,
                                                                        minute
                                                                      ) ||
                                                                      StoreMinutes_Hours_EQ_CURRENT_HOURS(
                                                                        dateVal,
                                                                        hourVal,
                                                                        currentHour,
                                                                        open_time_hours,
                                                                        close_time_hours,
                                                                        currentMinute,
                                                                        open_time_minuts,
                                                                        close_time_minuts,
                                                                        minute
                                                                      )
                                                                    }
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      setMTime(
                                                                        e
                                                                      )
                                                                    }
                                                                    value={
                                                                      minute
                                                                    }
                                                                    style={{
                                                                      fontSize:
                                                                        "25px",
                                                                      marginTop:
                                                                        "5px",
                                                                      marginBottom:
                                                                        "5px",
                                                                      color:
                                                                        minuteSelected ==
                                                                          minute
                                                                          ? "#ff6295"
                                                                          : "",
                                                                      transform:
                                                                        minuteSelected ==
                                                                          minute
                                                                          ? "scale(1.5)"
                                                                          : "",
                                                                    }}
                                                                  >
                                                                    {minute}
                                                                  </li>
                                                                );
                                                              }
                                                            )}
                                                          </div>
                                                        </ul>
                                                      </div>
                                                      <div className="modal-footer">
                                                        <Button
                                                          type="button"
                                                          style={{
                                                            backgroundColor:
                                                              "rgb(255, 98, 149)",
                                                            color: "white",
                                                            marginRight: "5px",
                                                          }}
                                                          data-bs-dismiss="modal"
                                                          onClick={() => {
                                                            setHourSelected();
                                                            setMinuteSelected();
                                                          }}
                                                        >
                                                          {trans("Cancel")}
                                                        </Button>
                                                        <Button
                                                          type="button"
                                                          className={
                                                            hoursTime != null &&
                                                              minutesTime != null
                                                              ? "timeSelectButton"
                                                              : "timeSelectDisabled"
                                                          }
                                                          onClick={
                                                            handleDevileryTimeSelect
                                                          }
                                                          data-bs-dismiss="modal"
                                                          disabled={
                                                            hoursTime != null &&
                                                              minutesTime != null
                                                              ? false
                                                              : true
                                                          }
                                                        >
                                                          {trans("Select")}
                                                        </Button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                {devileryTime !== null && (
                                                  <TextField
                                                    className="mt-3 mb-3"
                                                    id="delivery_time"
                                                    label="Delivery Time"
                                                    type="text"
                                                    InputLabelProps={{
                                                      shrink: true,
                                                    }}
                                                    value={devileryTime}
                                                    onClick={
                                                      handleDevileryTimeClick
                                                    }
                                                  />
                                                )}
                                              </LocalizationProvider>
                                            </div>
                                          )}
                                        </>
                                      )}
                                      {zipCode !== "" &&
                                        storeValue !== "" &&
                                        valueDateRange[0] !== null && (
                                          <div className="cartpage_next_btn_wrapped d-flex justify-content-center">
                                            <Button
                                              className="cartpage_next_btn"
                                              disabled={
                                                zipCode === "" ||
                                                storeValue === "" ||
                                                storeValue === undefined ||
                                                devileryTime === null
                                              }
                                              onClick={handleNextCheckout({ orderType: "delivery" })}
                                            >
                                              <Link
                                                to="/checkout"
                                                state={{
                                                  zipCode: zipCode,
                                                  valueTime: devileryTime,
                                                  valueDateRange:
                                                    valueDateRange,
                                                  address: storeValue,
                                                  orderType: "delivery",
                                                  isCartFilled: true,
                                                  store: store,
                                                  // configuratorOrder: configuratorOrder
                                                  showGuestTabOnTabLogin:
                                                    userId != "" &&
                                                      userId != undefined
                                                      ? false
                                                      : undefined,
                                                }}
                                                className="link"
                                                style={{
                                                  textDecoration: "none",
                                                  color: "inherit",
                                                }}
                                              >
                                                {trans("Next")}
                                              </Link>
                                            </Button>
                                          </div>
                                        )}
                                    </TabPanel>
                                  )}
                                  {tabValue == 1 && (
                                    <TabPanel
                                      value={1}
                                      className="cartpage_tabpanel cp_tabpanel_3 d-flex justify-content-center flex-column mt-2"
                                    >
                                      {distance.length === 0 && (
                                        <div className="zip_code">
                                          <TextField
                                            id="cart_zip_code_takeaway"
                                            label={trans("Enter Zip")}
                                            type="number"
                                            InputLabelProps={{
                                              shrink: true,
                                            }}
                                            value={zipCode}
                                            onChange={(e) => {
                                              setZipCode(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter") {
                                                document
                                                  .getElementById(
                                                    "zipcode_submit_btn_takeaway"
                                                  )
                                                  .click();
                                              }
                                            }}
                                          />
                                        </div>
                                      )}

                                      {distance.length > 0 && (
                                        <div>
                                          <Select
                                            className="col-12 p-2 rounded mt-2"
                                            displayEmpty={true}
                                            label=" "
                                            inputProps={{
                                              "aria-label": "Without label",
                                            }}
                                            onChange={(e) => {
                                              setStoreValueTakeaway(
                                                e.target.value
                                              );
                                            }}
                                          >
                                            <MenuItem
                                              onClick={() =>
                                                setStoreValueTakeaway("")
                                              }
                                            >
                                              {trans("Select Store")}
                                            </MenuItem>
                                            {distance
                                              .sort(
                                                (a, b) =>
                                                  a.distance - b.distance
                                              )
                                              .map((val) => {
                                                return (
                                                  <MenuItem
                                                    value={val.store.name_fr}
                                                    onClick={() => {
                                                      setStore(val.store);
                                                      setStoreDays(
                                                        val.store_days
                                                      );
                                                    }}
                                                  >
                                                    <div className="d-flex justify-content-between w-100">
                                                      <span>
                                                        {val.store.name_fr}{" "}
                                                      </span>
                                                      <span>
                                                        {val.distance} KM{" "}
                                                      </span>
                                                    </div>
                                                  </MenuItem>
                                                );
                                              })}
                                          </Select>
                                        </div>
                                      )}
                                      {distance?.length === 0 ? (
                                        <>
                                          <div className="cartpage_next_btn_wrapped d-flex justify-content-center mt-3">
                                            <Button
                                              id="zipcode_submit_btn_takeaway"
                                              className="cartpage_next_btn"
                                              disabled={
                                                zipCode.length != 9 &&
                                                zipCode.length != 5
                                              }
                                              onClick={() => getStores(zipCode)}
                                            >
                                              {loading === true ? (
                                                <Spinner
                                                  animation="border"
                                                  variant="light"
                                                />
                                              ) : (
                                                trans("Submit")
                                              )}
                                            </Button>
                                          </div>
                                          {errorMessage !== "" && (
                                            <Stack
                                              sx={{
                                                width: "50%",
                                                marginTop: "1rem",
                                              }}
                                              spacing={2}
                                            >
                                              <Alert
                                                variant="filled"
                                                severity="error"
                                                autoHideDuration={2000}
                                              >
                                                {trans(errorMessage)}
                                              </Alert>
                                            </Stack>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {storeValueTakeaway !== "" && (
                                            <div className="cp_calendar_section">
                                              <div className="calendar_ico_wrapped">
                                                <CalendarMonthIcon className="ico" />
                                              </div>
                                              <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                              >
                                                <StaticDatePicker
                                                  disablePast
                                                  displayStaticWrapperAs="desktop"
                                                  shouldDisableDate={
                                                    checkOpenDays
                                                  }
                                                  value={valueDateRange}
                                                  // allowSameDateSelection={false}
                                                  minDate={1}
                                                  calendars={1}
                                                  endText="OK"
                                                  onChange={(newValue) => {
                                                    setValueDateRange(newValue);
                                                    if (
                                                      valueDateRange[1] === null
                                                    ) {
                                                      setCheckTab_2(true);
                                                    } else {
                                                      setCheckTab_2(false);
                                                    }
                                                  }}
                                                  renderInput={(
                                                    startProps,
                                                    endProps
                                                  ) => (
                                                    <Fragment>
                                                      <TextField
                                                        {...startProps}
                                                      />
                                                      <Box sx={{ mx: 2 }}>
                                                        {" "}
                                                        to{" "}
                                                      </Box>
                                                      <TextField
                                                        {...endProps}
                                                      />
                                                    </Fragment>
                                                  )}
                                                />
                                                {valueDateRange[0] !== null && (
                                                  <div className="date_picker__delivery_time_buttons">
                                                    <Button
                                                      disabled={
                                                        devileryTime === null
                                                      }
                                                      onClick={() => {
                                                        setDevileryTime(null);
                                                      }}
                                                    >
                                                      {trans("Abort")}
                                                    </Button>
                                                    <Button
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#staticBackdrop"
                                                      onClick={() => {
                                                        setCurrentMinute(
                                                          String(
                                                            new Date().getMinutes()
                                                          ) < 10
                                                            ? "0" +
                                                            String(
                                                              new Date().getMinutes()
                                                            )
                                                            : String(
                                                              new Date().getMinutes()
                                                            )
                                                        );

                                                        setCurrentHour(
                                                          String(
                                                            new Date().getHours()
                                                          ) < 10
                                                            ? "0" +
                                                            String(
                                                              new Date().getHours()
                                                            )
                                                            : String(
                                                              new Date().getHours()
                                                            )
                                                        );
                                                      }}
                                                    >
                                                      {trans("Further")}
                                                    </Button>
                                                  </div>
                                                )}
                                                <div className="mt-3" />
                                                <LocalizationProvider
                                                  dateAdapter={AdapterDateFns}
                                                >
                                                  <div
                                                    className="modal fade"
                                                    id="staticBackdrop"
                                                    data-bs-backdrop="static"
                                                    data-bs-keyboard="false"
                                                    tabindex="-1"
                                                    aria-labelledby="staticBackdropLabel"
                                                    aria-hidden="true"
                                                  >
                                                    <div className="modal-dialog modal-dialog-centered">
                                                      <div className="modal-content">
                                                        <div
                                                          className="modal-header d-flex justify-content-center align-items-center"
                                                          style={{
                                                            backgroundColor:
                                                              "#ff6295",
                                                            height: "50px",
                                                            color: "#FFFF",
                                                          }}
                                                        >
                                                          {currentTime}
                                                        </div>
                                                        <div
                                                          className="modal-body d-flex"
                                                          style={{
                                                            maxHeight: "250px",
                                                            overflow: "hidden",
                                                          }}
                                                        >
                                                          <ul
                                                            className="d-flex flex-column justify-content-center"
                                                            style={{
                                                              listStyle: "none",
                                                              alignItems:
                                                                "center",
                                                              width: "250px",
                                                              padding: "0px",
                                                              position:
                                                                "relative",
                                                            }}
                                                          >
                                                            <div
                                                              className="d-flex align-items-center flex-column"
                                                              style={{
                                                                overflowY:
                                                                  "scroll",
                                                                width: "100%",
                                                                height: "200px",
                                                              }}
                                                            >
                                                              {hours.map(
                                                                (hour) => {
                                                                  return (
                                                                    <li
                                                                      className={
                                                                        dateVal ==
                                                                          true
                                                                          ? StoreHours_EQ_CurrentHour(
                                                                            dateVal,
                                                                            hour,
                                                                            open_time_hours,
                                                                            close_time_hours,
                                                                            open_time_minuts,
                                                                            close_time_minuts,
                                                                            currentHour,
                                                                            currentMinute
                                                                          ) ||
                                                                          StoreHours_GT_EQ_OPEN_HOURS_LT_EQ_CLOSE_HOURS(
                                                                            dateVal,
                                                                            hour,
                                                                            open_time_hours,
                                                                            close_time_hours,
                                                                            open_time_minuts,
                                                                            close_time_minuts,
                                                                            currentHour,
                                                                            currentMinute
                                                                          )
                                                                          : StoreHours_NOT_CurrentDay(
                                                                            dateVal,
                                                                            hour,
                                                                            open_time_hours,
                                                                            close_time_hours,
                                                                            open_time_minuts,
                                                                            close_time_minuts,
                                                                            currentHour,
                                                                            currentMinute
                                                                          )
                                                                      }
                                                                      onClick={(
                                                                        e
                                                                      ) =>
                                                                        setHTime(
                                                                          e
                                                                        )
                                                                      }
                                                                      value={
                                                                        hour
                                                                      }
                                                                      style={{
                                                                        fontSize:
                                                                          "25px",
                                                                        marginTop:
                                                                          "5px",
                                                                        marginBottom:
                                                                          "5px",
                                                                        cursor:
                                                                          "pointer",
                                                                        color:
                                                                          hourSelected ==
                                                                            hour
                                                                            ? "#ff6295"
                                                                            : "",
                                                                        transform:
                                                                          hourSelected ==
                                                                            hour
                                                                            ? "scale(1.5)"
                                                                            : "",
                                                                      }}
                                                                    >
                                                                      {hour}
                                                                    </li>
                                                                  );
                                                                }
                                                              )}
                                                            </div>
                                                          </ul>
                                                          <ul
                                                            className="d-flex flex-column justify-content-center"
                                                            style={{
                                                              listStyle: "none",
                                                              alignItems:
                                                                "center",
                                                              width: "250px",
                                                              padding: "0px",
                                                              position:
                                                                "relative",
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            <div
                                                              className="d-flex align-items-center flex-column"
                                                              style={{
                                                                overflowY:
                                                                  "scroll",
                                                                width: "100%",
                                                                height: "200px",
                                                              }}
                                                            >
                                                              {minuts.map(
                                                                (minute) => {
                                                                  return (
                                                                    <li
                                                                      className={
                                                                        (hourSelected ==
                                                                          null &&
                                                                          "disabled_time") ||
                                                                        (hourVal ==
                                                                          null &&
                                                                          "disabled_time") ||
                                                                        StoreMinutes_Not_CurrentDay(
                                                                          dateVal,
                                                                          hourVal,
                                                                          currentHour,
                                                                          open_time_hours,
                                                                          close_time_hours,
                                                                          currentMinute,
                                                                          open_time_minuts,
                                                                          close_time_minuts,
                                                                          minute
                                                                        ) ||
                                                                        StoreMinutes_GT_OPEN_HOURS(
                                                                          dateVal,
                                                                          hourVal,
                                                                          currentHour,
                                                                          open_time_hours,
                                                                          close_time_hours
                                                                        ) ||
                                                                        StoreMinutes_EQ_OPEN_HOURS(
                                                                          dateVal,
                                                                          hourVal,
                                                                          currentHour,
                                                                          open_time_hours,
                                                                          close_time_hours,
                                                                          currentMinute,
                                                                          open_time_minuts,
                                                                          minute
                                                                        ) ||
                                                                        StoreMinutes_EQ_CLOSE_HOURS(
                                                                          dateVal,
                                                                          hourVal,
                                                                          currentHour,
                                                                          open_time_hours,
                                                                          close_time_hours,
                                                                          currentMinute,
                                                                          open_time_minuts,
                                                                          close_time_minuts,
                                                                          minute
                                                                        ) ||
                                                                        StoreMinutes_Hours_EQ_CURRENT_HOURS(
                                                                          dateVal,
                                                                          hourVal,
                                                                          currentHour,
                                                                          open_time_hours,
                                                                          close_time_hours,
                                                                          currentMinute,
                                                                          open_time_minuts,
                                                                          close_time_minuts,
                                                                          minute
                                                                        )
                                                                      }
                                                                      onClick={(
                                                                        e
                                                                      ) =>
                                                                        setMTime(
                                                                          e
                                                                        )
                                                                      }
                                                                      value={
                                                                        minute
                                                                      }
                                                                      style={{
                                                                        fontSize:
                                                                          "25px",
                                                                        marginTop:
                                                                          "5px",
                                                                        marginBottom:
                                                                          "5px",
                                                                        color:
                                                                          minuteSelected ==
                                                                            minute
                                                                            ? "#ff6295"
                                                                            : "",
                                                                        transform:
                                                                          minuteSelected ==
                                                                            minute
                                                                            ? "scale(1.5)"
                                                                            : "",
                                                                      }}
                                                                    >
                                                                      {minute}
                                                                    </li>
                                                                  );
                                                                }
                                                              )}
                                                            </div>
                                                          </ul>
                                                        </div>
                                                        <div className="modal-footer">
                                                          <Button
                                                            type="button"
                                                            style={{
                                                              backgroundColor:
                                                                "rgb(255, 98, 149)",
                                                              color: "white",
                                                              marginRight:
                                                                "5px",
                                                            }}
                                                            data-bs-dismiss="modal"
                                                            onClick={() => {
                                                              setHourSelected();
                                                              setMinuteSelected();
                                                            }}
                                                          >
                                                            {trans("Cancel")}
                                                          </Button>
                                                          <Button
                                                            type="button"
                                                            className={
                                                              hoursTime !=
                                                                null &&
                                                                minutesTime !=
                                                                null
                                                                ? "timeSelectButton"
                                                                : "timeSelectDisabled"
                                                            }
                                                            onClick={
                                                              handleDevileryTimeSelect
                                                            }
                                                            data-bs-dismiss="modal"
                                                            disabled={
                                                              hoursTime !=
                                                                null &&
                                                                minutesTime !=
                                                                null
                                                                ? false
                                                                : true
                                                            }
                                                          >
                                                            {trans("Select")}
                                                          </Button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* )} */}
                                                </LocalizationProvider>
                                                {devileryTime !== null && (
                                                  <TextField
                                                    className="mb-3"
                                                    id="delivery_time"
                                                    label="Delivery Time"
                                                    InputProps={{
                                                      readOnly: true,
                                                    }}
                                                    type="text"
                                                    InputLabelProps={{
                                                      shrink: true,
                                                    }}
                                                    value={devileryTime}
                                                    onClick={
                                                      handleDevileryTimeClick
                                                    }
                                                  />
                                                )}
                                              </LocalizationProvider>
                                            </div>
                                          )}
                                        </>
                                      )}
                                      {zipCode !== "" &&
                                        storeValueTakeaway !== "" &&
                                        valueDateRange[0] !== null && (
                                          <div className="cartpage_next_btn_wrapped d-flex justify-content-center">
                                            <Button
                                              className="cartpage_next_btn"
                                              disabled={
                                                zipCode === "" ||
                                                storeValueTakeaway === "" ||
                                                storeValueTakeaway ===
                                                undefined ||
                                                devileryTime === null
                                              }
                                              onClick={handleNextCheckout({ orderType: "takeaway" })}
                                            >
                                              <Link
                                                to="/checkout"
                                                state={{
                                                  zipCode: zipCode,
                                                  store: store,
                                                  valueTime: devileryTime,
                                                  valueDateRange:
                                                    valueDateRange,
                                                  address: storeValueTakeaway,
                                                  orderType: "takeaway",
                                                  isCartFilled: true,
                                                  // configuratorOrder: {configuratorOrder}
                                                  showGuestTabOnTabLogin:
                                                    userId != "" &&
                                                      userId != undefined
                                                      ? false
                                                      : undefined,
                                                }}
                                                className="link"
                                                style={{
                                                  textDecoration: "none",
                                                  color: "inherit",
                                                }}
                                              >
                                                {trans("Next")}
                                              </Link>
                                            </Button>
                                          </div>
                                        )}
                                    </TabPanel>
                                  )}
                                </div>
                              </TabContext>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert icon={false} severity="info">
                          <h6 style={{ letterSpacing: "2px" }}>
                            {trans("Your Cart is Empty")}.{" "}
                            <span style={{ cursor: "pointer", color: "blue" }}>
                              <NavLink to="/produits">
                                {trans("Click here")}
                              </NavLink>
                            </span>{" "}
                            {trans("to add Items to Cart")}
                          </h6>
                        </Alert>
                      </Stack>
                    )}
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto" }}>
          <Footer />
          <CopyRight />
        </div>
      </div>
    </>
  );
};

export default CartPage;
