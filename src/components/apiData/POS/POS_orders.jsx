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
import DataTable from "../../dataTable/dataTable";
import { Link } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";

const POS_Order = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const [orderList, setOrderList] = useState([]);
  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    { field: "index", headerName: "#", width: 60 },
    {
      field: "user_name",
      headerName: trans("User Name"),
      width: 180,
      renderCell: (cellValues) =>
        cellValues.row.o_id == null
          ? cellValues.row.user_name
          : cellValues.row.first_name + " " + cellValues.row.last_name,
    },
    { field: "order_no", headerName: trans("Order No."), width: 120 },
    {
      field: "payment",
      headerName: trans("Payment"),
      width: 120,
      renderCell: (cellValues) => <p>Cash</p>,
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
    {
      field: "grand_total",
      headerName: trans("Grand Total") + " €",
      width: 120,
      renderCell: (cellValues) => (
        <p>
          {(cellValues.row.customer_pay - cellValues.row.return).toFixed(2)}
          {" €"}
        </p>
      ),
    },
    {
      field: "customer_pay",
      headerName: trans("Customer Pay") + " €",
      width: 120,
      renderCell: (cellValues) => (
        <p>
          {cellValues.value ? cellValues.value : 0} {cellValues.value && " €"}{" "}
        </p>
      ),
    },
    {
      field: "return",
      headerName: trans("Return Amount") + " €",
      width: 120,
      renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
    },
    {
      field: "created_at",
      headerName: trans("Order Date"),
      width: 140,
      renderCell: (cellValues) => (
        <p>{cellValues.value != undefined && cellValues.value.split("T")[0]}</p>
      ),
      valueGetter: (cellValues) =>
        cellValues.value != undefined && cellValues.value.split("T")[0],
    },
    {
      field: "action",
      headerName: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      headerClassName: "MuiDataGrid-cell-action-column-Header",
      // flex: 1,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div className="text-center">
            {/* /customer/suppliers/orders/view/:id */}
            {/* apiData/order_invoice/133 */}
            {/* to={`/apiData/eccom/orders/invoice/${cellValues.row.id}`} */}
            {(role == "SuperAdmin" || permissions.match("show") != null) && (
              <Link to={`/pos/orders/invoice/${cellValues.row.id}`}>
                <Button color="primary mr-2 mb-1" outline>
                  <i className="fa fa-eye"></i>
                </Button>
              </Link>
            )}
            {(role == "SuperAdmin" || permissions.match("show") != null) && (
              <Link to={`/pos/orders/return/${cellValues.row.id}`}>
                <Button color="success mr-2 mb-1" outline>
                  <i className="fa fa-edit"></i>
                </Button>
              </Link>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getOrders = async () => {
      await axios
        .get(`${URL}/get_sales`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          const order = response.data.sales;
          order.map((item, index) => (item["index"] = index + 1));
          setOrderList(order);
        });
    };
    getOrders();
  }, []);

  return (
    <Fragment>
      <Breadcrumb
        parent={trans("Offline Sales")}
        title={trans("Sale Orders")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>{trans("Ecommerce POS Orders")}</h5>
          </CardHeader>
          <CardBody>
            <DataTable columns={columns} rows={orderList} />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default POS_Order;
