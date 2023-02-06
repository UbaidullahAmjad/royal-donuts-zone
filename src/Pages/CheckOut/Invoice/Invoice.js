/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./Invoice.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import { Container, Divider } from "@mui/material";
import logo from "../../../assets/logo.webp";
import {
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { Email } from "@material-ui/icons";
import { Col } from "react-bootstrap";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteFullCart } from "../../../redux/CartPage/myCartAction";
import { ClearPaypalPaymentInvoiceAction } from "../../../redux/CheckOut/PaymentMethod/Paypal/PaypalPaymentAction";
import { ClearStripePaymentInvoiceAction } from "../../../redux/CheckOut/PaymentMethod/Stripe/StripePaymentAction"
import getWindowDimensions from "../../../Components/Hooks/useWindowDimensions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
// import "./styles.css"

const Invoice = (props) => {
  const { t } = useTranslation();
const trans = t;
  const { screenWidth } = getWindowDimensions();
  const location = useLocation();
  const dispatch = useDispatch();

  let isInvoice = location.state ? location?.state?.isInvoice : false;
  let orderItems = location.state && location?.state?.orderItems;
  let order = location.state && location?.state?.order;
  let cardData = location.state && location?.state?.cardData;
  let user = location.state?.user ?? null;
  let userRole = location.state && location?.state?.user_role;
  let delivery_data_info =
    location.state && location?.state?.delivery_info_data;
  let isDefaultValues = location?.state?.isDefaultValues ?? false
  let user_new_info = location.state?.user_new_info ?? null;
  let couponSymbol = location.state
    ? location?.state?.symbol != "" && location?.state?.symbol != undefined
      ? location?.state?.symbol
      : "€"
    : "€";

  const navigate = useNavigate();

  const [name, setName] = useState(user?.name);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(user?.email);

  useEffect(() => {
    dispatch(deleteFullCart());
    dispatch(ClearPaypalPaymentInvoiceAction());
    dispatch(ClearStripePaymentInvoiceAction());

    if (isDefaultValues == false) {

      if (user_new_info != undefined && user_new_info != null && user_new_info != "") {
        setName(user_new_info?.first_name + " " + user_new_info?.last_name);
        setEmail(
          user_new_info?.email !== null ? user_new_info?.email : user?.email
        );
        setAddress(
          user_new_info?.custome_address +
          ",  " +
          user?.city +
          ",  " +
          user?.zip_code +
          ",  " +
          user?.country
        );
      }
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setAddress(
        user?.address +
        ",  " +
        user?.city +
        ",  " +
        user?.zip_code +
        ", " +
        user?.country
      );
    }
  }, [user_new_info]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  var counter = 0;

  return (
    <>
      {isInvoice == false ? (
        <Navigate to="/produits" replace />
      ) : (
        <Container maxWidth="lg" style={{ marginBottom: 15 }}>
          <div
            className="invoice_image_store_wrapper"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <div className="invoice_logo_image_box">
              <img className={"invoice_logo_image"} src={logo} alt="" />
            </div>
            <div
              className={"invoice_order_store_div"}
              style={{ alignSelf: "center" }}
            >
              <h3 style={{ textAlign: "center" }}>
                {trans("Order")} # : {order?.order_no}
              </h3>
              <h6
                style={{ textAlign: "center" }}
                className="header_invoice_title"
              >
                <b>{trans("Store")}:</b>{" "}
                {/* {delivery_data_info != undefined && delivery_data_info.address} */}
                {delivery_data_info != undefined && delivery_data_info}
              </h6>
              <h6
                style={{ textAlign: "center" }}
                className="header_invoice_title"
              >
                <b>{trans("Order Date")}:</b>{" "}
                {order?.created_at &&
                  moment(order?.created_at).format("ddd, Do MMM, YYYY HH:mm:ss")}
              </h6>
            </div>
            <h6
              style={{ alignSelf: "center" }}
              className="header_invoice_email"
            >
              info@royal-donuts.fr
            </h6>
          </div>
          {screenWidth > 935 ? (
            <div className="printmedia">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2rem",
                }}
              >
                <div>
                  <button
                    className="btn btn-primary p-2 keep_shopping_btn"
                    style={{
                      backgroundColor: "#FF6295",
                      color: "#FFF",
                      fontSize: 11,
                      fontFamily: "JellyDonuts",
                    }}
                    onClick={() => navigate("/produits", { replace: true })}
                  >
                    {trans("Keep Shopping")}
                  </button>
                </div>
                <div className="print_btns">
                  {location.state.zelty_res_data != true && (
                    <button
                      className="btn btn-primary py-2 px-3 me-1 keep_shopping_btn"
                      onClick={() =>
                        navigate("/zelty-invoice", {
                          state: {
                            cardData: location?.state?.cardData,
                            order,
                            orderItems,
                            user,
                            userRole,
                            address,
                            delivery_info_data:
                              location?.state?.delivery_info_data,
                            isDefaultValues: location?.state?.isDefaultValues,
                            user_new_info,
                            symbol: location?.state?.symbol,
                            isInvoice: true,
                            zelty_data: location?.state?.zelty_res_data,
                          },
                        })
                      }
                      style={{
                        backgroundColor: "#FF6295",
                        color: "#FFF",
                        fontSize: 12,
                        fontFamily: "JellyDonuts",
                      }}
                    >
                      Zelty Invoice
                    </button>
                  )}
                  <button
                    className="btn btn-primary py-2 px-3 keep_shopping_btn"
                    onClick={() => window.print()}
                    style={{
                      backgroundColor: "#FF6295",
                      color: "#FFF",
                      fontSize: 12,
                      fontFamily: "JellyDonuts",
                    }}
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-center">
                {location.state.zelty_res_data != true && (
                  <button
                    className="btn btn-success_ py-2 px-3 me-1 keep_shopping_btn"
                    onClick={() =>
                      navigate("/zelty-invoice", {
                        state: {
                          cardData: location?.state?.cardData,
                          order,
                          orderItems,
                          user,
                          userRole,
                          address,
                          delivery_info_data:
                            location?.state?.delivery_info_data,
                          isDefaultValues: location?.state?.isDefaultValues,
                          user_new_info,
                          symbol: location?.state?.symbol,
                          isInvoice: true,
                          zelty_data: location?.state?.zelty_res_data,
                        },
                      })
                    }
                    style={{
                      backgroundColor: "#FF6295",
                      color: "#FFF",
                      fontSize: 12,
                      fontFamily: "JellyDonuts",
                    }}
                  >
                    Zelty Invoice
                  </button>
                )}
              </div>
              <div
                className="top_invoice_back_to_shipping_btn"
                onClick={() => navigate("/produits", { replace: true })}
              >
                <ArrowBackIcon className="icon" />
              </div>
              <div
                className="bottom_invoice_print_btn"
                onClick={() => window.print()}
              >
                <PrintIcon className="icon" />
              </div>
            </>
          )}
          <h2 style={{ textAlign: "center" }} className="order_summary">
            {trans("Order Summary")}
          </h2>
          <div className="detail_div">
            <div className="detail_desc_row">
              <div className="detail_desc_row_inner">
                <h6 className="title">{trans("Name")}:</h6>
                <h6 className="value">
                  {name == undefined ||
                    name == null ||
                    name == "" ||
                    name == "undefined undefined"
                    ? location.state?.allData[0]?.firstName +
                    " " +
                    location.state?.allData[0]?.lastName
                    : name}
                </h6>
              </div>
            </div>
            <div
              // style={{ width: "50%", display: "flex", justifyContent: "end" }}
              className="detail_desc_row"
            >
              <div className="detail_desc_row_inner">
                <h6 className="title">{trans("Email")}:</h6>
                <h6 className="value">
                  {email == undefined || email == null || email == ""
                    ? location?.state?.allData[0]?.contact
                    : email}
                </h6>
              </div>
            </div>

            <div className="detail_desc_row">
              <div className="detail_desc_row_inner">
                <h6 className="title">{trans("Address")}:</h6>
                <h6 className="value" id="address">
                  {/* {address} */}
                  {address == undefined || address == null || address == ""
                    ? location?.state?.allData[0]?.address +
                    ", " +
                    location?.state?.allData[0]?.city +
                    ", " +
                    location?.state?.allData[0]?.postalCode +
                    ", " +
                    location?.state?.allData[0]?.country
                    : address}
                </h6>
              </div>
            </div>
            <div className="detail_desc_row">
              <div className="detail_desc_row_inner">
                <h6 className="title">{trans("Payment-Type")}:</h6>
                <h6 className="value">{"card"}</h6>
              </div>
            </div>
            <div className="detail_desc_row">
              <div className="detail_desc_row_inner">
                <h6 className="title">{trans("Order Method")}:</h6>
                <h6 className="value" style={{ textTransform: "capitalize" }}>
                  {order?.delivery_method
                    ? order.delivery_method
                    : trans("Delivery")}
                </h6>
              </div>
            </div>
            <div className="detail_desc_row">
              <div className="detail_desc_row_inner">
                <h6 className="title">{trans("Delivery Date")}:</h6>
                <h6 className="value">
                  {
                    order != null && order?.delivery_date.toString()
                  }
                </h6>
              </div>
            </div>
          </div>

          <Divider />
          <div className="invoice_table">
            <Paper>
              <TableContainer>
                <Table
                  className="invoice_prod_table"
                  stickyHeader_
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ width: 20 }}>
                        <b>{trans("#")}</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>{trans("Name")}</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>{trans("Quantity")}</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>{trans("Price")}</b>
                      </TableCell>
                      <TableCell align="left">
                        <b>{trans("Sub-Total")}</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderItems
                      //.slice(
                      // page * rowsPerPage,
                      //  page * rowsPerPage + rowsPerPage
                      //)
                      // .filter((item) => item.subtotal > 0)
                      // .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((item) => {
                        return (
                          <TableRow key={item.order_id}>
                            <TableCell align="left">{++counter} </TableCell>
                            <TableCell align="left">
                              {trans(item.product_name)}
                              {item.product_name == "Customized donut" && (
                                <p>
                                  <span className="fw-bold">
                                    {trans("Ingredients")}:{" "}
                                  </span>
                                  {item.customized_ingredients}
                                </p>
                              )}
                            </TableCell>
                            <TableCell align="left">{item.quantity} </TableCell>
                            <TableCell align="left">
                              {
                                (item.unit_total / item.quantity)
                                  .toFixed(2)
                                  .split(".")[0]
                              }
                              {(item.unit_total / item.quantity)
                                .toFixed(2)
                                .split(".").length > 1 && trans("dot")}
                              {(item.unit_total / item.quantity)
                                .toFixed(2)
                                .split(".").length > 1 &&
                                (item.unit_total / item.quantity)
                                  .toFixed(2)
                                  .split(".")[1]}{" "}
                              <span>€</span>
                            </TableCell>
                            <TableCell align="left">
                              {item.unit_total.split(".")[0]}
                              {item.unit_total.split(".").length > 1 &&
                                trans("dot")}
                              {item.unit_total.split(".").length > 1 &&
                                item.unit_total.split(".")[1]}{" "}
                              <span>€</span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="grand_total_detail_wrap">
                <div className="grand_total_detail">
                  <p className="title">{trans("Grand Total")}</p>
                  <p className="value">
                    {order.total.toFixed(2).split(".")[0]}
                    {trans("dot")}
                    {order.total.toFixed(2).split(".")[1]} <span>€</span>
                  </p>
                </div>
                <div className="grand_total_detail">
                  <p className="title">{trans("Discount")}</p>
                  <p className="value">
                    {order.discount} <span>{couponSymbol}</span>
                  </p>
                </div>
                <div className="grand_total_detail">
                  <p className="title">{trans("Total Amount")}</p>
                  <p className="value">
                    {order.grand_total.split(".")[0]}
                    {trans("dot")}
                    {order.grand_total.split(".")[1]} <span>€</span>
                  </p>
                </div>
              </div>
            </Paper>
          </div>
        </Container>
      )}
    </>
  );
};

export default Invoice;
