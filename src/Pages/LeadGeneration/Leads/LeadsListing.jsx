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
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from "reactstrap";
import Breadcrumb from "../../../layout/breadcrumb";
import DataTable from "../../../components/dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link, Redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useTranslation, } from "react-i18next";
import { URL, SIMPLE_URL } from "../../../env";
import { useDispatch, useSelector } from "react-redux";
import {
  LeadsListAction,
  DeleteLeadAction,
} from "../../../redux/Pages/LeadGeneration/Leads/actions";

const LeadsListing = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCSV, setOpenCSV] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const allLeads = useSelector((state) => state.getLeads);

  useEffect(() => {
    if (allLeads?.leadsList.length == 0) {
      dispatch(LeadsListAction())
    }
    if (allLeads && allLeads.leadsList.length > 0
      && allLeads.tempArrLength != 0
      && allLeads.leadsList.length != allLeads.tempArrLength) {
      dispatch(LeadsListAction())
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
          dispatch(DeleteLeadAction(id, trans))
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
    { field: "index_no", title: "#", flex: 0.6, minWidth: 60 },
    {
      field: "name",
      title: trans("First Name"),
      flex: 1.2,
      minWidth: 120,
      render: (cellValues) => {
        return cellValues.lead.name;
      },
      valueGetter: (value) => value.lead.name,
    },
    {
      field: "last_name",
      title: trans("Last Name"),
      flex: 1.2,
      minWidth: 120,
      render: (cellValues) => {
        return cellValues.lead.last_name;
      },
      value: (value) => value.lead.last_name,
    },
    {
      field: "email",
      title: trans("Email"),
      flex: 2,
      minWidth: 200,
      render: (cellValues) => {
        return cellValues.lead.email;
      },
      valueGetter: (value) => value.lead.email,
    },
    // { field: "mobilenumber", title: trans("Mobile Number"), flex: 1, minWidth: 140 },
    {
      field: "franchise_name",
      title: trans("Franchise_Name"),
      flex: 1.5,
      minWidth: 150,
      render: (cellValues) => {
        return cellValues.lead.franchise_name;
      },
      valueGetter: (value) => value.lead.franchise_name,
    },

    {
      field: "stage_name",
      title: trans("Lead") + " " + trans("Stage"),
      flex: 1.2,
      minWidth: 120,
      render: (cellValues) => {
        return cellValues.stage_name;
      },
      valueGetter: (value) => value.stage_name,
    },
    {
      field: "action",
      title: trans("Action"),
      cellClassName: "MuiDataGrid-cell-action-customstyles",
      flex: 2,
      minWidth: 250,
      render: (cellValues) => {
        return (
          <div className="d-flex w-100">
            <Button
              color="primary mr-2"
              outline
              onClick={() => checkListItemView(cellValues.lead.id)}
            >
              <i className="fa fa-eye"></i>
            </Button>
            <Link to={`/crm/leads/edit/${cellValues.lead.id}`}>
              <Button color="warning mr-2">
                <i className="fa fa-edit"></i>
              </Button>
            </Link>
            <Button
              color="danger"
              className="sweet-7 mr-4"
              name="alertDanger"
              onClick={(e) =>
                Displayalert(e.target.name, cellValues.lead.id)
              }
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

  const handleStatusChange = (id, stage_status) => {
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to change the current Stage !"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Change"),
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        // SweetAlert.fire({
        //     icon: "success",
        //     title: (trans("Deleted")),
        //     text: (trans("Lead") + " " + trans("Status") + " " + trans("Changed") + " " + trans("Successfully") + " !!"),
        //     confirmButtonText: trans("OK")
        // });
      }
    });
  };

  const handleStatusRejected = (id, stage_status) => {
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to Reject the current Lead Stage") + " ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Reject"),
      confirmButtonText: trans("Change"),
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        // SweetAlert.fire({
        //     icon: "success",
        //     title: (trans("Lead") + " " + trans("Status")),
        //     text: (trans("Lead") + " " + trans("Status") + " " + trans("Changed") + " " + trans("Successfully") + " !!"),
        //     confirmButtonText: trans("OK")
        // });
      }
    });
  };

  const [csvFile, setCSVFile] = useState();

  const role = atob(localStorage.getItem("role"));
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Leads Listing")}
        parent={trans("Lead Generation")}
        title={trans("Leads")}
        subtitle={trans("List")}
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <Row>
                  {permissions.match("create") && (
                    <Col className="text-right">
                      <Link to="/crm/leads/create" className="mr-2">
                        <Button className="mb-2 mb-sm-0">
                          <i className="fa fa-plus mr-2"></i>
                          <span className="text-capitalize">
                            {`${trans("create")} ${trans("Leads")} `}
                          </span>
                        </Button>
                      </Link>
                    </Col>
                  )}
                </Row>
              </CardHeader>
              <CardBody>
                <DataTable
                  columns={columns}
                  data={allLeads.leadsList}
                  isLoading={allLeads.loading && allLeads.leadsList?.length == 0 ? true : false}
                  get_row_id={(row) => row.lead.id}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LeadsListing;
