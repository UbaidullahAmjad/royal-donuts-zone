/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
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
import "./customer_orders.css";
import { translate } from "react-switch-lang";
import { Link } from "react-router-dom";
import DataTable from "../../dataTable/dataTable";
import axios from "axios";
import { URL } from "../../../env";

import SweetAlert from "sweetalert2";

import {
  SupplierCustomerCartTotal,
  SupplierCustomerRectifyCartTotal,
} from "../../../redux/supplier_customer/actions";
import { useDispatch, useSelector } from "react-redux";

const Customer_Orders = (props) => {
  const trans = props.t;

  const [OrderData, setOrderData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  console.log("order data", OrderData);
  const columns = [
    { field: "order_number", headerName: "Order#", width: 100 },
    { field: "supplier_name", headerName: trans("SUPPLIER NAME"), flex: 1 },
    { field: "user_name", headerName: trans("CUSTOMER NAME"), flex: 1 },
    { field: "order_confirmed", headerName: trans("ORDER DATE"), flex: 1 },
    { field: "delivery_date", headerName: trans("DELIVERY DATE"), flex: 1 },
    {
      field: "order_status",
      headerName: trans("STATUS"),
      flex: 1,
      renderCell: (cellValues) => {
        if (cellValues.row.order_status === "1") {
          return <Badge color="success">{trans("Confirmed")}</Badge>;
        } else if (cellValues.row.order_status === "2") {
          return <Badge color="warning">{trans("Indelivery")}</Badge>;
        } else if (cellValues.row.order_status === "3") {
          return <Badge color="success">{trans("Delivered")}</Badge>;
        } else if (cellValues.row.order_status === "4") {
          return <Badge color="success">{trans("Treated")}</Badge>;
        }
      },
    },

    {
      field: "total",
      headerName: trans("TOTAL €"),
      flex: 1,
      renderCell: (cellValues) => (
        <p>
          {" "}
          {cellValues.value.toString().split(".").length > 1
            ? cellValues.value.toString().split(".")[0] +
              trans("Point") +
              cellValues.value.toString().split(".")[1]
            : cellValues.value.toString().split(".")[0] + " "}
          €
        </p>
      ),
      valueGetter: (cellValues) => cellValues.value,
    },
    {
      field: "action",
      headerName: trans("ACTION"),
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <>
            {
              //  (role == "SuperAdmin" || (permissions.match("edit") != null)) &&
              <Link to={`/supplierCustomerInvoice/${cellValues.row.id}/RD`}>
                <Button color="primary mr-2" outline>
                  <i className="fa fa-file-text-o"></i>
                </Button>
              </Link>
            }
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const getCustomerCart = async () => {
      if (localStorage.getItem("user_id") != null) {
        axios
          .get(URL + "/myorders", {
            params: { user_id: atob(localStorage.getItem("user_id")) },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          })
          .then((response) => {
            console.log("RESPONSE CART ----", response);
            let itemsArray = [];
            setOrderData(response.data.all_orders);
            response.data.all_orders.map((item) => {
              itemsArray.push(item.order);
            });
            setAllOrders(itemsArray);
          })
          .catch((error) => {
            console.log("ERROR --- ", error);
          });
      } else {
        toast.error(trans("Please Login To Continue"));
      }
    };
    getCustomerCart();
  }, []);

  const dispatch = useDispatch();

  const { cartTotal, RectifyTotal } = useSelector(
    (state) => state.SupplierCustomer
  );

  useEffect(() => {
    const GetCartCount = async () => {
      axios
        .get(URL + "/cart", {
          params: {
            user_id: atob(localStorage.getItem("user_id")),
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          },
        })
        .then((response) => {
          console.log("CARTTTTTTTTTTTT COUNTTTTTTTTTT", response);

          dispatch(
            SupplierCustomerCartTotal(response.data.cart_page_array.length)
          );
        });
    };

    const GetRectifyOrderCount = async () => {
      axios
        .get(URL + "/rectify", {
          params: {
            user_id: atob(localStorage.getItem("user_id")),
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token123"),
            },
          },
        })
        .then((response) => {
          console.log("CUSTOMER ORDER RECTIDFY DATA ---- ", response);
          dispatch(
            SupplierCustomerRectifyCartTotal(response.data.all_data.length)
          );
        });
    };
    // if (cartTotal == 0) {
    GetCartCount();
    // }
    GetRectifyOrderCount();
  }, []);

  console.log("all orderssss", allOrders);
  console.log("CUSTOMER ORDER RECITFY TOTAL ----  ", RectifyTotal);

  return (
    <>
      <Fragment>
        <Breadcrumb
          parent={trans("Supplier")}
          title={trans("Supplier Orders")}
        />

        <Container fluid={true}>
          <Row>
            <Col sm="12">
              {OrderData == null || OrderData.length === 0 ? (
                <Card>
                  <CardBody>
                    <h5>{trans("Orders Empty")}</h5>
                  </CardBody>
                </Card>
              ) : (
                <Card className="cust_delivery__company__card">
                  <CardBody>
                    {/* {OrderData.map((item, index) => {
                      return ( */}
                    {/* <Card>
                          <CardBody> */}
                    <DataTable columns={columns} rows={allOrders} />
                    {/* <div className="cust_order_details">
                              <div className="col_left">
                                <h5>
                                  {console.log("gggg")}
                                  {trans("Order")} #: {item.order.order_number}
                                </h5>
                                <h5>
                                  {trans("Supplier Name")} :{" "}
                                  {item.order.supplier_name}
                                </h5>
                                <h5>
                                  {trans("Customer Name")} :{" "}
                                  {localStorage
                                    .getItem("Name")
                                    ?.slice(
                                      0,
                                      localStorage.getItem("Name")?.length - 4
                                    )}
                                </h5>
                                <h5>
                                  {trans("Order Date")} :{" "}
                                  {new Date(
                                    item.order.created_at
                                  ).toLocaleDateString()}
                                </h5>
                              </div>

                              <div className="col_right">
                                {item.order.order_status == 1 && (
                                  <Badge color="success">
                                    {trans("Confirmed")}
                                  </Badge>
                                )}
                                {item.order.order_status == 2 && (
                                  <Badge color="warning">
                                    {trans("Indelivery")}
                                  </Badge>
                                )}
                                {item.order.order_status == 3 && (
                                  <Badge color="success">
                                    {trans("Delivered")}
                                  </Badge>
                                )}
                                {item.order.order_status == 4 && (
                                  <Badge color="success">
                                    {trans("Treated")}
                                  </Badge>
                                )}
                                <h6 className="total">
                                  {trans("Delivery Date")} :{" "}
                                  {item.order.delivery_date}
                                </h6>
                                <h6 className="total">
                                  {trans("Total")}:{" "}
                                  <span>{item.order.grand_total}</span>
                                </h6>
                                <Link
                                  to={`/supplierCustomerInvoice/${item.order.id}/RD`}
                                >
                                  <Button color="primary mr-2" outline>
                                    <i className="fa fa-file-text-o"></i>
                                  </Button>
                                </Link>
                              </div>
                            </div> */}
                    {/* </CardBody>
                        </Card> */}
                    {/* );
                    })}  */}
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default translate(Customer_Orders);
