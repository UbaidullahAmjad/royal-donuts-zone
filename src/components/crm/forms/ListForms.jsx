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
import Breadcrumb from "../../../layout/breadcrumb";
import DataTable from "../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import { URL, SIMPLE_URL } from "../../../env";

const ListForms = (props) => {
  const trans = props.t;

  const navigate = useNavigate();
  const [allLeadForms, setAllLeadForms] = useState([]);

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
    { field: "index", headerName: "#", width: 70 },
    { field: "name", headerName: trans("Name"), minWidth: 240 },
    { field: "stage", headerName: trans("Stage"), minWidth: 120 },
    {
      field: "action",
      headerName: trans("Action"),
      minWidth: 250,
      renderCell: (cellValues) => {
        return (
          <div className="d-flex w-100">
            {/* <Button color="primary mr-2" outline onClick={() => checkListItemView(cellValues.row.id)}>
                            <i className="fa fa-eye"></i>
                        </Button> */}
            <Link to={`/crm/stage/forms/view/${cellValues.row.id}/RD`}>
              <Button color="primary mr-2" outline>
                <i className="fa fa-eye"></i>
              </Button>
            </Link>
            <Link to={`/crm/stage/forms/edit/${cellValues.row.id}/RD`}>
              <Button color="primary mr-2" outline>
                <i className="fa fa-edit"></i>
              </Button>
            </Link>
            <Button
              color="danger"
              className="sweet-7 mr-4"
              name="alertDanger"
              onClick={(e) => Displayalert(e.target.name, cellValues.row.id)}
            >
             <i className="fa fa-trash-o" title="alertDanger" onClick={(e) => Displayalert(e.target.title, cellValues.row.id)}></i>
            </Button>
          </div>
        );
      },
    },
  ];

  const DeleteItem = async (id) => {
    console.log("Lead-IDDDDDDDD--- ", id);
    const res = await axios
      .delete(`${URL}/lead_status/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("Lead-RESSS", response);
        const deleted_product = allLeadForms.filter((item) => item.id !== id);
        const index_update = deleted_product;
        index_update.map((item, index) => (item["index"] = index + 1));
        setAllLeadForms(index_update);
      });
  };

  const checkListItemView = async (id) => {
    await axios
      .get(`${URL}/leadss/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        navigate(`/crm/leads/view/${id}/RD`);
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

  useEffect(() => {
    const getAllLeadForms = async () => {
      const response = await axios.get(`${URL}/lead_status`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("lead-forms:", response);
      const leads = response.data.status;
      leads.map((item, index) => (item["index"] = index + 1));
      setAllLeadForms(leads);
    };

    getAllLeadForms();
  }, []);

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
                  <h5>
                    {trans("Stage")} {trans("Forms")}
                  </h5>
                </Col>
                {permissions.match("create") && (
                  <Col md='6' className="text-right">
                    <Link to="/crm/stage/forms/create/RD">
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

                <DataTable height={90} columns={columns} rows={allLeadForms} />
            {/* </Card>
          </Col>
        </Row>
      </Container> */}
    </Fragment>
  );
};

export default translate(ListForms);
