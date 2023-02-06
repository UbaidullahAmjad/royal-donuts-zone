/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import Breadcrumb from "../../../../layout/breadcrumb";
import DataTable from "../../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation, } from "react-i18next";
import { URL } from "../../../../env";
import { useDispatch, useSelector } from "react-redux";
import {
  LeadFormsListAction,
  DeleteLeadFormAction,
} from "../../../../redux/SettingsPanel/LeadManagement/LeadForms/actions";

const LeadFormsListing = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const allLeads = useSelector((state) => state.getLeadForms);

  useEffect(() => {
    if (allLeads?.leadFormsList.length == 0) {
      dispatch(LeadFormsListAction())
    }
    if (allLeads && allLeads.leadFormsList.length > 0
      && allLeads.tempArrLength != 0
      && allLeads.leadFormsList.length != allLeads.tempArrLength) {
      dispatch(LeadFormsListAction())
    }
  }, []);

  const Displayalert = (name, id) => {
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
          dispatch(DeleteLeadFormAction(id, trans))
          // DeleteItem(id);
          // SweetAlert.fire({
          //   icon: "success",
          //   title: trans("Deleted!"),
          //   text: trans("Your item has been deleted."),
          //   confirmButtonText: trans("OK"),
          // });
        }
      });
    }
  };

  const DeleteItem = async (id) => {
    // const res = await axios
    //   .delete(`${URL}/formss/${id}`, {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token123"),
    //     },
    //   })
    //   .then((response) => {
    //     const deleted_product = allLeads.filter((item) => item.id !== id);
    //     const index_update = deleted_product;
    //     index_update.map((item, index) => (item["index"] = index + 1));
    //     setAllLeads(index_update);
    //   });
  };

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 100 },
    { field: "name", title: trans("First Name"), flex: 2, minWidth: 240 },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 280,
      render: (cellValues) => {
        return (
          <div>
            <Link to={`/lead/forms/view/${cellValues.id}`}>
              <Button color="primary mr-2">
                <i className="fa fa-eye"></i>
              </Button>
            </Link>
            <Link to={`/lead/forms/edit/${cellValues.id}`}>
              <Button color="warning mr-2">
                <i className="fa fa-edit"></i>
              </Button>
            </Link>
            <Button
              color="danger"
              className="sweet-7"
              name="alertDanger"
              onClick={(e) => Displayalert(e.target.name, cellValues.id)}
            >
              <i
                className="fa fa-trash-o"
                title="alertDanger"
                onClick={(e) => Displayalert(e.target.title, cellValues.id)}
              ></i>
            </Button>
          </div>
        );
      },
    },
  ];

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <CardHeader className="p-0 pb-4 mb-4 d-flex">
        <Col md="6">
          {/* <h5>
                  {trans("Lead")} {trans("Forms")} {trans("List")}
                </h5> */}
        </Col>
        {permissions.match("create") && (
          <Col md="6" className="text-right">
            <Link to="/lead/forms/create">
              <Button>
                <i className="fa fa-plus mr-2"></i>
                <span className="text-capitalize">
                  {`${trans("create")} ${trans("Form")} `}
                </span>
              </Button>
            </Link>
          </Col>
        )}
      </CardHeader>
      <DataTable
        columns={columns}
        data={allLeads.leadFormsList}
        isLoading={allLeads.loading && allLeads.leadFormsList.length == 0 ? true : false}
      />
    </Fragment>
  );
};

export default LeadFormsListing;
