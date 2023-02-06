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
  ShippingCompaniesListAction,
  DeleteShippingCompanyAction,
} from "../../../../redux/SettingsPanel/OrderManagement/ShippingCompanies/actions";

const DeliveryCompanies = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [DeliveryCompanyLength, setDeliveryCompanyLength] = useState(0);
  const [alert, setalert] = useState(false);

  const deliveryCompany = useSelector((state) => state.getShippingCompanies);

  useEffect(() => {
    if (deliveryCompany?.companiesList.length == 0) {
      dispatch(ShippingCompaniesListAction())
    }
    if (deliveryCompany && deliveryCompany.companiesList.length > 0
      && deliveryCompany.tempArrLength != 0
      && deliveryCompany.companiesList.length != deliveryCompany.tempArrLength) {
      dispatch(ShippingCompaniesListAction())
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
          dispatch(DeleteShippingCompanyAction(id, trans))
        }
      });
    }
  };

  const columns = [
    { field: "index", title: "#", flex: 6, minWidth: 100 },
    { field: "name", title: trans("Name"), minWidth: 210, flex: 2 },
    {
      field: "minimum_order_amount",
      title: trans("Minimum Order Amount"),
      render: (cellValues) => <p>{splitNumber(cellValues.minimum_order_amount) + " "}€</p>,
      valueGetter: (cellValues) => cellValues.minimum_order_amount,
      minWidth: 180,
      flex: 1.5,
    },
    {
      field: "delivery_fee",
      title: trans("Delivery Fee"),
      minWidth: 160,
      flex: 1.25,
      render: (cellValues) => <p>{splitNumber(cellValues.delivery_fee) + " "}€</p>,
      valueGetter: (cellValues) => cellValues.value,
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      minWidth: 200,
      flex: 2,
      render: (cellValues) => {
        return (
          <div>
            {(role == "SuperAdmin" || permissions.match("edit") != null) && (
              <Link
                to={
                  "/delivery/companies/edit/" + cellValues.id
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

  const splitNumber = (val) => {
    return val.toString().replaceAll('.', trans("dot"))
  }

  return (
    <>
      <Fragment>
        {/* <Breadcrumb
          parent={trans("Supplier")}
          title={trans("Delivery Companies")}
          subtitle={trans("List")}
        />
        <Container fluid={true}>
          <Card> */}
        <CardHeader className="p-0 pb-4 mb-4 d-flex">
          <Col md="6">{/* <h5>{trans("Delivery Companies")}</h5> */}</Col>
          {(role == "SuperAdmin" || permissions.match("create") != null) && (
            <Col md="6" className="text-right">
              <Link to="/delivery/companies/create">
                <Button>
                  <i className="fa fa-plus mr-2"></i>
                  {trans("Create Delivery Companies")}
                </Button>
              </Link>
            </Col>
          )}
        </CardHeader>
        {/* <CardBody> */}
        <DataGrid
          columns={columns}
          data={deliveryCompany.companiesList}
          isLoading={deliveryCompany.companiesList.length == 0 ? true : false}
        />
        {/* </CardBody> */}
        {/* </Card>
        </Container> */}
      </Fragment>
    </>
  );
};

export default DeliveryCompanies;
