/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from "react";
import axios from "axios";
import Breadcrumb from "../../../../layout/breadcrumb";
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
import DataGrid from "../../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  RolesListAction,
  DeleteRoleAction
} from "../../../../redux/SettingsPanel/RolesManagement/Roles/actions";

const RolesManagementList = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const [alert, setalert] = useState(false);

  const manageRoles = useSelector((state) => state.getRoles);

  useEffect(() => {
    if (manageRoles?.rolesList.length == 0) {
      dispatch(RolesListAction())
    }
    if (manageRoles && manageRoles.rolesList.length > 0
      && manageRoles.tempArrLength != 0
      && manageRoles.rolesList.length != manageRoles.tempArrLength) {
      dispatch(RolesListAction())
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
          // DeleteItem(id);
          dispatch(DeleteRoleAction(id, trans))
        }
      });
    }
  };

  const DeleteItem = async (id) => {
    // const res = await axios
    //   .delete(`${URL}/role/${id}`, {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token123"),
    //     },
    //   })
    //   .then((response) => {
    //     const deleted_Roles = manageRoles.filter((item) => item.id != id);
    //     const index_update = deleted_Roles;
    //     index_update.map((item, index) => (item["index"] = index + 1));
    //     setManageRoles(index_update);
    //   });
  };

  const columns = [
    { field: "index", title: "#", flex: 1, minWidth: 100 },
    {
      field: "name",
      title: trans("Name"),
      flex: 2,
      minWidth: 240,
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 200,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                to={"/settings/manage/roles/edit/" + cellValues.id}
              >
                <Button color="warning" className="mr-2">
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
          <Col md="6">{/* <h5>{trans("Roles")}</h5> */}</Col>
          {(role == "SuperAdmin" || permissions.match("create") != null) && (
            <Col md="6" className="text-right">
              <Link to="/settings/manage/roles/create">
                <Button>
                  <i className="fa fa-plus mr-2"></i>
                  {trans("Create Role")}{" "}
                </Button>
              </Link>
            </Col>
          )}
          {/* </Row> */}
        </CardHeader>
        <DataGrid
          columns={columns}
          data={manageRoles.rolesList}
          isLoading={manageRoles.rolesList.length == 0 ? true : false}
        />
        {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default RolesManagementList;
