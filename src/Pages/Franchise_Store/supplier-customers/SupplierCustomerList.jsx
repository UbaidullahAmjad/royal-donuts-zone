/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
} from "reactstrap";
import SweetAlert from "sweetalert2";
import { useState } from "react";
import DataGrid from "../../../components/dataTable/dataTable";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  SupplierCustomersListAction,
  DeleteSupplierCustomerAction,
} from "../../../redux/Pages/Franchise_Store/SupplierCustomers/actions";

const SupplierCustomerList = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [alert, setalert] = useState(false);

  const customerList = useSelector((state) => state.getSupplierCustomers);

  useEffect(() => {
    if (customerList?.supplierCustomersList.length == 0) {
      dispatch(SupplierCustomersListAction())
    }
    if (customerList && customerList.supplierCustomersList.length > 0
      && customerList.tempArrLength != 0
      && customerList.supplierCustomersList.length != customerList.tempArrLength) {
      dispatch(SupplierCustomersListAction())
    }
  }, []);

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
          dispatch(DeleteSupplierCustomerAction(id, trans))
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

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 80 },
    { field: "name", title: trans("Name"), flex: 1.5, minWidth: 240 },
    { field: "email", title: trans("Email"), flex: 1.6, minWidth: 260 },
    { field: "zip_code", title: trans("Zip"), flex: 1, minWidth: 160 },
    {
      field: "action",
      title: trans("ACTION"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 200,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                to={
                  "/supplier/customers/edit/" + cellValues.id
                }
              >
                <Button color="warning" className="mr-2">
                  <i className="fa fa-edit" outline></i>
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
                {" "}
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

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <>
      <Fragment>
        <Breadcrumb
          breadcrumbtitle={trans("Customers") + " " + trans("List")}
          parent={trans("Franchise/Store")}
          title={trans("Franchisees") + " / " + trans("Customers")}
          subtitle={trans("List")}
        />
        <Container fluid={true}>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  {/* <h5>
                    {trans("Supplier")} {trans("Customers")}
                  </h5> */}
                </Col>
                {(role == "SuperAdmin" ||
                  permissions.match("create") != null) && (
                    <Col className="text-right">
                      <Link to="/supplier/customers/create">
                        <Button>
                          <i className="fa fa-plus mr-2"></i>
                          {trans("Create Customers")}{" "}
                        </Button>
                      </Link>
                    </Col>
                  )}
              </Row>
            </CardHeader>
            <CardBody>
              <DataGrid
                columns={columns}
                data={customerList.supplierCustomersList}
                isLoading={customerList.length && customerList.supplierCustomersList?.length == 0 ? true : false}
              />
            </CardBody>
          </Card>
        </Container>
      </Fragment>
    </>
  );
};

export default SupplierCustomerList;
