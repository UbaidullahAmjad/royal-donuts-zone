/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
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

import { URL } from "../../env";

import { translate } from "react-switch-lang";

const DeliveredOrders = (props) => {
  const trans = props.t;
  const [deliveredOrders, setDelivered] = useState([]);

  const columns = [
    { field: "index", headerName: "#", width: 100 },
    { field: "order_no", headerName: trans("ORDER NUMBER"), flex: 1 },
    { field: "user_name", headerName: trans("CUSTOMER NAME"), flex: 1 },
    { field: "delivery_date", headerName: trans("DELIVERY DATE"), flex: 1 },
    {
      field: "order_status",
      headerName: trans("STATUS"),
      renderCell: (cellValues) => {
        if (cellValues.value === "0") {
          return (
            <Badge color="warning" pill>
              {trans("pending")}
            </Badge>
          );
        } else if ((cellValues.value = "2")) {
          return (
            <Badge color="success" pill>
              {trans("delivered")}
            </Badge>
          );
        }
      },
      width: 150,
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
            {/* <Button
              color="danger"
              outline
              onClick={() => DeleteItem(cellValues.row.id)}
            >
             <i className="fa fa-trash-o" title="alertDanger" onClick={(e) => Displayalert(e.target.title, cellValues.row.id)}></i>
            </Button> */}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getDelivered = async () => {
      const response = await axios.get(`${URL}/eccomdeliverorders`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("categories", response);
      // setDelivered(response.data.orders)
      const products = response.data.orders;
      products.map((item, index) => (item["index"] = index + 1));
      setDelivered(products);
    };

    getDelivered();
  }, []);

  const DeleteItem = async (id) => {
    console.log("IDDDDDDDD--- ", id);
    const res = await axios
      .delete(`${URL}/eccomdeliverorders/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("RESSS", response);
        const deleted_product = deliveredOrders.filter((item) => item.id != id);
        setDelivered(deleted_product);
      });
  };

  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <Breadcrumb
        parent={trans("Ecommerce")}
        title={trans("Delivered Orders")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>{trans("Delivered Orders")}</h5>
          </CardHeader>
          <CardBody>
            <DataTable columns={columns} rows={deliveredOrders} />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default translate(DeliveredOrders);
