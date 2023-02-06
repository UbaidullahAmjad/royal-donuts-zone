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
import SweetAlert from "sweetalert2";
import { useState } from "react";
import DataGrid from "../../../dataTable/dataTable";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  SupplierAdminsListAction,
  DeleteSupplierAdminAction
} from "../../../../redux/SettingsPanel/RolesManagement/SupplierAdmins/actions";

const SupplierAdmins = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [alert, setalert] = useState(false);

  const [SupplierAdminLength, setSupplierAdminLength] = useState(0);

  const supplierAdmin = useSelector((state) => state.getSupplierAdmins);

  useEffect(() => {
    if (supplierAdmin?.adminsList.length == 0) {
      dispatch(SupplierAdminsListAction())
    }
    if (supplierAdmin && supplierAdmin.adminsList.length > 0
      && supplierAdmin.tempArrLength != 0
      && supplierAdmin.adminsList.length != supplierAdmin.tempArrLength) {
      dispatch(SupplierAdminsListAction())
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
          dispatch(DeleteSupplierAdminAction(id, trans))
        }
      });
    }
  };

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 100 },
    { field: "name", title: trans("Name"), flex: 1.5, minWidth: 220 },
    { field: "email", title: trans("Email"), flex: 1.8, minWidth: 240 },
    {
      field: "roles",
      title: trans("Role"),
      flex: 1.2,
      minWidth: 140,
      render: (cellValues) => {
        return cellValues.roles.length > 0 ? (
          cellValues.roles.map((item) => (
            <Badge color="success" pill>
              {item.name}
            </Badge>
          ))
        ) : (
          <Badge color="danger" pill>
            {trans("None")}
          </Badge>
        );
      },
      valueGetter: (cellValues) =>
        cellValues.roles.length > 0
          ? cellValues.roles.map((item) => item.name)
          : trans("None"),
    },
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
                to={"/supplier/admins/edit/" + cellValues.id}
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
        {/* <Breadcrumb parent={trans("Manage Role")} title={trans("Admins")} /> */}
        {/* <Container fluid={true}>
          <Card> */}
        <CardHeader className="p-0 pb-4 mb-4 d-flex">
          <Col md="6">
            {/* <h5>
              {trans("Supplier")} {trans("Admins")}
            </h5> */}
          </Col>
          {(role == "SuperAdmin" || permissions.match("create") != null) && (
            <Col md="6" className="text-right">
              <Link to="/supplier/admins/create">
                <Button>
                  <i className="fa fa-plus mr-2"></i>
                  {trans("Create Admins")}{" "}
                </Button>
              </Link>
            </Col>
          )}
        </CardHeader>

        <DataGrid
          columns={columns}
          data={supplierAdmin.adminsList}
          isLoading={supplierAdmin.adminsList.length == 0 ? true : false}
        />
        {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default SupplierAdmins;
