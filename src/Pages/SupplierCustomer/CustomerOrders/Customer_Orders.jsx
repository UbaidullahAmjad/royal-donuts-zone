/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge,
} from "reactstrap";
import { toast } from "react-toastify";
import "./customer_orders.css";
import { useTranslation, } from "react-i18next";
import { Link } from "react-router-dom";
// import DataTable from "../../dataTable/dataTable";
import DataTable from "../../../components/dataTable/dataTable";
import axios from "axios";
import { URL } from "../../../env";
import SweetAlert from "sweetalert2";
import {
  SupplierCustomerCartTotal,
  SupplierCustomerRectifyCartTotal,
} from "../../../redux/supplier_customer/actions";
import { useDispatch, useSelector } from "react-redux";
import { CustomerCartOrderAction } from "../../../redux/Pages/SupplierCustomer/CustomerOrders/Customer_Orders/Customer_OrdersAction"
import { RectifyOrderDataAction } from "../../../redux/Pages/SupplierCustomer/Rectify/RectifyAction";
import { getSupplierCustomerCartTotalAction } from "../../../redux/Pages/SupplierCustomer/CustomerOrders/CustomerCart/CartItemRemoveAction";

const Customer_Orders = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const [OrderData, setOrderData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const RectifyOrderList = useSelector((state) => state.getRectifyData.rectifyOrderList)

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  useEffect(() => {
    const getCustomerCart = async () => {
      if (localStorage.getItem("user_id") != null) {

        const cartOrderResponse = await CustomerCartOrderAction();

        if (cartOrderResponse?.data?.success == true) {
          let itemsArray = [];
          setOrderData(cartOrderResponse?.data?.all_orders);
          cartOrderResponse?.data.all_orders.map((item) => {
            itemsArray.push(item.order);
          });
          setAllOrders(itemsArray);
        } else if (cartOrderResponse?.data?.error == true) {
          if (cartOrderResponse?.data?.message) {
            toast.error(trans(cartOrderResponse?.data?.message));
          } else {
            toast.error(trans("failed"));
          }
        } else {
          toast.error(trans("failed"));
        }

      } else {
        toast.error(trans("Please Login To Continue"));
      }
    };
    getCustomerCart();
  }, []);

  useEffect(() => {
    if (RectifyOrderList && RectifyOrderList.length > -1) {
      dispatch(
        SupplierCustomerRectifyCartTotal(RectifyOrderList.length)
      );
    }
  }, [RectifyOrderList])

  const columns = [
    { field: "order_number", title: "Order#", width: 100 },
    { field: "supplier_name", title: trans("SUPPLIER NAME"), flex: 1 },
    { field: "user_name", title: trans("CUSTOMER NAME"), flex: 1 },
    { field: "order_confirmed", title: trans("ORDER DATE"), flex: 1 },
    { field: "delivery_date", title: trans("DELIVERY DATE"), flex: 1 },
    {
      field: "order_status",
      title: trans("STATUS"),
      flex: 1,
      render: (cellValues) => {
        if (cellValues.order_status === "1") {
          return <Badge color="success">{trans("Confirmed")}</Badge>;
        } else if (cellValues.order_status === "2") {
          return <Badge color="warning">{trans("Indelivery")}</Badge>;
        } else if (cellValues.order_status === "3") {
          return <Badge color="success">{trans("Delivered")}</Badge>;
        } else if (cellValues.order_status === "4") {
          return <Badge color="success">{trans("Treated")}</Badge>;
        }
      },
    },

    {
      field: "total",
      title: trans("TOTAL €"),
      flex: 1,
      render: (cellValues) => (
        <p>
          {" "}
          {cellValues.total.toString().split(".").length > 1
            ? cellValues.total.toString().split(".")[0] +
            trans("Point") +
            cellValues.total.toString().split(".")[1]
            : cellValues.total.toString().split(".")[0] + " "}
          €
        </p>
      ),
      valueGetter: (cellValues) => cellValues.total,
    },
    {
      field: "action",
      title: trans("ACTION"),
      flex: 1,
      render: (cellValues) => {
        return (
          <>
            {
              //  (role == "SuperAdmin" || (permissions.match("edit") != null)) &&
              <Link
                to={`/customer/suppliers/orders/view/${cellValues.id}`}
              >
                <Button color="warning mr-2">
                  <i className="fa fa-file-text-o"></i>
                </Button>
              </Link>
            }
          </>
        );
      },
    },
  ];


  const { cartTotal, RectifyTotal } = useSelector(
    (state) => state.SupplierCustomer
  );

  useEffect(() => {
    const GetCartCount = async () => {
      const cartResponse = await getSupplierCustomerCartTotalAction()
      if (cartResponse?.data?.success == true) {
        dispatch(
          SupplierCustomerCartTotal(cartResponse?.data?.cart_page_array?.length)
        );
      }
    };

    // if (cartTotal == 0) {
    GetCartCount();
    // }
    dispatch(RectifyOrderDataAction());
  }, []);

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
                    <DataTable columns={columns} data={allOrders} fitHeight={true} />
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

export default Customer_Orders;
