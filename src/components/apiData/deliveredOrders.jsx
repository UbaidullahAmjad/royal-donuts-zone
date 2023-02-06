/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Breadcrumb from "../../layout/breadcrumb";
import SweetAlert from "sweetalert2";

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

import { URL } from "../../env";

import { useTranslation, } from "react-i18next";

const DeliveredOrders = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [deliveredOrders, setDelivered] = useState([]);

  const [BulkSelectionDeleteIds, setBulkSelectionDeleteIds] = useState([]);
  const [selectionModelDeleteButton, setSelectionModelDeleteButton] =
    useState(false);

  const handleOnClickSelectionModelDeleteButton = () => {
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Once deleted, you will not be able to recover it!"),
      icon: "error",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Delete"),
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        SweetAlert.fire({
          icon: "success",
          title: trans("Deleted"),
          text: trans("Your selected items have been deleted"),
          confirmButtonText: trans("OK"),
        });
      }
    });
  };

  const columns = [
    { field: "index", headerName: "#", width: 100 },
    {
      field: "order_no",
      headerName: trans("ORDER NUMBER"),
      // flex: 1,
      width: 140,
    },
    {
      field: "user_name",
      headerName: trans("CUSTOMER NAME"),
      // flex: 1,
      width: 240,
    },
    {
      field: "delivery_date",
      headerName: trans("DELIVERY DATE"),
      // flex: 1,
      width: 180,
    },
    {
      field: "order_status",
      headerName: trans("STATUS"),
      width: 160,
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
    },
    {
      field: "action",
      headerName: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      // flex: 1,
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link to={`/ecommerce/orders/view/${cellValues.row.id}`}>
                <Button color="warning mr-2">
                  <i className="fa fa-file-text-o"></i>
                </Button>
              </Link>
            )}
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
    const res = await axios
      .delete(`${URL}/eccomdeliverorders/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_product = deliveredOrders.filter((item) => item.id != id);
        setDelivered(deleted_product);
      });
  };

  const role = atob(localStorage.getItem("role"));
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

export default DeliveredOrders;
