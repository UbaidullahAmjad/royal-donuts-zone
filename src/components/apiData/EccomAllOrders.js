/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../../layout/breadcrumb";
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
import DataTable from "../dataTable/dataTable";
import { Link } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { URL } from "../../env";
import { translate } from "react-switch-lang";

const EccomOrders = (props) => {
  const trans = props.t;

  const [orderList, setOrderList] = useState([]);

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

  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    { field: "index", headerName: "#", width: 60 },
    { field: "order_no", headerName: trans("Order No."), width: 120 },
    {
      field: "user_name",
      headerName: trans("User Name"),
      width: 180,
      renderCell: (cellValues) =>
        cellValues.row.o_id == null
          ? cellValues.row.user_name
          : cellValues.row.first_name + " " + cellValues.row.last_name,
    },
    { field: "supplier_name", headerName: trans("Supplier Name"), width: 180 },
    {
      field: "delivery_date",
      headerName: trans("Delivery Date"),
      width: 120,
      renderCell: (cellValues) => (
        <p>{cellValues.value != undefined && cellValues.value.split("T")[0]}</p>
      ),
      valueGetter: (cellValues) =>
        cellValues.value != undefined && cellValues.value.split("T")[0],
    },
    // { field: "item_count", headerName: trans("Total Items"), width: 120 },
    // {
    //     field: "total", headerName: trans("Total") + " €", width: 120,
    //     renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
    // },
    // {
    //     field: "discount", headerName: trans("Discount") + " €", width: 120,
    //     renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
    // },
    // {
    //     field: "grand_total", headerName: trans("Grand Total") + " €", width: 120,
    //     renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
    // },
    {
      field: "order_status",
      headerName: trans("Order Status"),
      width: 220,
      renderCell: (cellValues) => {
        if (cellValues.value === "0") {
          return (
            <div>
              <Badge color="primary" pill>
                {trans("Pending")}
              </Badge>
              <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
              <a onClick={() => ChangeOrderStatus(cellValues.row.id, 1)}>
                <Badge style={{ cursor: "pointer" }} color="success">
                  {trans("Confirmed")}
                </Badge>
              </a>
            </div>
          );
        } else if (cellValues.value === "1") {
          return (
            <div>
              <Badge color="primary" pill>
                {trans("Confirmed")}
              </Badge>
              <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
              <a onClick={() => ChangeOrderStatus(cellValues.row.id, 2)}>
                <Badge style={{ cursor: "pointer" }} color="success">
                  {trans("In-Delivery")}
                </Badge>
              </a>
            </div>
          );
        } else if (cellValues.value === "2") {
          return (
            <div>
              <Badge color="primary" pill>
                {trans("In-Delivery")}
              </Badge>
              <i className="fa fa-long-arrow-right ml-2 mr-2"></i>
              <a onClick={() => ChangeOrderStatus(cellValues.row.id, 3)}>
                <Badge style={{ cursor: "pointer" }} color="success">
                  {trans("Delivered")}
                </Badge>
              </a>
            </div>
          );
        } else if (cellValues.value === "3") {
          return (
            <div>
              <Badge color="success" pill>
                {trans("Delivered")}
              </Badge>
            </div>
          );
        } else if (cellValues.value === "4") {
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
      headerName: trans("Action"),
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div className="text-center">
            {/* /supplierCustomerInvoice/:id/:layout */}
            {/* ecommerce/orders/view/133/RD */}
            {/* to={`/apiData/eccom/orders/invoice/${cellValues.row.id}/RD`} */}
            {
              (role == "SuperAdmin" || (permissions.match("show") != null)) && <Link
                to={`/ecommerce/orders/view/${cellValues.row.id}/RD`}>
                <Button color="primary mr-2 mb-1" outline>
                  <i className="fa fa-eye"></i>
                </Button>
              </Link>
            }
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getOrders = async () => {
      await axios
        .get(`${URL}/eccom-all-orders`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          console.log("eccom-orders", response);
          const order = response.data.order;
          order.map((item, index) => (item["index"] = index + 1));
          setOrderList(order);
        });
    };
    getOrders();
  }, []);

  const ChangeOrderStatus = (id, value) => {
    console.log("IDDD ---", id, " ---- value ---", value);

    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to change the current Status !"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Change"),
      reverseButtons: true,
    }).then((result) => {
      console.log("result value", result);
      if (result.value) {
        getChangeOrderStatus(id, value);
      }
    });
  };

  const getChangeOrderStatus = async (id, value) => {
    const res = await axios
      .get(`${URL}/statuschange/${id}/${value}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSSS", response);
        if (response.data.success == true) {
          // if (value == 3) {
          //   console.log("DELIVEREDDDDD");
          //   const delivered_order = orderList.filter((item) => item.id != id);
          //   setOrderList(delivered_order);
          // } else {
          const orders_list = [];
          const get_order_status = orderList.findIndex(
            (item) => item.id == id
          );
          orderList[get_order_status].order_status = value.toString();
          const objects = [...orderList];
          // console.log(
          //   "ORDERSSSSSSS",
          //   ...openOrderList,
          //   orders_list.push(...openOrderList),
          //   "-----LISTT---",
          //   orders_list,
          //   "------- objects ----- ",
          //   objects
          // );
          setOrderList(objects);
          // }
          SweetAlert.fire({
            icon: "success",
            title: trans("Order") + " " + trans("Status"),
            text:
              trans("Order") +
              " " +
              trans("Status") +
              " " +
              trans("Changed") +
              " " +
              trans("Successfully") +
              " !!",
            confirmButtonText: trans("OK"),
          });
        }
      });
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Orders")} />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>{trans("Ecommerce Orders")}</h5>
          </CardHeader>
          <CardBody>
            <DataTable columns={columns} rows={orderList} />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default translate(EccomOrders);
