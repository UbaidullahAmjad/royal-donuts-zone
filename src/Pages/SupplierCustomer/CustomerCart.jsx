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
import { useTranslation, } from "react-i18next";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import DataTable from "../../components/dataTable/dataTable";
import axios from "axios";
import { URL, url } from "../../env";
import SweetAlert from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { SupplierCustomerCartTotal } from "../../redux/supplier_customer/actions";
import {
  SuppllierCustomerCartDataAction,
  DeleteSuppllierCustomerCartItemAction
} from "../../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/CartAction";
import { SuppllierCustomer_CartItemRemoveAction, getSupplierCustomerCartTotalAction } from "../../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/CartItemRemoveAction";
import { SupplierCustomerDeliveryDatesAction } from "../../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/SupplierCustomerDeliveryDatesAction"
import { OrderConfirmedAction } from "../../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/OrderConfirmedAction"

const CustomerCart = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [myCart, setMyCart] = useState(1);

  // const [CartData, setCartData] = useState(null);
  // const [CartDeliveryCompany, setCartDeliveryCompany] = useState(null);
  const getSuppllierCustomerCartData = useSelector((state) => state.getSuppllierCustomerCartData);
  const CartData = getSuppllierCustomerCartData.cartPageList;
  const CartDeliveryCompany = getSuppllierCustomerCartData.CartDeliveryCompany;

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

  const Displayalert = (name, id) => {
    setalert(true);

    SweetAlert.fire({
      title: trans("Select a store first"),
      icon: "warning",
      reverseButtons: trans("OK"),
    });
  };

  const Verticalcentermodaltoggle = async (delivery_company_id) => {
    //   "CART FILKTERERERE ---- ",
    //   CartData.filter(
    //     (item2, index2) =>
    //       item.delivery_company.delivery_company_id ==
    //       item2.delivery_company.delivery_company_id
    //   )
    // );


    let selectedStore = JSON.parse(localStorage.getItem("selected_store"));
    if (selectedStore == null) {
      Displayalert();
    } else if (selectedStore != null) {
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

      setDeliveryDates([]);

      setVerticalcenter(!Verticalcenter);

      getSupplier_Customer_Delivery_DatesCall(store_id, suppliers_id);
    }
  };

  const getSupplier_Customer_Delivery_DatesCall = async (store_id, suppliers_id) => {
    const deliveryDatesResponse = await SupplierCustomerDeliveryDatesAction(store_id, suppliers_id)
    if (deliveryDatesResponse?.data?.success == true) {
      setDeliveryDates(deliveryDatesResponse?.data?.delivery_dates);
      setAssociatedRuleData(deliveryDatesResponse?.data?.rule);
      setAssociatedSupplierData(deliveryDatesResponse?.data?.supplier);
      setLoadingDeliveryData(false);
    } else if (deliveryDatesResponse?.data?.error == true) {
      setLoadingDeliveryData(false);
      setDeliveryDates([]);
      setMessage(deliveryDatesResponse?.data?.message);
    } else {
      toast.error(trans("failed"));
      setLoadingDeliveryData(false);
      setDeliveryDates([]);
    }
  }

  const ChangeDeliveryDate = (event) => {
    setDefaultDeliveryDate(event.target.value);
  };

  const SubmitDeliveryCompanyData = async (delivery_company_id) => {
    if (delivery_company_id == "no_delivery_company") {
      toast.error(trans("No delivery company associated with supplier"));
    } else {
      const cart_data_filter = CartData.filter(
        (item2, index2) =>
          item2.delivery_company != null &&
          delivery_company_id == item2.delivery_company.delivery_company_id
      );
      var carts_id = [];
      cart_data_filter.map(
        (item, index) => item.cart_items.length > 0 && carts_id.push(item.cart.id)
      );


      const modify_order_url = JSON.stringify(`${url}/supplier/customer/order/modify`);

      const formData = new FormData();
      formData.append("user_id", user_id)
      formData.append("cart_id", carts_id)
      formData.append("comments", CommentData)
      formData.append("delivery_date", DefaultDeliveryDate)
      formData.append("store_id", store_id)
      formData.append("url", modify_order_url)

      const OrderConfirmedResponse = await OrderConfirmedAction(formData)
      if (OrderConfirmedResponse?.data?.success == true) {
        if (OrderConfirmedResponse?.data?.message) {
          toast.success(OrderConfirmedResponse?.data?.message)
        }
        const GetCartCount = async () => {
          const cartResponse = await getSupplierCustomerCartTotalAction()
          if (cartResponse?.data?.success == true) {
            dispatch(
              SupplierCustomerCartTotal(
                OrderConfirmedResponse?.data?.cart_page_array.length
              )
            );
          } else if (cartResponse?.data?.error == true) {
            toast.error(trans(cartResponse?.data?.message ?? "failed"));
          } else {
            toast.error(trans("failed"));
          }
        };
        GetCartCount();
        setVerticalcenter(!Verticalcenter);
        navigate("/customer/suppliers/orders");
      } else if (OrderConfirmedResponse?.data?.error == true) {
        toast.error(trans(OrderConfirmedResponse?.data?.message ?? "failed"));
      } else {
        toast.error(trans("failed"));
      }

    }
  };

  const columns = [
    { field: "index", title: "#", width: 80 },
    {
      field: "product['name']",
      title: trans("Name"),
      minWidth: 160,
      flex: 2,
      render: (cellValues) => {
        return <h6>{cellValues.product.name}</h6>;
      },
      valueGetter: (cellValues) => cellValues.product.name,
    },
    {
      field: "quantity",
      title: trans("Required Quantity"),
      // width: 100,
      flex: 1,
    },
    {
      field: "min_quantity",
      title: trans("Minimum Quantity"),
      // width: 100,
      flex: 1,
    },
    {
      field: "unit_price",
      title: trans("Price (€)"),
      minWidth: 110,
      flex: 1,
      render: (cellValues) => {
        return (
          <p>
            {cellValues.unit_price}
            {" "}
            {"(€)"}
          </p>
        )
      }
    },
    {
      field: "total",
      title: trans("Total (€)"),
      minWidth: 120,
      flex: 1,
      render: (cellValues) => {
        return (
          <h6>
            {parseFloat(
              parseFloat(cellValues.unit_price) *
              parseFloat(cellValues.quantity)
            ).toFixed(2)}
            {" "}
            {"(€)"}
          </h6>
        );
      },
      valueGetter: (cellValues) => {
        return (
          parseFloat(cellValues.unit_price) *
          parseFloat(cellValues.quantity)
        );
      },
    },
    {
      field: "action",
      title: trans("Action"),
      flex: 1,
      render: (cellValues) => {
        return (
          <>
            {(role == "SuperAdmin" ||
              permissions.match("delete") != null ||
              role == "Supplier_Customer") && (
                <Button
                  color="danger"
                  outline
                  onClick={() => DeleteProduct(cellValues)}
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
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Once deleted, you will not be able to recover it!"),
      icon: "error",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Delete"),
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {

        const cartItemRemoveResponse = await SuppllierCustomer_CartItemRemoveAction(row.cart_id, row.product_id)
        if (cartItemRemoveResponse?.data?.success == true) {
          DeleteCartProduct(row);
          // dispatch(SuppllierCustomerCartDataAction());
          const cartResponse = await getSupplierCustomerCartTotalAction()
          if (cartResponse?.data?.success == true) {
            dispatch(
              SupplierCustomerCartTotal(
                cartResponse?.data?.cart_page_array.length
              )
            );
            toast.success(trans("Cart Item Is Removed Successfully"));
          } else if (cartResponse?.data?.error == true) {
            toast.error(trans(cartResponse?.data?.message ?? "failed"));
          } else {
            toast.error(trans("failed"));
          }
        } else if (cartItemRemoveResponse?.data?.error == true) {
          toast.error(trans(cartItemRemoveResponse?.data?.message ?? "failed"));
        } else {
          toast.error(trans("failed"));
        }
      }
    });
  };

  const DeleteCartProduct = (row) => {
    dispatch(DeleteSuppllierCustomerCartItemAction(row))
  };

  const location = useLocation();

  const [valueChanged, setValueChanged] = useState(undefined);
  // let selectedStore;
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    if (valueChanged != undefined) {
      let selected = JSON.parse(localStorage.getItem("selected_store"));
      setUserStore(selected);
      setStoreId(selected.id);
      // selectedStore = selected;
      setSelectedStore(selected)
    }
  }, [valueChanged]);

  useEffect(() => {
    window.addEventListener("newEvent", () => {
      setValueChanged(!valueChanged);
    });

    if (localStorage.getItem("user_id") != null) {
      dispatch(SuppllierCustomerCartDataAction())
    } else {
      toast.error(trans("Please Login To Continue"));
    }

    // selectedStore = JSON.parse(localStorage.getItem("selected_store"));
    let selected = JSON.parse(localStorage.getItem("selected_store"));
    if (selected != null && selected != undefined) {
      setSelectedStore(selected);
      setUserStore(selected);
      setStoreId(selected?.id);
    }
    // if (selectedStore != null) {
    //   setUserStore(selectedStore);
    //   setStoreId(selectedStore.id);
    // }
  }, []);

  var grand_total_products = 0;
  var grand_total = 0;

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
                    to={`${process.env.PUBLIC_URL}/suppliers/customer/products/list`}
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
                                        item.delivery_company != null ?
                                          `col_right` : ""
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
                                              item22.cart.total + grand_total_products;
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
                                                parseFloat(grand_total_products +
                                                  item.delivery_company
                                                    .delivery_fee).toFixed(2))
                                              : (grand_total =
                                                grand_total_products.toFixed(2))
                                            : (grand_total =
                                              grand_total_products.toFixed(2))}
                                        </span>
                                        {item.delivery_company != null &&
                                          grand_total_products <
                                          item.delivery_company
                                            .minimum_order_amount && (
                                            <p color="danger" class="badge badge-danger" style={{ display: 'inline-block' }}>
                                              Fee Applied
                                            </p>
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
                                          <div
                                            className="cust_delevery_supplier_details"
                                            style={
                                              index3 != 0
                                                ? { marginTop: 15 }
                                                : {}
                                            }
                                          >
                                            <Card className="card_div">
                                              <CardHeader className="header">
                                                <h5>
                                                  {trans("Supplier")}:{" "}
                                                  {item3.supplier.name}
                                                </h5>
                                                <h5 className="total">
                                                  {trans("Total")}:{" "}
                                                  <span>
                                                    {parseFloat(
                                                      item3.cart.total
                                                    ).toFixed(2)}
                                                  </span>
                                                </h5>
                                              </CardHeader>
                                              <CardBody>
                                                <div>
                                                  <Card className="cust_delevery_supplier_details_table">
                                                    <DataTable
                                                      columns={columns}
                                                      data={item3.cart_items}
                                                      columnsHidden={{
                                                        min_quantity:
                                                          item3.supplier
                                                            .min_req_qty == 1
                                                            ? true
                                                            : false,
                                                      }}
                                                      fitHeight={true}
                                                    ></DataTable>
                                                    <div className="modify_button_wrapped">
                                                      <Link
                                                        to={`/customer/suppliers/cart/edit/${item3.supplier.id}`}
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
                                                      data={item4.cart_items}
                                                      columnsHidden={{
                                                        min_quantity:
                                                          item4.supplier
                                                            .min_req_qty == 1
                                                            ? true
                                                            : false,
                                                      }}
                                                      fitHeight={true}
                                                    ></DataTable>
                                                    <div className="modify_button_wrapped">
                                                      <Link
                                                        to={`/customer/suppliers/cart/edit/${item4.supplier.id}`}
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
                                      color="success"
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
                                        color="danger"
                                        onClick={Verticalcentermodaltoggle}
                                      >
                                        {trans("Cancel")}
                                      </Button>
                                      <Button
                                        color="success"
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

export default CustomerCart;
