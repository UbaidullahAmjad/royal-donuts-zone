/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Media,
} from "reactstrap";
import DataTable from "../../../components/dataTable/dataTable";
import { Link } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  SalesOrdersListAction,
  getChangeOrderStatus,
} from "../../../redux/Pages/OnlineSales/SalesOrders/actions";

const EccomOrders = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.getSalesOrders);

  useEffect(() => {
    if (orderList?.salesOrdersList.length == 0) {
      dispatch(SalesOrdersListAction())
    }
    if (orderList && orderList.salesOrdersList.length > 0
      && orderList.tempArrLength != 0
      && orderList.salesOrdersList.length != orderList.tempArrLength) {
      dispatch(SalesOrdersListAction())
    }
  }, []);

  const getOrderStatus = (order_status) => {
    if (order_status == 0) {
      return (
        <Badge color="primary" pill>
          {trans("Pending")}
        </Badge>
      );
    } else if (order_status == 1) {
      return (
        <Badge color="info" pill>
          {trans("Confirmed")}
        </Badge>
      );
    } else if (order_status == 2) {
      return (
        <Badge color="primary" pill>
          {trans("In-Deliverd")}
        </Badge>
      );
    } else if (order_status == 3) {
      return (
        <Badge color="success" pill>
          {trans("Deliverd")}
        </Badge>
      );
    } else if (order_status == 4) {
      return (
        <Badge color="warning" pill>
          {trans("Treated")}
        </Badge>
      );
    } else if (order_status == 5) {
      return (
        <Badge color="primary" pill>
          {trans("Rectify")}
        </Badge>
      );
    } else {
      return (
        <Badge color="primary" pill>
          {trans("Pending")}
        </Badge>
      );
    }
  };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  const splitNumber = (val) => {
    return val.toString().replaceAll('.', trans("dot"))
  }

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 80 },
    { field: "order_no", title: trans("Order No."), flex: 1, minWidth: 120 },
    {
      field: "user_name",
      title: trans("User Name"),
      flex: 1.5,
      minWidth: 220,
      render: (cellValues) =>
        cellValues.o_id == null
          ? cellValues.user_name
          : cellValues.first_name + " " + cellValues.last_name,
    },
    // { field: "supplier_name", title: trans("Supplier Name"), width: 180 },
    {
      field: "delivery_date",
      title: trans("Delivery Date"),
      flex: 1.15,
      minWidth: 155,
      render: (cellValues) => {
        if (cellValues.delivery_date != undefined) {
          var date = cellValues.delivery_date.split("T")[0].toString();
          var moment_date = moment(date, "DD/MM/YYYY hh:mm:ss").format(
            "ddd, Do MMM, YYYY HH:mm:ss"
          );

          var moment_date2 = moment(date, "MM/DD/YYYY hh:mm:ss").format(
            "ddd, Do MMM, YYYY HH:mm:ss"
          );

          return (
            <>
              {/* <p>{moment_date != "Invalid date" ? moment_date : moment_date2}</p> */}
              <p>{cellValues.delivery_date}</p>
            </>
          );
        }
      },
      valueGetter: (cellValues) =>
        cellValues.value != undefined && cellValues.delivery_date.split("T")[0],
    },
    // { field: "item_count", title: trans("Total Items"), flex: 1, minWidth: 120 },
    // {
    //     field: "total", title: trans("Total") + " €", flex: 1, minWidth: 120,
    //     renderCell: (cellValues) => <p>{cellValues.total + " "}€</p>,
    // },
    // {
    //     field: "discount", title: trans("Discount") + " €", flex: 1, minWidth: 120,
    //     renderCell: (cellValues) => <p>{cellValues.discount + " "}€</p>,
    // },
    {
      field: "grand_total",
      title: trans("Grand Total") + " €",
      flex: 1,
      minWidth: 120,
      render: (cellValues) => <p>{splitNumber(cellValues.grand_total) + " "}€</p>,
    },
    {
      field: "order_status",
      title: trans("Order Status"),
      flex: 2,
      minWidth: 230,
      render: (cellValues) => {
        if (cellValues.order_status === "0") {
          return (
            <div>
              <Badge color="primary" pill>
                {trans("Pending")}
              </Badge>
              <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
              <a onClick={() => ChangeOrderStatus(cellValues.id, 1)}>
                <Badge style={{ cursor: "pointer" }} color="success">
                  {trans("Confirmed")}
                </Badge>
              </a>
            </div>
          );
        } else if (cellValues.order_status === "1") {
          return (
            <div>
              <Badge color="primary" pill>
                {trans("Confirmed")}
              </Badge>
              <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
              <a onClick={() => ChangeOrderStatus(cellValues.id, 2)}>
                <Badge style={{ cursor: "pointer" }} color="success">
                  {trans("In-Delivery")}
                </Badge>
              </a>
            </div>
          );
        } else if (cellValues.order_status === "2") {
          return (
            <div>
              <Badge color="primary" pill>
                {trans("In-Delivery")}
              </Badge>
              <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
              <a onClick={() => ChangeOrderStatus(cellValues.id, 3)}>
                <Badge style={{ cursor: "pointer" }} color="success">
                  {trans("Delivered")}
                </Badge>
              </a>
            </div>
          );
        } else if (cellValues.order_status === "3") {
          return (
            <div>
              <Badge color="success" pill>
                {trans("Delivered")}
              </Badge>
            </div>
          );
        } else if (cellValues.order_status === "4") {
          return (
            <div>
              <Badge color="warning" pill>
                {trans("Treated")}
              </Badge>
            </div>
          );
        }
      },
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 1,
      minWidth: 180,
      render: (cellValues) => {
        return (
          <div className="text-center">
            {/* /customer/suppliers/orders/view/:id */}
            {/* ecommerce/orders/view/133 */}
            {/* to={`/apiData/eccom/orders/invoice/${cellValues.row.id}`} */}
            {(role == "SuperAdmin" || permissions.match("show") != null) && (
              <Link to={`/ecommerce/orders/view/${cellValues.id}`}>
                <Button color="primary mr-2 mb-1" outline>
                  <i className="fa fa-eye"></i>
                </Button>
              </Link>
            )}
          </div>
        );
      },
    },
  ];


  const ChangeOrderStatus = (id, value) => {
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to change the current Status !"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Change"),
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        getChangeOrderStatus(id, value);
        dispatch(getChangeOrderStatus(id, value, trans))
      }
    });
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Online Sales") + " " + trans("Orders")}
        parent={trans("Online Sales")}
        title={trans("Orders")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            {/* <h5>
              {trans("Online Sales") +
                " " +
                trans("Orders") +
                " " +
                trans("List")}
            </h5> */}
          </CardHeader>
          <CardBody>
            <DataTable
              columns={columns}
              data={orderList.salesOrdersList}
              isLoading={orderList.loading && orderList.salesOrdersList.length == 0 ? true : false}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default EccomOrders;
