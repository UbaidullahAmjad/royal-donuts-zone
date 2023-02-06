/* eslint-disable no-unused-vars */
import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
  UnitsListAction,
  HandleUnitIsActiveAction,
  DeleteUnitAction,
} from "../../../../redux/SettingsPanel/OrderManagement/Units/actions";

const SupplierUnits = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [alert, setalert] = useState(false);

  const supplierUnits = useSelector((state) => state.getUnits);

  useEffect(() => {
    if (supplierUnits?.unitsList.length == 0) {
      dispatch(UnitsListAction())
    }
    if (supplierUnits && supplierUnits.unitsList.length > 0
      && supplierUnits.tempArrLength != 0
      && supplierUnits.unitsList.length != supplierUnits.tempArrLength) {
      dispatch(UnitsListAction())
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
          dispatch(DeleteUnitAction(id, trans))
        }
      });
    }
  };

  const handleIsActive = (id, message) => {
    dispatch(HandleUnitIsActiveAction(id, message))
  };

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 100 },
    {
      field: "name",
      title: trans("Name"),
      minWidth: 200,
      flex: 1.5,
    },
    {
      field: "abbreviation",
      title: trans("Abbreviation"),
      minWidth: 140,
      flex: 1,
    },
    {
      field: "isActive",
      title: trans("Status"),
      minWidth: 110,
      flex: 1,
      render: (cellValues) => {
        if (cellValues.isActive == 1) {
          return (
            <Badge
              color="success"
              pill
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsActive(
                  cellValues.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Inactive"
                  )}`
                )
              }
            >
              {trans("Active")}
            </Badge>
          );
        } else {
          return (
            <Badge
              color="danger"
              pill
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleIsActive(
                  cellValues.id,
                  `${trans("successfull")} ${trans("changed to")} ${trans(
                    "Active"
                  )}`
                )
              }
            >
              {trans("Inactive")}
            </Badge>
          );
        }
      },
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      minWidth: 190,
      flex: 1.5,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link to={"/units/edit/" + cellValues.id}>
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
        {/* <Breadcrumb parent={trans("Supplier")} title={trans("Units")} /> */}
        {/* <Container fluid={true}>
          <Card> */}
        <CardHeader className="p-0 pb-4 mb-4 d-flex">
          <Col md="6">
            {/* <h5>
              {trans("Supplier")} {trans("Units")}
            </h5> */}
          </Col>
          {(role == "SuperAdmin" || permissions.match("create") != null) && (
            <Col md="6" className="text-right">
              <Link to="/units/create">
                <Button>
                  <i className="fa fa-plus mr-2"></i>
                  {trans("Create Unit")}
                </Button>
              </Link>
            </Col>
          )}
        </CardHeader>

        <DataGrid
          columns={columns}
          data={supplierUnits.unitsList}
          isLoading={supplierUnits.unitsList.length == 0 ? true : false}
        />

        {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default SupplierUnits;
