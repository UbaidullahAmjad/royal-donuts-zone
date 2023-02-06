/* eslint-disable eqeqeq */
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
  Badge,
  Media,
} from "reactstrap";
import Breadcrumb from "../../../../layout/breadcrumb";
import DataTable from "../../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import { URL, SIMPLE_URL } from "../../../../env";
import { useDispatch, useSelector } from "react-redux";
import {
  StageFormsListAction,
  DeleteStageFormAction,
} from "../../../../redux/SettingsPanel/LeadManagement/StageForms/actions";

const ListForms = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allStageForms = useSelector((state) => state.getStageForms);
  useEffect(() => {
    if (allStageForms?.stageFormsList.length == 0) {
      dispatch(StageFormsListAction())
    }
    if (allStageForms && allStageForms.stageFormsList.length > 0
      && allStageForms.tempArrLength != 0
      && allStageForms.stageFormsList.length != allStageForms.tempArrLength) {
      dispatch(StageFormsListAction())
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
          dispatch(DeleteStageFormAction(id, trans))
        }
      });
    }
  };

  const getCurrLeadStage = (stage_id) => {
    if (stage_id === 0) {
      return trans("Lead");
    } else if (stage_id == 1) {
      return trans("Qualified Lead");
    } else if (stage_id == 2) {
      return trans("Negotiation in progress");
    } else if (stage_id === 3) {
      return trans("Signup in process");
    } else if (stage_id == 4) {
      return trans("New Franchise");
    } else if (stage_id == 5) {
      return trans("Active Franchise");
    } else {
      return trans("Lead");
    }
  };

  const getLeadStatus = (status_id) => {
    if (status_id == 0) {
      return trans("Pending");
    } else if (status_id == 1) {
      return trans("Rejected");
    } else if (status_id == 2) {
      return trans("Approved");
    } else {
      return trans("Select Status");
    }
  };

  const columns = [
    { field: "index", title: "#", flex: 0.6, minWidth: 70 },
    { field: "name", title: trans("Name"), flex: 1, minWidth: 240 },
    { field: "stage", title: trans("Stage"), flex: 1, minWidth: 120 },
    {
      field: "action",
      title: trans("Action"),
      flex: 2,
      minWidth: 250,
      render: (cellValues) => {
        return (
          <div className="d-flex w-100">
            {/* <Button color="primary mr-2" outline onClick={() => checkListItemView(cellValues.id)}>
                            <i className="fa fa-eye"></i>
                        </Button> */}
            <Link to={`/crm/stage/forms/view/${cellValues.id}`}>
              <Button color="primary mr-2">
                <i className="fa fa-eye"></i>
              </Button>
            </Link>
            <Link to={`/crm/stage/forms/edit/${cellValues.id}`}>
              <Button color="warning mr-2">
                <i className="fa fa-edit"></i>
              </Button>
            </Link>
            <Button
              color="danger"
              className="sweet-7 mr-4"
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

  const checkListItemView = async (id) => {
    await axios
      .get(`${URL}/leadss/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        navigate(`/crm/leads/view/${id}`);
      })
      .catch((err) => {
        SweetAlert.fire({
          icon: "error",
          title: trans("Lead") + " " + trans("View"),
          // text: trans("This User don't have any Lead"),
          text: trans(err.response.data.message),
          confirmButtonText: trans("OK"),
        });
      });
  };

  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      {/* <Breadcrumb
                parent={trans("Leads") + " / " + trans("Forms")}
                title={trans("Listing")}
            /> */}
      {/* <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card> */}
      <CardHeader className="p-0 pb-4 mb-4 d-flex">
        <Col md="6">
          {/* <h5>
            {trans("Stage")} {trans("Forms")}
          </h5> */}
        </Col>
        {permissions.match("create") && (
          <Col md="6" className="text-right">
            <Link to="/crm/stage/forms/create">
              <Button>
                <i className="fa fa-plus mr-2"></i>
                <span className="text-capitalize">
                  {`${trans("create")} ${trans("Forms")} `}
                </span>
              </Button>
            </Link>
          </Col>
        )}
      </CardHeader>
      <DataTable
        columns={columns}
        data={allStageForms.stageFormsList}
        isLoading={allStageForms.stageFormsList.length == 0 ? true : false}
      />
      {/* </Card>
          </Col>
        </Row>
      </Container> */}
    </Fragment>
  );
};

export default ListForms;
