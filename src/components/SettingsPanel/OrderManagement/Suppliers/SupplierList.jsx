/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../../layout/breadcrumb";
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
import { useState } from "react";
import DataGrid from "../../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  SuppliersListAction,
  DeleteSupplierAction,
} from "../../../../redux/SettingsPanel/OrderManagement/Suppliers/actions";

const SupplierList = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [alert, setalert] = useState(false);

  const supplierLst = useSelector((state) => state.getSuppliers);

  useEffect(() => {
    if (supplierLst?.suppliersList.length == 0) {
      dispatch(SuppliersListAction())
    }
    if (supplierLst && supplierLst.suppliersList.length > 0
      && supplierLst.tempArrLength != 0
      && supplierLst.suppliersList.length != supplierLst.tempArrLength) {
      dispatch(SuppliersListAction())
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
          dispatch(DeleteSupplierAction(id, trans));
        }
      });
    }
  };

  const columns = [
    { field: "index", title: "#", flex: 1, minWidth: 100 },
    { field: "name", title: trans("Name"), flex: 1.5, minWidth: 240 },
    { field: "email", title: trans("Email"), flex: 1.6, minWidth: 260 },
    { field: "mobilenumber", title: trans("Mobile Number"), flex: 1, minWidth: 200 },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 260,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" ||
              permissions.match("Suppliers") != null) && (
                <Link to={`/suppliers/email/header/${cellValues.id}`}>
                  <Button outline color="light">
                    <i className="fa fa-h-square"></i>
                  </Button>
                </Link>
              )}
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link to={"/suppliers/edit/" + cellValues.id}>
                <Button color="warning" className="ml-2 mr-2">
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
        {/* <Breadcrumb parent={trans("Supplier")} title={trans("Supplier List")} />
        <Container fluid={true}>
          <Card> */}
        <CardHeader className="p-0 pb-4 mb-4 d-flex">
          <Col md="6">{/* <h5>{trans("Supplier List")}</h5> */}</Col>
          {(role == "SuperAdmin" || permissions.match("create") != null) && (
            <Col md="6" className="text-right">
              <Link to="/suppliers/create">
                <Button>
                  <i className="fa fa-plus mr-2"></i>
                  {trans("Create Supplier")}{" "}
                </Button>
              </Link>
            </Col>
          )}
        </CardHeader>
        {/* <CardBody> */}
        <DataGrid
          columns={columns}
          data={supplierLst.suppliersList}
          isLoading={supplierLst.suppliersList.length == 0 ? true : false}
        />
        {/* </CardBody> */}
        {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default SupplierList;
