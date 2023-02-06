/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Input,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  Button,
  Badge,
  Table,
  CardFooter,
  FormGroup,
  Label,
} from "reactstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import "./customer_cart.css";
import { translate } from "react-switch-lang";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import DataTable from "../dataTable/dataTable";
import axios from "axios";
import { URL } from "../../env";

import SweetAlert from "sweetalert2";

import { SupplierCustomerCartTotal } from "../../redux/supplier_customer/actions";
import { useDispatch, useSelector } from "react-redux";

const customer_cart = (props) => {
  const trans = props.t;

  const [myCart, setMyCart] = useState(1);

  const [CartData, setCartData] = useState(null);
  const [CartDeliveryCompany, setCartDeliveryCompany] = useState(null);

  const [AssociatedSupplierData, setAssociatedSupplierData] = useState(null);
  const [AssociatedRuleData, setAssociatedRuleData] = useState(null);
  const [DeliveryDates, setDeliveryDates] = useState([]);

  const [LoadingDeliveryData, setLoadingDeliveryData] = useState(true);

  const [Verticalcenter, setVerticalcenter] = useState(false);

  const [DefaultDeliveryDate, setDefaultDeliveryDate] = useState(null);

  const [CommentData, setCommentData] = useState(null);

  const [Message, setMessage] = useState(null);
  const [alert, setalert] = useState(false);
  const [store_id, setStoreId] = useState(null);
  const [userStore, setUserStore] = useState(null);

  const dispatch = useDispatch();
  const Displayalert = (name, id) => {
    setalert(true);

    SweetAlert.fire({
      title: trans("Select a store first"),
      icon: "warning",
      reverseButtons: trans("OK"),
    });
  };

  const Verticalcentermodaltoggle = async (delivery_company_id) => {
    // console.log(
    //   "CART FILKTERERERE ---- ",
    //   CartData.filter(
    //     (item2, index2) =>
    //       item.delivery_company.delivery_company_id ==
    //       item2.delivery_company.delivery_company_id
    //   )
    // );

    let selectedStore = JSON.parse(localStorage.getItem("selected_store"));
    console.log("store idddddd", store_id);
    if (selectedStore == null) {
      Displayalert();
    } else if (selectedStore !== null) {
      setLoadingDeliveryData(true);

      const cart_data_filter_supplier = CartData.filter(
        (item2, index2) =>
          item2.delivery_company != null &&
          delivery_company_id == item2.delivery_company.delivery_company_id
      );
      var suppliers_id = [];
      cart_data_filter_supplier.map((item, index) =>
        suppliers_id.push(item.supplier.id)
      );

      var selected_delivery_date = null;

      var last_date_data_element = null;
      var rule_data = null;
      var date_data_array = [];

      var all_valid_dates = [];
      var selected_days = [];
      var day_in_words_array = [];
      var time = null;

      setDeliveryDates([]);

      console.log("DEVV COMM IDD", delivery_company_id);
      setVerticalcenter(!Verticalcenter);

      axios
        .post(
          URL + "/get_rule",
          {
            suppliers_id: suppliers_id,
            customer_id: atob(localStorage.getItem("user_id")),
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          }
        )
        .then((response) => {
          console.log("RESPONSE RULE DATA ---- ", response);
          if (response.data.success == true) {
            rule_data = response.data.rule;
            setAssociatedRuleData(rule_data);
            setAssociatedSupplierData(response.data.supplier);
            console.log("REULE DATAA --- ", rule_data);
            var selected_days = rule_data.delivery_days.split(",");
            var d = new Date();
            var getTot = parseInt(rule_data.treatment_time) + 30;

            console.log("GET TOTALLL --- ", getTot);
            var sat = new Array();
            var sun = new Array();

            for (var i = 0; i <= getTot; i++) {
              // console.log("IIIIIIIIIII", i);
              var newDate = new Date();
              newDate.setDate(newDate.getDate() + i);
              // console.log(i + "-" + newDate.getDay());
              if (newDate.getDay() == 0) {
                sun.push(moment(newDate).format("YYYY-MM-DD"));
              }
              if (newDate.getDay() == 6) {
                sat.push(moment(newDate).format("YYYY-MM-DD"));
              }
            }
            console.log("SATURDAYSSSSS", sat);
            console.log("SUNDAYSSSS", sun);
            var date_increment = 0;
            for (var i = 0; i <= parseInt(rule_data.treatment_time) + 1; i++) {
              for (var j = 0; j < 7; j++) {
                var new_date = new Date();
                selected_days = rule_data.delivery_days.split(",");
                var get_hour = new_date.getHours();
                var get_minute = new_date.getMinutes();
                time = get_hour + ":" + get_minute;
                new_date.setDate(new_date.getDate() + date_increment);
                var day_in_words = new_date.toLocaleString("en-us", {
                  weekday: "long",
                });
                day_in_words_array.push(day_in_words);

                var date_format_ymd = moment(new_date).format("YYYY-MM-DD");
                console.log("DATE FORMAT YMD ---- ", date_format_ymd);
                all_valid_dates.push(date_format_ymd);
                all_valid_dates.sort();
                // console.log("SELECTED DAYSS --- ", selected_days);

                date_increment++;
              }
            }
            DateComparisonWithDB(
              rule_data,
              all_valid_dates,
              selected_days,
              day_in_words_array,
              time,
              sat,
              sun
            );
          } else {
            setLoadingDeliveryData(false);
            setDeliveryDates([]);
            setMessage(response.data.message);
          }
        });
    }
  };

  const DateComparisonWithDB = async (
    supplier_rule,
    all_valid_dates,
    selected_days,
    day_in_words_array,
    current_time,
    saturday_dates_array,
    sunday_dates_array
  ) => {
    if (
      all_valid_dates.length > 0 &&
      selected_days.length > 0 &&
      day_in_words_array.length > 0
    ) {
      var next_delivery_date = [];
      for (var i = 0; i < all_valid_dates.length; i++) {
        // console.log("SELECTED DAYSSS COM ----", selected_days);
        // console.log("DAY IN WORDS ARRAY ---- ", day_in_words_array);
        if (next_delivery_date.length < 5) {
          if (selected_days.includes(day_in_words_array[i].toString())) {
            console.log("DAY IN WORDS", all_valid_dates[i]);
            const db_date_response = await axios.post(
              URL + "/check_db",
              {
                date: all_valid_dates[i],
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token123"),
                },
              }
            );
            if (db_date_response.data != null) {
              console.log("DB RESPONSE DATE ---- ", db_date_response);
              if (db_date_response.data.db == true) {
                // console.log(
                //   "DB RESPONSE DATE STATUS ---- ",
                //   parseFloat(response.data.data.status)
                // );
                if (parseFloat(db_date_response.data.date.status) == 1) {
                  if (
                    parseFloat(current_time) <=
                    parseFloat(supplier_rule.acceptance_time)
                  ) {
                    if (next_delivery_date.length < 5) {
                      next_delivery_date.push(
                        db_date_response.data.date.c_date
                      );
                      setDeliveryDates((prevState) => [
                        ...prevState,
                        db_date_response.data.date.c_date,
                      ]);

                      DeliveryDates.sort();
                    }
                  }
                }
                // else {
                //   if (next_delivery_date.length <= 5) {
                //     next_delivery_date.push(db_date_response.data.data.c_date);
                //     setDeliveryDates((prevState) => [
                //       ...prevState,
                //       db_date_response.data.c_date,
                //     ]);

                //     DeliveryDates.sort();
                //   }
                // }
              } else {
                console.log(
                  "ELSE NOT FOUND IN DB --- ",
                  db_date_response.data.data
                );
                if (
                  !saturday_dates_array.includes(db_date_response.data.date) &&
                  !sunday_dates_array.includes(db_date_response.data.date)
                ) {
                  // console.log(
                  //   "CHECK DATE DATA ARRAY  ---- ",
                  //   all_valid_dates[i],
                  //   "--- TREAT ---",
                  //   parseInt(parseInt(supplier_rule.treatment_time) + 1),
                  //   " ---- NDD ----",
                  //   next_delivery_date.length
                  // );
                  if (
                    parseFloat(current_time) <=
                    parseFloat(supplier_rule.acceptance_time)
                  ) {
                    // if (
                    //   parseInt(date_data_array.length) <
                    //   parseInt(supplier_rule.treatment_time)
                    // ) {
                    //   date_data_array.push(db_date_response.data);
                    // } else {
                    if (next_delivery_date.length < 5) {
                      next_delivery_date.push(db_date_response.data.date);
                      console.log("DELIVERY DATE APPEND");

                      setDeliveryDates((prevState) => [
                        ...prevState,
                        db_date_response.data.date,
                      ]);

                      DeliveryDates.sort();
                    }
                    // }
                  } else {
                    // if (
                    //   date_data_array.length <
                    //   parseInt(parseInt(supplier_rule.treatment_time) + 1)
                    // ) {
                    //   date_data_array.push(db_date_response.data);
                    // }
                    //  else {
                    if (next_delivery_date.length < 5) {
                      next_delivery_date.push(db_date_response.data.date);

                      setDeliveryDates((prevState) => [
                        ...prevState,
                        db_date_response.data.date,
                      ]);

                      DeliveryDates.sort();
                    }
                    // }
                  }
                }
              }
              // console.log("NEXT DEV DATESS --- ", next_delivery_date);
              // if (
              //   date_data_array.length ==
              //   parseInt(parseInt(supplier_rule.treatment_time) + 1)
              // ) {
              //   date_data_array.shift();
              // }
              // if (next_delivery_date.length == 5) {
              //   next_delivery_date.shift();
              //   console.log("NEXT DEV DATESS 222 --- ", next_delivery_date);
              //   break;
              // }
            }
          }
        }
      }

      DeliveryDates.sort();
      if (next_delivery_date.length == 5) {
        console.log("DELIVERY DATESSS--- ", DeliveryDates);
        setDefaultDeliveryDate(next_delivery_date[0]);
        setLoadingDeliveryData(false);
      }
    }
  };

  const navigate = useNavigate();

  const ChangeDeliveryDate = (event) => {
    // console.log("DEF DEVV DATE", event.target.value);
    setDefaultDeliveryDate(event.target.value);
  };

  const SubmitDeliveryCompanyData = (delivery_company_id) => {
    if (delivery_company_id == "no_delivery_company") {
      toast.error(trans("No delivery company associated with supplier"));
    }
    const cart_data_filter = CartData.filter(
      (item2, index2) =>
        item2.delivery_company != null &&
        delivery_company_id == item2.delivery_company.delivery_company_id
    );
    var carts_id = [];
    cart_data_filter.map(
      (item, index) => item.cart_items.length > 0 && carts_id.push(item.cart.id)
    );

    console.log("CARTS IDDD SUBMIT ---- ", carts_id);
    console.log(
      "CUSTOMER ID SUBMIT --- ",
      atob(localStorage.getItem("user_id"))
    );
    console.log("CUSTOMER ID SUBMIT --- ", AssociatedSupplierData.id);
    console.log(
      "TREATMENT TIME SUBMIT --- ",
      AssociatedRuleData.treatment_time
    );
    console.log("DELIVERY DAY SUBMIT --- ", DefaultDeliveryDate);

    console.log("DELIVERY COMMENT DATA ---- ", CommentData);

    const user_id = atob(localStorage.getItem("user_id"));

    axios
      .get(
        URL +
          `/order/confirmed/${user_id}/${carts_id}/${CommentData}/${DefaultDeliveryDate}/${store_id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      )
      .then((response) => {
        console.log("RESPONSE ORDER Here---", response);
        if (response.data.success) {
          const GetCartCount = async () => {
            axios
              .get(URL + "/cart", {
                params: { user_id: atob(localStorage.getItem("user_id")) },
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token123"),
                },
              })
              .then((response) => {
                console.log("CARTTTTTTTTTTTT COUNTTTTTTTTTT", response);

                dispatch(
                  SupplierCustomerCartTotal(
                    response.data.cart_page_array.length
                  )
                );
              });
          };
          GetCartCount();
          setVerticalcenter(!Verticalcenter);
          navigate("/supplierCustomerOrder/RD");
        }
      });
  };

  const columns = [
    { field: "index", headerName: "#", width: 80 },
    {
      field: "product['name']",
      headerName: trans("Name"),
      // width: 120,
      flex: 2,
      renderCell: (cellValues) => {
        return <h6>{cellValues.row.product.name}</h6>;
      },
      valueGetter: (cellValues) => cellValues.row.product.name,
    },

    {
      field: "quantity",
      headerName: trans("Required Quantity"),
      // width: 100,
      flex: 1,
    },
    {
      field: "min_quantity",
      headerName: trans("Minimum Quantity"),
      // width: 100,
      flex: 1,
    },
    {
      field: "unit_price",
      headerName: trans("Price (€)"),
      flex: 1,
    },
    {
      field: "total",
      headerName: trans("Total (€)"),
      // width: 100,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <h6>
            {parseFloat(
              parseFloat(cellValues.row.unit_price) *
                parseFloat(cellValues.row.quantity)
            ).toFixed(2)}
          </h6>
        );
      },
      valueGetter: (cellValues) => {
        return (
          parseFloat(cellValues.row.unit_price) *
          parseFloat(cellValues.row.quantity)
        );
      },
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            {(role == "SuperAdmin" ||
              permissions.match("delete") != null ||
              role == "Supplier_Customer") && (
              <Button
                color="danger"
                outline
                onClick={() => DeleteProduct(cellValues.row)}
              >
                <i className="fa fa-times"></i>
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const DeleteProduct = async (row) => {
    console.log("ROWWW -DELETEDD --- ", row);

    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Once deleted, you will not be able to recover it!"),
      icon: "error",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Delete"),
      reverseButtons: true,
    }).then((result) => {
      // console.log("RESULTTTT ", result);
      if (result.value) {
        axios
          .get(URL + `/cart/item/remove/${row.cart_id}/${row.product_id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })
          .then((response) => {
            if (response.data.success == true) {
              DeleteCartProduct(row);
              const GetCartCount = async () => {
                axios
                  .get(URL + "/cart", {
                    params: {
                      user_id: atob(localStorage.getItem("user_id")),
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token123"),
                      },
                    },
                  })
                  .then((response) => {
                    console.log("CARTTTTTTTTTTTT COUNTTTTTTTTTT", response);

                    dispatch(
                      SupplierCustomerCartTotal(
                        response.data.cart_page_array.length
                      )
                    );
                  });
              };
              GetCartCount();
              toast.success(trans("Cart Item Is Removed Successfully"));
            }
          })
          .catch((error) => {
            console.log("ERROR ---- ", error);
          });
      }
    });
  };

  const DeleteCartProduct = (row) => {
    const deleted_cart_product = CartData;
    const find_cart_array = deleted_cart_product.find(
      (item) => item.cart.id == row.cart_id
    );
    const find_cart_array_index = deleted_cart_product.findIndex(
      (item) => item.cart.id == row.cart_id
    );
    if (deleted_cart_product[find_cart_array_index].cart_items.length > 1) {
      const find_delete_cart_item = deleted_cart_product[
        find_cart_array_index
      ].cart_items.find((item) => item.id == row.id);
      deleted_cart_product[find_cart_array_index].cart.total =
        deleted_cart_product[find_cart_array_index].cart.total -
        parseFloat(find_delete_cart_item.quantity) *
          parseFloat(find_delete_cart_item.unit_price);
      const delete_cart_item = deleted_cart_product[
        find_cart_array_index
      ].cart_items.filter((item) => item.id != row.id);
      deleted_cart_product[find_cart_array_index].cart_items = delete_cart_item;
    } else {
      deleted_cart_product.splice(find_cart_array_index, 1);
    }
    const delivery_companies_id = deleted_cart_product.map(
      (item) =>
        item2.delivery_company != null &&
        item.delivery_company.delivery_company_id
    );

    const delivery_company_duplication_state = delivery_companies_id.map(
      (item, index) => delivery_companies_id.indexOf(item) != index
    );
    setCartDeliveryCompany(delivery_company_duplication_state);
    setCartData(deleted_cart_product);
  };

  console.log("CART DATAAAAA ----- ", CartData);

  const location = useLocation();

  const [valueChanged, setValueChanged] = useState(undefined);
  let selectedStore;

  useEffect(() => {
    if (valueChanged != undefined) {
      let selected = JSON.parse(localStorage.getItem("selected_store"));
      setUserStore(selected);
      setStoreId(selected.id);
      selectedStore = selected;
    }
  }, [valueChanged]);

  useEffect(() => {
    window.addEventListener("newEvent", () => {
      setValueChanged(!valueChanged);
    });
    const getCustomerCart = async () => {
      if (localStorage.getItem("user_id") != null) {
        axios
          .get(URL + "/cart", {
            params: { user_id: atob(localStorage.getItem("user_id")) },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })
          .then((response) => {
            console.log("RESPONSE CART ----", response);

            const delivery_companies_id = response.data.cart_page_array.map(
              (item) =>
                item.delivery_company != null &&
                item.delivery_company.delivery_company_id
            );
            // console.log("DELIVERY COMMM ---- ", delivery_companies_id);
            const delivery_company_duplication_state =
              delivery_companies_id.map(
                (item, index) => delivery_companies_id.indexOf(item) != index
              );

            setCartData(response.data.cart_page_array);
            setCartDeliveryCompany(delivery_company_duplication_state);
          })
          .catch((error) => {
            console.log("ERROR --- ", error);
          });
      } else {
        toast.error(trans("Please Login To Continue"));
      }
    };
    getCustomerCart();
    selectedStore = JSON.parse(localStorage.getItem("selected_store"));
    if (selectedStore != null) {
      console.log("trueees cond");
      setUserStore(selectedStore);
      setStoreId(selectedStore.id);
    }
  }, []);
  console.log("selected store id", store_id);

  var grand_total_products = 0;
  var grand_total = 0;

  console.log("CART DATA ---- ", CartData);

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Supplier Customer")}
          title={trans("Customer Cart")}
        />
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <div className="supl_cart__top">
                  <Link
                    to={`${process.env.PUBLIC_URL}/customer-suppliers/customerSuppliers/RD`}
                    className="supl_cart__top_a"
                  >
                    <Button>{trans("Order Again")}</Button>
                  </Link>
                </div>
                {CartData == null || CartData.length == 0 ? (
                  <CardBody>
                    <h5>{trans("Cart Empty")}</h5>
                  </CardBody>
                ) : (
                  <Card className="cust_delivery__company__card">
                    <CardBody>
                      {CartData.map((item, index) => {
                        grand_total_products = 0;
                        return (
                          CartDeliveryCompany != null &&
                          CartDeliveryCompany[index] == false &&
                          item.cart_items.length > 0 && (
                            <Accordion
                              className="accordion"
                              defaultExpanded={true}
                            >
                              <AccordionSummary
                                className="cust_delivery__company__card__AccordionSummary"
                                expandIcon={
                                  <i
                                    className="fa fa-chevron-down"
                                    style={{ color: "#fff" }}
                                  ></i>
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>
                                  <div className="cust_delevery_company_detail">
                                    {item.delivery_company != null && (
                                      <div className="col_left">
                                        <h5>
                                          {trans("Delivery Company")}:{" "}
                                          {item.delivery_company.name}
                                        </h5>
                                      </div>
                                    )}
                                    <div
                                      className={
                                        item.delivery_company != null &&
                                        `col_right`
                                      }
                                    >
                                      <Badge color="warning">
                                        {trans("Unconfirmed")}
                                      </Badge>
                                      <h6 className="total">
                                        {trans("Total")}:{" "}
                                        {item.delivery_company != null
                                          ? CartData.filter(
                                              (item11, index11) =>
                                                item.delivery_company != null &&
                                                item11.delivery_company !=
                                                  null &&
                                                item.delivery_company
                                                  .delivery_company_id ==
                                                  item11.delivery_company
                                                    .delivery_company_id
                                            ).map((item22, index22) => {
                                              grand_total_products =
                                                item22.cart.total +
                                                grand_total_products;
                                            })
                                          : CartData.map((item33, index33) => {
                                              grand_total_products =
                                                item33.cart.total +
                                                grand_total_products;
                                            })}
                                        <span>
                                          {item.delivery_company != null
                                            ? grand_total_products <
                                              item.delivery_company
                                                .minimum_order_amount
                                              ? (grand_total =
                                                  grand_total_products +
                                                  item.delivery_company
                                                    .delivery_fee)
                                              : (grand_total =
                                                  grand_total_products)
                                            : (grand_total =
                                                grand_total_products)}
                                        </span>
                                        {item.delivery_company != null &&
                                          grand_total_products <
                                            item.delivery_company
                                              .minimum_order_amount && (
                                            <Badge color="danger">
                                              Fee Applied
                                            </Badge>
                                          )}
                                      </h6>
                                      {item.delivery_company != null && (
                                        <h6 className="total">
                                          {trans("Delivery Minimum Amount")}:{" "}
                                          <span>
                                            {" "}
                                            {item.delivery_company != null &&
                                              item.delivery_company
                                                .minimum_order_amount}
                                          </span>
                                        </h6>
                                      )}
                                      {item.delivery_company != null && (
                                        <h6 className="total">
                                          {trans("Delivery Fee")}:{" "}
                                          <span>
                                            {item.delivery_company != null &&
                                              item.delivery_company
                                                .delivery_fee}
                                          </span>
                                        </h6>
                                      )}
                                    </div>
                                  </div>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  {item.delivery_company != null
                                    ? CartData.filter(
                                        (item2, index2) =>
                                          item.delivery_company != null &&
                                          item2.delivery_company != null &&
                                          item.delivery_company
                                            .delivery_company_id ==
                                            item2.delivery_company
                                              .delivery_company_id
                                      ).map((item3, index3) => {
                                        return (
                                          item3.cart_items.length > 0 && (
                                            <div className="cust_delevery_supplier_details">
                                              <Card className="card_div">
                                                <CardHeader className="header">
                                                  <h5>
                                                    {trans("Supplier")}:{" "}
                                                    {item3.supplier.name}
                                                  </h5>
                                                  <h5 className="total">
                                                    Total:{" "}
                                                    <span>
                                                      {parseFloat(
                                                        item3.cart.total
                                                      )}
                                                    </span>
                                                  </h5>
                                                </CardHeader>
                                                <CardBody>
                                                  <div>
                                                    <Card className="cust_delevery_supplier_details_table">
                                                      <DataTable
                                                        columns={columns}
                                                        rows={item3.cart_items}
                                                        columnsHidden={{
                                                          min_quantity:
                                                            item3.supplier
                                                              .min_req_qty == 1
                                                              ? true
                                                              : false,
                                                        }}
                                                      ></DataTable>
                                                      <div className="modify_button_wrapped">
                                                        <Link
                                                          to={`/supplierEditCustomerCart/${item3.supplier.id}/RD`}
                                                        >
                                                          <Button>
                                                            {trans("Modify")}
                                                          </Button>
                                                        </Link>
                                                      </div>
                                                    </Card>
                                                  </div>
                                                </CardBody>
                                              </Card>
                                            </div>
                                          )
                                        );
                                      })
                                    : CartData.map((item4, index4) => {
                                        return (
                                          item4.cart_items.length > 0 && (
                                            <div className="cust_delevery_supplier_details">
                                              <Card className="card_div">
                                                <CardHeader className="header">
                                                  <h5>
                                                    {trans("Supplier")}:{" "}
                                                    {item4.supplier.name}
                                                  </h5>
                                                  <h5 className="total">
                                                    Total:{" "}
                                                    <span>
                                                      {parseFloat(
                                                        item4.cart.total
                                                      )}
                                                    </span>
                                                  </h5>
                                                </CardHeader>
                                                <CardBody>
                                                  <div>
                                                    <Card className="cust_delevery_supplier_details_table">
                                                      <DataTable
                                                        columns={columns}
                                                        rows={item4.cart_items}
                                                        columnsHidden={{
                                                          min_quantity:
                                                            item4.supplier
                                                              .min_req_qty == 1
                                                              ? true
                                                              : false,
                                                        }}
                                                      ></DataTable>
                                                      <div className="modify_button_wrapped">
                                                        <Link
                                                          to={`/supplierEditCustomerCart/${item4.supplier.id}/RD`}
                                                        >
                                                          <Button>
                                                            {trans("Modify")}
                                                          </Button>
                                                        </Link>
                                                      </div>
                                                    </Card>
                                                  </div>
                                                </CardBody>
                                              </Card>
                                            </div>
                                          )
                                        );
                                      })}
                                  <div className="confirm__button__wrapped mt-3">
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        Verticalcentermodaltoggle(
                                          item.delivery_company != null &&
                                            item.delivery_company
                                              .delivery_company_id
                                        )
                                      }
                                    >
                                      {trans("Confirmed")}
                                    </Button>
                                  </div>
                                  <Modal
                                    isOpen={Verticalcenter}
                                    toggle={Verticalcentermodaltoggle}
                                    centered
                                  >
                                    <ModalHeader
                                      toggle={Verticalcentermodaltoggle}
                                    >
                                      {trans("Delivery Information")}
                                    </ModalHeader>
                                    <ModalBody>
                                      {LoadingDeliveryData ? (
                                        <div className="loader-box">
                                          <div className="loader-5"></div>
                                        </div>
                                      ) : (
                                        <div id="data">
                                          {DeliveryDates.length > 0 ? (
                                            <div style={{ padding: "10px" }}>
                                              {userStore != null && (
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    justifyContent:
                                                      "space-between",
                                                  }}
                                                >
                                                  <p>{trans("Store")}</p>
                                                  <p id="store">
                                                    {userStore.name_fr}
                                                  </p>
                                                </div>
                                              )}
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <p>{trans("Customer")}</p>
                                                <p id="customer">
                                                  {localStorage.getItem("Name")}
                                                </p>
                                              </div>

                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <p>{trans("Supplier")}</p>
                                                <p id="supplier">
                                                  {AssociatedSupplierData !=
                                                    null &&
                                                    AssociatedSupplierData.name}
                                                </p>
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <p>{trans("Treatment Days")}</p>
                                                <p id="treatment_day">
                                                  {AssociatedRuleData != null &&
                                                    AssociatedRuleData.treatment_time}
                                                </p>
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <p>{trans("Delivery Days")}</p>
                                                <p id="delivery_day">
                                                  Your Order will be delivered
                                                  on{" "}
                                                  {DefaultDeliveryDate !=
                                                    null && DefaultDeliveryDate}
                                                </p>
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <p>Price</p>
                                                <p id="price">
                                                  {grand_total} €
                                                </p>
                                              </div>

                                              <div
                                                className="form-group"
                                                id="select_delivery_date"
                                              >
                                                <label className="form-label">
                                                  {trans(
                                                    "Select Delivery Date"
                                                  )}
                                                </label>
                                                <Row className="m-0">
                                                  {DeliveryDates.map(
                                                    (item, index) => (
                                                      <Col xs="3" sm="4" md="4">
                                                        <div className="radio radio-secondary">
                                                          <Input
                                                            id={item}
                                                            type="radio"
                                                            name="delivery_date"
                                                            value={item}
                                                            key={
                                                              DefaultDeliveryDate ==
                                                              item
                                                                ? true
                                                                : false
                                                            }
                                                            defaultChecked={
                                                              DefaultDeliveryDate ==
                                                              item
                                                                ? true
                                                                : false
                                                            }
                                                            onChange={
                                                              ChangeDeliveryDate
                                                            }
                                                          />
                                                          <Label for={item}>
                                                            {item}
                                                          </Label>
                                                        </div>
                                                      </Col>
                                                    )
                                                  )}
                                                </Row>
                                              </div>
                                              <div>
                                                <label>
                                                  {trans("COMMENTS")}
                                                </label>
                                                <br />
                                                <textarea
                                                  name="comments"
                                                  className="form-control"
                                                  id="comments"
                                                  cols="30"
                                                  rows="3"
                                                  required
                                                  onChange={(event) =>
                                                    setCommentData(
                                                      event.target.value
                                                    )
                                                  }
                                                ></textarea>
                                              </div>
                                            </div>
                                          ) : (
                                            <div style={{ padding: "10px" }}>
                                              <p>
                                                {Message ==
                                                  "no supplier associated rule found" &&
                                                  trans(
                                                    "no supplier associated rule found"
                                                  )}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        color="secondary"
                                        onClick={Verticalcentermodaltoggle}
                                      >
                                        {trans("Cancel")}
                                      </Button>
                                      <Button
                                        color="primary"
                                        onClick={() =>
                                          SubmitDeliveryCompanyData(
                                            item.delivery_company != null
                                              ? item.delivery_company
                                                  .delivery_company_id
                                              : "no_delivery_company"
                                          )
                                        }
                                      >
                                        {trans("Confirmed")}
                                      </Button>
                                    </ModalFooter>
                                  </Modal>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          )
                        );
                      })}
                    </CardBody>
                    <CardFooter className="confirm__button__wrapped__footer"></CardFooter>
                  </Card>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(customer_cart);
