/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Breadcrumb from "../../layout/breadcrumb";
import {
  Mail,
  Bell,
  Settings,
  Music,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  Headphones,
  GitHub,
  Award,
  Activity,
  Heart,
} from "react-feather";
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
import {
  ContextualVariations,
  PillsWithIcon,
  PillsWithNumber,
  TagsWithIcon,
  TagsWithNumber,
  New,
  Messages,
  Notification,
  BadgesExample,
  Primary,
  secondary,
  Success,
  Warning,
  Danger,
  Light,
  Info,
  Dark,
} from "../../constant";
import DataTable from "../dataTable/dataTable";

import { Link } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { URL } from "../../env";
import { translate } from "react-switch-lang";
const OpenOrders = (props) => {
  const trans = props.t;
  const [openOrderList, setOpenOrders] = useState([]);

  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    { field: "index", headerName: "#", width: 100 },
    { field: "order_no", headerName: trans("ORDER NUMBER"), flex: 1 },
    { field: "user_name", headerName: trans("CUSTOMER NAME"), flex: 1 },
    { field: "delivery_date", headerName: trans("DELIVERY DATE"), flex: 1 },
    {
      field: "order_status",
      headerName: trans("STATUS"),
      renderCell: (cellValues) => {
        if (cellValues.value == "0") {
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
        } else if ((cellValues.value = "2")) {
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
        }
      },
      flex: 1,
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            {
              (role == "SuperAdmin" || (permissions.match("edit") != null)) && <Link
                to={`/ecommerce/orders/view/${cellValues.row.id}/RD`}>
                <Button color="primary mr-2" outline>
                  <i className="fa fa-file-text-o"></i>
                </Button>
              </Link>
            }
            {/* {
              (role == "SuperAdmin" || (permissions.match("delete") != null)) && <Button
                color="danger"
                outline
                onClick={() => DeleteItem(cellValues.row.id)}
              >
               <i className="fa fa-trash-o" title="alertDanger" onClick={(e) => Displayalert(e.target.title, cellValues.row.id)}></i>
              </Button>
            } */}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getOpenOrders = async () => {
      const response = await axios.get(`${URL}/eccomopenorders`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("orders", response);
      // setOpenOrders(response.data.orders)
      const products = response.data.orders;
      products.map((item, index) => (item["index"] = index + 1));
      setOpenOrders(products);
    };

    getOpenOrders();
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
          if (value == 3) {
            console.log("DELIVEREDDDDD");
            const delivered_order = openOrderList.filter(
              (item) => item.id != id
            );
            setOpenOrders(delivered_order);
          } else {
            const orders_list = [];
            const get_order_status = openOrderList.findIndex(
              (item) => item.id == id
            );
            openOrderList[get_order_status].order_status = value.toString();
            const objects = [...openOrderList];
            // console.log(
            //   "ORDERSSSSSSS",
            //   ...openOrderList,
            //   orders_list.push(...openOrderList),
            //   "-----LISTT---",
            //   orders_list,
            //   "------- objects ----- ",
            //   objects
            // );
            setOpenOrders(objects);
          }
          SweetAlert.fire({
            icon: "success",
            title: (trans("Order") + " " + trans("Status")),
            text: (trans("Order") + " " + trans("Status") + " " + trans("Changed") + " " + trans("Successfully") + " !!"),
            confirmButtonText: trans("OK")
          });
        }
      });
  };


  const DeleteItem = async (id) => {
    console.log("IDDDDDDDD--- ", id);
    const res = await axios
      .delete(`${URL}/eccomopenorders/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSS", response);
        const deleted_product = openOrderList.filter((item) => item.id != id);
        setOpenOrders(deleted_product);
      });
  };

  return (
    <Fragment>
      {/* Open Orders */}
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Orders")} />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>{trans("Orders")}</h5>
          </CardHeader>
          <CardBody>
            <DataTable columns={columns} rows={openOrderList} />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default translate(OpenOrders);
