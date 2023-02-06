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
import { translate } from "react-switch-lang";

const POS_Order = (props) => {
  const trans = props.t;

  const [orderList, setOrderList] = useState([]);

  // const getOrderStatus = (order_status) => {
  //   if (order_status == 0) {
  //     return (
  //       <Badge color="primary" pill>
  //         {trans("Pending")}
  //       </Badge>
  //     );
  //   } else if (order_status == 1) {
  //     return (
  //       <Badge color="info" pill>
  //         {trans("Confirmed")}
  //       </Badge>
  //     );
  //   } else if (order_status == 2) {
  //     return (
  //       <Badge color="primary" pill>
  //         {trans("In-Deliverd")}
  //       </Badge>
  //     );
  //   } else if (order_status == 3) {
  //     return (
  //       <Badge color="success" pill>
  //         {trans("Deliverd")}
  //       </Badge>
  //     );
  //   } else if (order_status == 4) {
  //     return (
  //       <Badge color="warning" pill>
  //         {trans("Treated")}
  //       </Badge>
  //     );
  //   } else if (order_status == 5) {
  //     return (
  //       <Badge color="primary" pill>
  //         {trans("Rectify")}
  //       </Badge>
  //     );
  //   } else {
  //     return (
  //       <Badge color="primary" pill>
  //         {trans("Pending")}
  //       </Badge>
  //     );
  //   }
  // };

  const role = atob(localStorage.getItem("role"));
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
          {(cellValues.row.customer_pay - cellValues.row.return).toFixed(2) +
            " "}
          €
        </p>
      ),
    },
    {
      field: "customer_pay",
      headerName: trans("Customer Pay") + " €",
      width: 120,
      renderCell: (cellValues) => <p>{cellValues.value + " "}€</p>,
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
      width: 120,
      renderCell: (cellValues) => (
        <p>{cellValues.value != undefined && cellValues.value.split("T")[0]}</p>
      ),
      valueGetter: (cellValues) =>
        cellValues.value != undefined && cellValues.value.split("T")[0],
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
            {(role == "SuperAdmin" || permissions.match("show") != null) && (
              <Link to={`/pos/orders/invoice/${cellValues.row.id}/RD`}>
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

  useEffect(() => {
    const getOrders = async () => {
      await axios
        .get(`${URL}/get_sales`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          console.log("pos-orders", response);
          const order = response.data.sales;
          order.map((item, index) => (item["index"] = index + 1));
          setOrderList(order);
        });
    };
    getOrders();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("POS Orders")} />
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

export default translate(POS_Order);
