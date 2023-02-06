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
import DataGrid from "../../dataTable/dataTable";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const SupplierAdmins = (props) => {
  const trans = props.t;
  const [supplierAdmin, setAdmin] = useState([]);
  const [alert, setalert] = useState(false);

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
          console.log("result value", id);
          DeleteItem(id);
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
    { field: "index", headerName: "#", width: 100 },
    { field: "name", headerName: trans("NAME"), flex: 1 },
    { field: "email", headerName: trans("EMAIL"), flex: 1 },
    {
      field: "roles",
      headerName: trans("ROLE"),
      flex: 1,
      renderCell: (cellValues) => {
        return cellValues.row.roles.length > 0 ? (
          cellValues.row.roles.map((item) => (
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
        cellValues.row.roles.length > 0
          ? cellValues.row.roles.map((item) => item.name)
          : trans("None"),
    },
    {
      field: "action",
      headerName: trans("ACTION"),
      flex: 2,
      renderCell: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                to={"/supplier/admins/edit/" + cellValues.row.id + "/" + "RD"}
              >
                <Button outline color="primary" className="mr-2">
                  <i className="fa fa-edit" outline></i>
                </Button>
              </Link>
            )}
            {(role == "SuperAdmin" || permissions.match("delete") != null) && (
              <Button
                color="danger"
                className="sweet-7"
                name="alertDanger"
                onClick={(e) => Displayalert(e.target.name, cellValues.row.id)}
              >
                {" "}
               <i className="fa fa-trash-o" title="alertDanger" onClick={(e) => Displayalert(e.target.title, cellValues.row.id)}></i>
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getAdmin = async () => {
      const response = await axios.get(`${URL}/admins`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("admins", response);
      const supplierAdmin = response.data.admins;
      supplierAdmin.map((item, index) => (item["index"] = index + 1));
      setAdmin(supplierAdmin);
    };

    getAdmin();
  }, []);

  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`${URL}/admins/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_admin = supplierAdmin.filter((item) => item.id != id);
        const index_update = deleted_admin;
        index_update.map((item, index) => (item["index"] = index + 1));
        setAdmin(index_update);
      });
  };
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
            <h5>
              {trans("Supplier")} {trans("Admins")}
            </h5>
          </Col>
          {(role == "SuperAdmin" || permissions.match("create") != null) && (
            <Col md="6" className="text-right">
              <Link to="/supplier/admins/create/RD">
                <Button>
                  <i className="fa fa-plus mr-2"></i>
                  {trans("Create Admins")}{" "}
                </Button>
              </Link>
            </Col>
          )}
        </CardHeader>

        <DataGrid columns={columns} rows={supplierAdmin} />

        {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default translate(SupplierAdmins);
