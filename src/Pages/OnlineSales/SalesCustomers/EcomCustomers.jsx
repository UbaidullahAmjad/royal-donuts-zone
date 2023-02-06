/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
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
} from "reactstrap";
import DataTable from "../../../components/dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link } from "react-router-dom";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  SalesCustomersListAction,
  DeleteSalesCustomerAction,
} from "../../../redux/Pages/OnlineSales/SalesCustomers/actions"

const EcomCustomers = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [alert, setalert] = useState(false);

  const customersList = useSelector((state) => state.getSalesCustomers);
  useEffect(() => {
    if (customersList?.salesCustomersList.length == 0) {
      dispatch(SalesCustomersListAction())
    }
    if (customersList && customersList.salesCustomersList.length > 0
      && customersList.tempArrLength != 0
      && customersList.salesCustomersList.length != customersList.tempArrLength) {
      dispatch(SalesCustomersListAction())
    }
  }, []);

  // useEffect(() => {
  //   const getCustomers = async () => {
  //     const response = await axios.get(`${URL}/eccom-user`, {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token123"),
  //       },
  //     });
  //     // setCustomers(response.data.orders)
  //     const Customers = response.data.user;
  //     Customers.map((item, index) => (item["index"] = index + 1));
  //     setCustomers(Customers);
  //   };
  //   getCustomers();
  // }, []);

  const Displayalert = (name, id) => {
    setalert(true);
    if (name === "alertDanger") {
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
          // DeleteItem(id);
          dispatch(DeleteSalesCustomerAction(id, trans))
          SweetAlert.fire({
            icon: "success",
            title: trans("Deleted"),
            text: trans("Your item has been deleted."),
            confirmButtonText: trans("OK"),
          });
        }
      });
    }
  };

  const DeleteItem = async (id) => {
    console.log("IDDDDDDDD--- ", id);
    // const res = await axios
    //   .get(
    //     `${URL}/eccom-user-delete`,
    //     { params: { id: id } },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token123"),
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     const deleted_product = customersList.filter((item) => item.id != id);
    //     setCustomers(deleted_product);
    //   });
  };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  const columns = [
    { field: "index", title: "#", minWidth: 80 },
    {
      field: "name",
      title: trans("Name"),
      flex: 1.5,
      width: 220,
    },
    {
      field: "email",
      title: trans("Email"),
      flex: 1.6,
      minWidth: 240,
    },
    {
      field: "mobilenumber",
      title: trans("Phone"),
      flex: 1,
      minWidth: 160,
    },
    {
      field: "address",
      title: trans("Address"),
      flex: 2,
      minWidth: 180,
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 1,
      minWidth: 190,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link to={`/ecommerce/customers/edit/${cellValues.id}`}>
                <Button color="warning mr-2">
                  <i className="fa fa-edit"></i>
                </Button>
              </Link>
            )}
            {(role == "SuperAdmin" || permissions.match("delete") != null) && (
              <Button
                color="danger"
                className="sweet-7"
                name="alertDanger"
                onClick={(e) => Displayalert(e.target.name, cellValues.id)}
              >
                <i
                  className="fa fa-trash-o"
                  // title="alertDanger"
                  onClick={(e) =>
                    Displayalert("alertDanger", cellValues.id)
                  }
                ></i>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Online Sales") + " " + trans("Customers")}
        parent={trans("Online Sales")}
        title={trans("Customers")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between">
              {/* <h5>{trans("Ecommerce Customers")}</h5> */}
              <h5></h5>
              {(role == "SuperAdmin" ||
                permissions.match("create") != null) && (
                  <Link to={"/ecommerce/customers/create"}>
                    <Button color="secondary mr-2">
                      <i className="fa fa-plus mr-2"></i>
                      {trans("Create Customer")}
                    </Button>
                  </Link>
                )}
            </div>
          </CardHeader>
          <CardBody>
            <DataTable
              columns={columns}
              data={customersList.salesCustomersList}
              isLoading={customersList.loading && customersList.salesCustomersList?.length == 0 ? true : false}
            />
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default EcomCustomers;
