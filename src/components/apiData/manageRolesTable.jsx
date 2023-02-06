import React, { useEffect, Fragment } from "react";
import axios from "axios";
import Breadcrumb from "../../layout/breadcrumb";
import { Link } from "react-router-dom";
import {
  Button,
  Badge,
  Card,
  Container,
  CardBody,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import { useState } from "react";
import DataGrid from "../dataTable/dataTable";
import SweetAlert from "sweetalert2";

import { URL } from "../../env";

import { translate } from "react-switch-lang";

const ManageRolesTable = (props) => {
  const trans = props.t;
  const [manageRoles, setManageRoles] = useState([]);

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
    {
      field: "action",
      headerName: trans("ACTION"),
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                to={
                  "/settings/manage/roles/edit/" +
                  cellValues.row.id +
                  "/" +
                  "RD"
                }
              >
                <Button outline color="primary" className="mr-2">
                  <i className="fa fa-edit"></i>
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
    const getManageRole = async () => {
      const response = await axios.get(`${URL}/role`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("rolemangement", response);
      const roles = response.data.message.data;
      roles.map((item, index) => (item["index"] = index + 1));
      setManageRoles(roles);
    };

    getManageRole();
  }, []);

  const DeleteItem = async (id) => {
    const res = await axios
      .delete(`${URL}/role/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        const deleted_Roles = manageRoles.filter((item) => item.id != id);
        const index_update = deleted_Roles;
        index_update.map((item, index) => (item["index"] = index + 1));
        setManageRoles(index_update);
      });
  };

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <>
      <Fragment>
        {/* <Breadcrumb parent={trans("Manage Roles")} title={trans("Roles")} /> */}
        {/* <Container fluid={true}>
          <Card>
            <CardHeader>
              <Row> */}
        {/* <Col>
                  <h5>
                    {trans("Manage Roles")} {trans("Roles")}
                  </h5>
                </Col> */}
        <CardHeader className="p-0 pb-4 mb-4 d-flex">
          <Col md="6">
            <h5>
             {trans("Roles")}
            </h5>
          </Col>
          {(role == "SuperAdmin" || permissions.match("create") != null) && (
            <Col md="6" className="text-right">
              <Link to="/settings/manage/roles/create/RD">
                <Button>
                  <i className="fa fa-plus mr-2"></i>
                  {trans("Create Role")}{" "}
                </Button>
              </Link>
            </Col>
          )}
          {/* </Row> */}
        </CardHeader>
        <DataGrid columns={columns} rows={manageRoles} />
        {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default translate(ManageRolesTable);
