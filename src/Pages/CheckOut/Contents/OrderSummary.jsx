/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import "./OrderSummary.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkoutFormPushData } from "../../../redux/CheckOut/checkOutFormAction";
import logo from "../../../assets/logo.webp";

import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { SIMPLE_URL, URL } from "../../../env";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const OrderSummary = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const dispatch = useDispatch();

  let products = useSelector((state) => state.myProductsCart?.cartItems);
  let grandTotal = useSelector((state) => state.myProductsCart?.cartGrandTotal);
  const [open, setOpen] = React.useState(false);
  const [cartId, setCartId] = React.useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [message, setMessage] = useState("");
  const [copenCode, setCopenCode] = useState(0);
  const [copenCodeSymbol, setCopenCodeSymbol] = useState("");
  const [loading, setLoading] = useState(false);

  let vertical = "top";
  let horizontal = "right";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const setDiscount = (e) => {
    const { name, value } = e.target;
    setDiscountCode(e.target.value);
    dispatch(
      checkoutFormPushData({ key: "coupon_code", value: e.target.value })
    );
  };

  useEffect(() => {
    dispatch(
      checkoutFormPushData({
        key: "coupon_code",
        value: "",
      })
    );
    dispatch(
      checkoutFormPushData({
        key: "couponCodeAmount",
        value: 0,
      })
    );
    dispatch(
      checkoutFormPushData({
        key: "couponCodeSymbol",
        value: "",
      })
    );
  }, []);

  const getCoupon = async () => {
    setLoading(true);

    await axios
      .get(`${URL}/checkcoupon`, {
        params: { id: cartId, coupon: discountCode },
      })
      .then((response) => {
        // console.log("this is response", response);
        if (response.data.code == "1") {
          setLoading(false);
          setCopenCode(response.data.coupon.amount);
          setCopenCodeSymbol(response.data.coupon.symbol);

          dispatch(
            checkoutFormPushData({
              key: "coupon_code",
              value: response.data.coupon.code,
            })
          );
          dispatch(
            checkoutFormPushData({
              key: "couponCodeAmount",
              value: response.data.coupon.amount,
            })
          );
          dispatch(
            checkoutFormPushData({
              key: "couponCodeSymbol",
              value: response.data.coupon.symbol,
            })
          );
        } else if (response.data.code == "2") {
          setLoading(false);
          setCopenCode(0);
          setCopenCodeSymbol("");

          dispatch(checkoutFormPushData({ key: "coupon_code", value: "" }));
          dispatch(checkoutFormPushData({ key: "couponCodeAmount", value: 0 }));
          dispatch(
            checkoutFormPushData({ key: "couponCodeSymbol", value: "" })
          );
        } else if (response.data.code == "3") {
          setLoading(false);
          setCopenCode(0);
          setCopenCodeSymbol("");

          dispatch(checkoutFormPushData({ key: "coupon_code", value: "" }));
          dispatch(checkoutFormPushData({ key: "couponCodeAmount", value: 0 }));
          dispatch(
            checkoutFormPushData({ key: "couponCodeSymbol", value: "" })
          );
        }
        setLoading(false);
        setOpen(true);
        setMessage(response.data.message);
      })
      .catch(function (error) {
        setLoading(false);
        // console.log(error);
      });
  };

  const elementRef = useRef(null);
  const [cartDivSize, setCartDivSize] = useState(
    elementRef.current?.clientHeight
  );
  useEffect(() => {
    setCartDivSize(elementRef.current?.clientHeight);
  }, [elementRef]);

  return (
    <div className="co__order_summary co_new_order_summary mb-2">
      <p className="co__label_title form_labels" style={{ fontWeight: "bold" }}>
        {trans("Order Summary")}
      </p>
      <div
        ref={elementRef}
        className="co_new_order_summary_item_wrapper mt-2 pt-2"
        style={{
          maxHeight: 400,
          overflowY: cartDivSize >= 400 ? "scroll" : "initial",
        }}
      >
        {products.length !== 0 &&
          products.map((item) => {
            return (
              <div className="co_new_order_summary_item_box">
                <div className="co_new_order_summary_item">
                  <div className="image_box">
                    {item.product_detail ? (
                      <img
                        src={
                          item.product_detail?.image == "undefined" ||
                            item.product_detail?.image == null
                            ? logo
                            : `${SIMPLE_URL}/images/Product/${item.product_detail?.image}`
                        }
                        alt=""
                      />
                    ) : (
                      <>
                        {item.image ? (
                          <>
                            <img
                              style={{
                                width: "40px",
                                height: "40px",
                                position: "absolute",
                              }}
                              src={
                                item.image == "undefined" || item.image == null
                                  ? logo
                                  : item.image
                              }
                              alt={``}
                            />
                            {item.glaze?.length > 0 && (
                              <img
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  position: "absolute",
                                }}
                                src={item.glaze[0].image}
                                alt=""
                              />
                            )}
                            {item.sauce?.length > 0 && (
                              <img
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  position: "absolute",
                                }}
                                src={item.sauce[0].image}
                                alt=""
                              />
                            )}
                            {item.topping?.length > 0 &&
                              item.topping.map((top, i) => {
                                if (i == 0) {
                                  return (
                                    <img
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        position: "absolute",
                                      }}
                                      src={top.image1}
                                      alt=""
                                    />
                                  );
                                }
                                if (i == 1) {
                                  return (
                                    <img
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        position: "absolute",
                                      }}
                                      src={top.image2}
                                      alt=""
                                    />
                                  );
                                }
                                if (i == 2) {
                                  return (
                                    <img
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        position: "absolute",
                                      }}
                                      src={top.image3}
                                      alt=""
                                    />
                                  );
                                }
                              })}
                            {item.filling?.length > 0 && (
                              <img
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  position: "absolute",
                                }}
                                src={item.filling[0].image}
                                alt=""
                              />
                            )}
                          </>
                        ) : (
                          <img src={logo} alt={``} />
                        )}
                      </>
                    )}
                    <div
                      className={`quantity_box ${item?.quantity <= 9
                        ? "quantity_circular"
                        : "quantity_rectangular"
                        }`}
                    >
                      <span>{item?.quantity}</span>
                    </div>
                  </div>
                  <div className="co_new_order_summary_item_detail_box">
                    <p className="title mb-0">
                      {item.product_detail
                        ? item.product_detail.name_fr
                        : item.donutType}
                    </p>
                    <p className="item_price mb-0">
                      €
                      {item.product_detail
                        ? item.product_detail.price_euro.toString().split(".")
                          .length > 1
                          ? item.product_detail.price_euro
                            .toString()
                            .split(".")[0] +
                          trans("dot") +
                          item.product_detail.price_euro
                            .toString()
                            .split(".")[1]
                          : item.product_detail.price_euro
                            .toString()
                            .split(".")[0]
                        : item.price.toString().split(".").length > 1
                          ? item.price.toString().split(".")[0] +
                          trans("dot") +
                          item.price.toString().split(".")[1]
                          : item.price.toString().split(".")[0]}
                    </p>
                  </div>
                  <p className="co_new_order_summary_item_total_price mb-0">
                    €
                    {(item?.itemQtyTotal).toFixed(2).toString().split(".")
                      .length > 1
                      ? (item?.itemQtyTotal)
                        .toFixed(2)
                        .toString()
                        .split(".")[0] +
                      trans("dot") +
                      (item?.itemQtyTotal).toFixed(2).toString().split(".")[1]
                      : (item?.itemQtyTotal)
                        .toFixed(2)
                        .toString()
                        .split(".")[0]}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="line_separator mt-4 mb-4"></div>
      <div className="row m-0">
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
          >
            <Alert
              onClose={handleClose}
              severity={copenCode == 0 ? "error" : "success"}
              style={{
                backgroundColor: copenCode == 0 ? "red" : "green",
                color: "white",
              }}
              sx={{ width: "100%" }}
            >
              {trans(message)}
            </Alert>
          </Snackbar>
        </Stack>
        <div className="col-9 pe-1_ ps-0">
          <TextField
            label={trans("Discount Code")}
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            name="coupon"
            value={discountCode}
            onChange={(e) => setDiscount(e)}
            disabled={copenCode === 0 ? false : true}
          />
        </div>
        <div className="col-3 ps-1 pe-0">
          {copenCode === 0 && (
            <Button
              className="new_discount_code_use_btn"
              disabled={discountCode === ""}
              onClick={getCoupon}
              style={{ height: "100%" }}
            >
              {loading === true ? (
                <Spinner
                  animation="border"
                  variant="light"
                  style={{ height: 24, width: 24 }}
                />
              ) : (
                <i
                  class="fas fa-check"
                  style={{ color: "white", fontWeight: "bolder" }}
                ></i>
              )}
            </Button>
          )}
          {copenCode !== 0 && (
            <Button
              className="discount_code_use_btn_success"
              onClick={() => {
                setCopenCode(0);
                setDiscountCode("");
                setMessage(trans("Coupon removed successfully"));
                dispatch(
                  checkoutFormPushData({
                    key: "coupon_code",
                    value: "",
                  })
                );
                dispatch(
                  checkoutFormPushData({
                    key: "couponCodeAmount",
                    value: 0,
                  })
                );
                dispatch(
                  checkoutFormPushData({
                    key: "couponCodeSymbol",
                    value: "",
                  })
                );

                var config = {
                  method: "get",
                  url: `${URL}/checkcoupon?id=${cartId}&coupon=${discountCode}`,
                };
              }}
            >
              <CancelIcon />
            </Button>
          )}
        </div>
      </div>
      {/* <div className="co_horizontal"></div> */}
      <div className="co__order_summary_subtotal co__new_order_summary_subtotal">
        <div className="total_item_box co__new_order_summary_price_box">
          <p className="m_title form_labels">{trans("Total Items")}</p>
          <p className="total_item_nno form_labels">{products.length}</p>
        </div>
        <div className="subtotal_box co__new_order_summary_price_box">
          <p className="m_title form_labels">{trans("Subtotal")}</p>
          <p className="subtotal_price">
            <span className="form_labels">
              €
              {grandTotal != null && grandTotal.toString().split(".").length > 1
                ? grandTotal.toString().split(".")[0] +
                trans("dot") +
                grandTotal.toString().split(".")[1]
                : grandTotal.toString().split(".")[0]}
            </span>
          </p>
        </div>

        <div className="subtotal_box co__new_order_summary_price_box">
          <p className="m_title form_labels">{trans("Discount")}</p>
          {copenCode == 0 ? (
            <p className="subtotal_price">
              <span className="form_labels">€{copenCode}</span>
            </p>
          ) : (
            <p
              className="subtotal_price form_labels"
              style={{ color: "green" }}
            >
              <span className="me-1">{copenCode}</span>
              <span>{copenCodeSymbol}</span>
            </p>
          )}
        </div>
        <div className="line_separator my-3"></div>
        <div className="shipment_box co__new_order_summary_price_box new_grand_total">
          <p className="m_title form_labels">{trans("Grand total")}</p>
          {copenCode == 0 && (
            <p className="grandtotal_price form_labels">
              <span className="euro_logo">€</span>
              <span>
                {grandTotal != null &&
                  grandTotal.toString().split(".").length > 1
                  ? grandTotal.toString().split(".")[0] +
                  trans("dot") +
                  grandTotal.toString().split(".")[1]
                  : grandTotal.toString().split(".")[0]}
              </span>
            </p>
          )}
          {grandTotal != null && copenCodeSymbol != "%"
            ? copenCode != 0 &&
            copenCode <= grandTotal && (
              <p className="subtotal_price form_labels">
                <span className="euro_logo">€</span>
                <span>
                  {grandTotal != null &&
                    (grandTotal - copenCode).toFixed(2).toString().split(".")
                      .length > 1
                    ? (grandTotal - copenCode)
                      .toFixed(2)
                      .toString()
                      .split(".")[0] +
                    trans("dot") +
                    (grandTotal - copenCode)
                      .toFixed(2)
                      .toString()
                      .split(".")[1]
                    : (grandTotal - copenCode)
                      .toFixed(2)
                      .toString()
                      .split(".")[0]}
                </span>
              </p>
            )
            : grandTotal != null &&
            copenCode != 0 &&
            copenCode <= grandTotal && (
              <p className="grandtotal_price form_labels">
                <span className="euro_logo">€</span>
                <span>
                  {(grandTotal - (grandTotal * copenCode) / 100)
                    .toFixed(2)
                    .toString()
                    .split(".").length > 1
                    ? (grandTotal - (grandTotal * copenCode) / 100)
                      .toFixed(2)
                      .toString()
                      .split(".")[0] +
                    trans("dot") +
                    (grandTotal - (grandTotal * copenCode) / 100)
                      .toFixed(2)
                      .toString()
                      .split(".")[1]
                    : (grandTotal - (grandTotal * copenCode) / 100)
                      .toFixed(2)
                      .toString()
                      .split(".")[0]}
                </span>
              </p>
            )}
          {grandTotal != null && copenCodeSymbol != "%"
            ? copenCode > grandTotal && (
              <p className="grandtotal_price form_labels">
                <span className="euro_logo">€</span>
                <span>
                  {(grandTotal - grandTotal).toFixed(2).toString().split(".")
                    .length > 1
                    ? (grandTotal - grandTotal)
                      .toFixed(2)
                      .toString()
                      .split(".")[0] +
                    trans("dot") +
                    (grandTotal - grandTotal)
                      .toFixed(2)
                      .toString()
                      .split(".")[1]
                    : (grandTotal - grandTotal)
                      .toFixed(2)
                      .toString()
                      .split(".")[0]}
                </span>
              </p>
            )
            : grandTotal != null &&
            copenCode > grandTotal && (
              <p className="grandtotal_price form_labels">
                <span className="euro_logo">€</span>
                <span>
                  {(grandTotal - (grandTotal * copenCode) / 100)
                    .toFixed(2)
                    .toString()
                    .split(".").length > 1
                    ? (grandTotal - (grandTotal * copenCode) / 100)
                      .toFixed(2)
                      .toString()
                      .split(".")[0] +
                    trans("dot") +
                    (grandTotal - (grandTotal * copenCode) / 100)
                      .toFixed(2)
                      .toString()
                      .split(".")[1]
                    : (grandTotal - (grandTotal * copenCode) / 100)
                      .toFixed(2)
                      .toString()
                      .split(".")[0]}
                </span>
              </p>
            )}
          {/* -------- */}
          {copenCode === 0 &&
            dispatch(
              checkoutFormPushData({
                key: "totalPayPrice",
                value: grandTotal != null ? grandTotal.toFixed(2) : 0,
              })
            )}
          {grandTotal != null && copenCodeSymbol != "%"
            ? copenCode !== 0 &&
            copenCode <= grandTotal &&
            dispatch(
              checkoutFormPushData({
                key: "totalPayPrice",
                value: (grandTotal - copenCode).toFixed(2),
              })
            )
            : grandTotal != null &&
            copenCode !== 0 &&
            copenCode <= grandTotal &&
            dispatch(
              checkoutFormPushData({
                key: "totalPayPrice",
                value: (grandTotal - (grandTotal * copenCode) / 100).toFixed(
                  2
                ),
              })
            )}
          {grandTotal != null && copenCodeSymbol != "%"
            ? copenCode > grandTotal &&
            dispatch(
              checkoutFormPushData({
                key: "totalPayPrice",
                value: (grandTotal - grandTotal).toFixed(2),
              })
            )
            : grandTotal != null &&
            copenCode > grandTotal &&
            dispatch(
              checkoutFormPushData({
                key: "totalPayPrice",
                value: (grandTotal - (grandTotal * copenCode) / 100).toFixed(
                  2
                ),
              })
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
