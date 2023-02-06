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
  Form,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import Breadcrumb from "../../../layout/breadcrumb";
import DataTable from "../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import { URL, SIMPLE_URL } from "../../../env";
import FormLeadView from "./FormLeadView";
import { async } from "@firebase/util";
import { sendSignInLinkToEmail } from "firebase/auth";

const ViewLeads = (props) => {
  const trans = props.t;

  const navigate = useNavigate();

  const params = useParams();
  const [currLeadView, setCurrLeadView] = useState([]);
  const [leadUser, setLeadUser] = useState({});
  const [leadUserCurrStatus, setLeadUserCurrStatus] = useState("");
  const [lastLeadData, setLastLeadData] = useState("");
  const [FormLeadData, setFormLeadData] = useState([]);

  const [AllLeadStages, setAllLeadStages] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const handleModalToggle = () => {
    setOpenModal(!openModal);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const getCurrLeadStage = (stage_id) => {
    if (stage_id === 1) {
      return trans("Lead");
    } else if (stage_id === 2) {
      return trans("Qualified Lead");
    } else if (stage_id === 3) {
      return trans("Negotiation in progress");
    } else if (stage_id === 4) {
      return trans("Signup in process");
    } else if (stage_id === 5) {
      return trans("New Franchise");
    } else if (stage_id === 6) {
      return trans("Active Franchise");
    } else {
      return trans("Lead");
    }
  };

  const getLeadStatus = (status_id) => {
    if (status_id === 0) {
      return trans("Pending");
    } else if (status_id === 1) {
      return trans("Rejected");
    } else if (status_id === 2) {
      return trans("Approved");
    } else {
      return trans("Select Status");
    }
  };

  const columns = [
    { field: "id", headerName: "#", flex: 0.3, },
    // { field: "user_id", headerName: trans("User ID"), minWidth: 120 },
    {
      field: "stage",
      headerName: trans("Lead") + " " + trans("Stage"),
      minWidth: 160,
      renderCell: (cellValues) => {
        return cellValues.row.stage.name;
      },
    },
    {
      field: "submission",
      headerName: trans("Date"),
      flex: 1,
      renderCell: (cellValues) => {
        return cellValues.value.split("T")[0];
      },
    },
    {
      field: "status",
      headerName: trans("Status"),
      flex: 1,
      renderCell: (cellValues) => {
        return getLeadStatus(cellValues.value);
      },
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 1,
      renderCell: (cellValues) => {
        console.log("CELLVALUES ---- ", cellValues);
        return (
          <div className="text-center d-flex flex-direction-row">
            {/* handleModalToggle */}
            {/* () => getViewFormByLead(cellValues.row.form_id, cellValues.row.user_id) */}
            {console.log("ViewLeads-cellValues.row:", cellValues.row)}
            <Button
              color="primary mr-2"
              outline
              onClick={() =>
                getViewFormByLead(
                  cellValues.row.form_id,
                  cellValues.row.user_id,
                  cellValues.row.submission
                )
              }
            >
              <i class="fa fa-eye"></i>
            </Button>
            {cellValues.row.status != 1 && cellValues.row.status != 2 && (
              <Button
                color="danger mr-2"
                outline
                onClick={() =>
                  SweetAlert.fire({
                    title: trans("Are you sure?"),
                    text: trans(
                      "Do you want to change the current form status !"
                    ),
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: trans("Cancel"),
                    confirmButtonText: trans("Change"),
                    reverseButtons: true,
                  }).then((result) => {
                    console.log("result value", result);
                    if (result.value) {
                      handleResubmission(
                        cellValues.row.form_id,
                        cellValues.row.user_id
                        // cellValues.row.submission
                      );
                    }
                    if (result.dismiss) {
                      // getLeadView();
                      // setLeadUserCurrStatus(leadUserCurrStatus)
                    }
                  })
                }
              >
                {/* <i class="far fa-file-excel"></i> */}
                <i class="fa fa-file"></i>
                {/* <span>{trans("Resubmission")}</span> */}
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getLeadView();
    getAllLeadStages();
  }, []);

  const getLeadView = async () => {
    const response = await axios.get(`${URL}/leadss/${params.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    console.log("leads_view", response);
    const lead_user = response.data.user;
    setLeadUser(lead_user);
    setLeadUserCurrStatus(leadUser.progress_status);
    const data = response.data.data;
    data.map((item, index) => (item["id"] = index + 1));
    const leadView = data.map((item) => item);
    console.log("leads_view_data", leadView);
    setCurrLeadView(leadView);

    // const stateLastLead = leadView[leadView.length - 1];
    const stateLastLead = leadView[0];
    console.log("stateLastLead", stateLastLead);
    setLastLeadData(stateLastLead);
  };

  const changeCurrentStage = (event) => {
    const { value } = event.target;

    const currStatus = value !== 0 && value !== "" ? value : 0;

    console.log("VALUE  ---- ", currStatus);

    console.log("LEAD USER ------------", leadUser);
    // throw new Error("DFSDF");

    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Do you want to change the current Stage !"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Change"),
      reverseButtons: true,
    }).then((result) => {
      console.log("result value", result);
      if (result.value) {
        getCurrentStage(currStatus);
      }
      if (result.dismiss) {
        // getLeadView();
        // setLeadUserCurrStatus(leadUserCurrStatus)
      }
    });
  };

  const getAllLeadStages = async () => {
    const response = await axios.get(`${URL}/lead_status`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    console.log("lead-forms:", response);
    const leads = response.data.status;
    leads.map((item, index) => (item["index"] = index + 1));
    setAllLeadStages(leads);
  };

  const getCurrentStage = async (currStatus) => {
    axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/leadchangestatus`,
      params: {
        lead_id: lastLeadData.user_id,
        form_id: lastLeadData.form_id,
        status: currStatus,
      },
    })
      .then((response) => {
        SweetAlert.fire({
          icon: "success",
          title: trans("Lead") + " " + trans("Status"),
          text:
            trans("Lead") +
            " " +
            trans("Status") +
            " " +
            trans("Changed") +
            " " +
            trans("Successfully") +
            " !!",
          confirmButtonText: trans("OK"),
        });
        getLeadView();
      })
      .catch((err) => {
        console.log("changeCurrentStage_err", err);
        console.log("changeCurrentStage_err.response", err.response);
        toast.error(trans(err.response.data.message), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const getViewFormByLead = async (form_id, user_id, submission) => {
    await axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/viewformbylead`,
      params: {
        form_id: form_id,
        user_id: user_id,
      },
    })
      .then((response) => {
        console.log("lead_viewformbylead", response);
        console.log(
          "SUBMISSION TIME ---- ",
          submission.split(":")[0] + submission.split(":")[1]
        );
        console.log(
          "FIND SUBMISSION DATA --- ",
          response.data.data[0].field_data.find(
            (item) =>
              item.created_at.split(":")[0] + item.created_at.split(":")[1] ==
              submission.split(":")[0] + submission.split(":")[1]
          )
        );

        const response_data = response.data.data;
        const form_data_response = response.data.data.findIndex((item) =>
          item.field_data.find(
            (item2) =>
              item2.created_at.split(":")[0] + item2.created_at.split(":")[1] ==
              submission.split(":")[0] + submission.split(":")[1]
          )
        );
        const form_data = response.data.data[
          form_data_response
        ].field_data.find(
          (item) =>
            item.created_at.split(":")[0] + item.created_at.split(":")[1] ==
            submission.split(":")[0] + submission.split(":")[1]
        );
        const form_data_field = [];
        form_data_field.push(form_data);
        response_data[form_data_response].field_data = form_data_field;
        console.log("FORM DATA RESPONSE ---- ", response_data);
        setFormLeadData(response_data);
        if (FormLeadData !== []) {
          handleModalToggle();
        }
        setOpenModal(true);
      })
      .catch((err) => {
        console.log("lead_viewformbylead_error", err);
        console.log("lead_viewformbylead_error.response", err.response);
        if (err) {
          toast.error(trans(err.response.data.message), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  const handleResubmission = async (form_id, user_id) => {
    await axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/leadformrejected`,
      params: {
        id: user_id,
        form_id: form_id,
      },
    })
      .then((response) => {
        SweetAlert.fire({
          icon: "success",
          title: trans("Lead") + " " + trans("Status"),
          text:
            trans("Lead") +
            " " +
            trans("Status") +
            " " +
            trans("Rejected") +
            " " +
            trans("Successfully") +
            " !!",
          confirmButtonText: trans("OK"),
        });
        getLeadView();
      })
      .catch(() => {
        toast.error(trans("Rejected") + " " + trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const goBack = () => {
    navigate(`/crm/leads/list/RD`);
  };

  // console.log("lastLeadState.stage", lastLeadData.stage)

  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <Breadcrumb
        parent={trans("Lead") + " " + trans("View")}
        title={trans("Lead") + " " + trans("View")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="6">
                    <h5>
                      {trans("CRM")} {trans("Leads")} {trans("View")}
                    </h5>
                    <div
                      className="mt-4"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <h6
                        className="mb-0"
                        style={{ minWidth: 60, fontSize: 18 }}
                      >
                        Name:{" "}
                      </h6>
                      <p className="mb-0" style={{ fontSize: 16 }}>
                        {leadUser.name} {leadUser.last_name}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h6
                        className="mb-0"
                        style={{ minWidth: 60, fontSize: 18 }}
                      >
                        Email:{" "}
                      </h6>
                      <p className="mb-0" style={{ fontSize: 16 }}>
                        {leadUser.email}
                      </p>
                    </div>
                  </Col>
                  <Col md="6" className="row w-100 justify-content-end">
                    <div className="col-8 col-md-6">
                      <Button onClick={goBack} style={{ float: "right" }}>
                        {trans("Go Back")}
                      </Button>
                      <br />
                      <br />
                      <div style={{ width: "100%", fontSize: 16 }}>
                        <Label htmlFor="validationCustom02">
                          {trans("Lead") + " " + trans("Stage")}
                        </Label>
                        <Controller
                          control={control}
                          name="lead_stage"
                          rules={{ required: true }}
                          key={lastLeadData !== "" ? lastLeadData.stage : ""}
                          defaultValue={
                            lastLeadData !== "" ? lastLeadData.stage : ""
                          }
                          render={() => (
                            <Input
                              className="form-control"
                              name="lead_status"
                              type="select"
                              // innerRef={register({ required: true })}
                              // key={
                              //   leadUser != "" ? leadUser.progress_status : ""
                              // }
                              // defaultValue={
                              //   leadUser != "" ? leadUser.progress_status : ""
                              // }
                              value={
                                leadUser != null && leadUser.progress_status
                              }
                              onChange={changeCurrentStage}
                            >
                              <option value="" selected="true" disabled>
                                {trans("Change") + " " + trans("Status")}
                              </option>
                              {AllLeadStages.length > 0 &&
                                AllLeadStages.sort((a, b) =>
                                  a.stage > b.stage ? 1 : -1
                                ).map((item) => {
                                  if (item.stage != 1) {
                                    return (
                                      <option
                                        value={item.stage}
                                        disabled={
                                          leadUser.progress_status != null &&
                                          leadUser.progress_status >= item.stage
                                            ? true
                                            : false
                                        }
                                        selected={
                                          leadUser.progress_status != null &&
                                          leadUser.progress_status == item.stage
                                            ? true
                                            : false
                                        }
                                      >
                                        {item.name}
                                      </option>
                                    );
                                  }
                                })}
                              {/* <option
                                value={0}
                                disabled={
                                  leadUser != null &&
                                    leadUser.progress_status != null &&
                                    leadUser.progress_status == 0
                                    ? true
                                    : false
                                }
                              >
                                {trans("Lead")}
                              </option> */}
                              {/* <option
                                value={1}
                                disabled={
                                  leadUser != null &&
                                    leadUser.progress_status != null &&
                                    leadUser.progress_status == 1
                                    ? true
                                    : false
                                }
                              >
                                {trans("Qualified Lead")}
                              </option> */}
                              {/* <option
                                value={2}
                                disabled={
                                  leadUser != null &&
                                    leadUser.progress_status != null &&
                                    leadUser.progress_status == 2
                                    ? true
                                    : false
                                }
                              >
                                {trans("Negotiation in progress")}
                              </option> */}
                              {/* <option
                                value={3}
                                disabled={
                                  leadUser != null &&
                                    leadUser.progress_status != null &&
                                    leadUser.progress_status == 3
                                    ? true
                                    : false
                                }
                              >
                                {trans("Signup in process")}
                              </option> */}
                              {/* <option
                                value={4}
                                disabled={
                                  leadUser != null &&
                                    leadUser.progress_status != null &&
                                    leadUser.progress_status == 4
                                    ? true
                                    : false
                                }
                              >
                                {trans("New Franchise")}
                              </option> */}
                              {/* <option
                                value={5}
                                disabled={
                                  leadUser != null &&
                                    leadUser.progress_status != null &&
                                    leadUser.progress_status == 5
                                    ? true
                                    : false
                                }
                              >
                                {trans("Active Franchise")}
                              </option> */}
                            </Input>
                          )}
                        />
                        <span className="text-danger">
                          {errors.lead_stage &&
                            `${trans("Stage")} ${trans("is required")}`}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <DataTable height={120} columns={columns} rows={currLeadView} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <Button color="primary mr-2 mb-1" outline onClick={handleModalToggle}>
                <i className="fa fa-eye"></i>
            </Button> */}
      <Modal
        centered
        scrollable={true}
        isOpen={openModal}
        toggle={handleModalToggle}
      >
        <ModalHeader toggle={handleModalToggle}>
          {trans("Form Lead View")}
        </ModalHeader>
        <ModalBody>
          <span>{""}</span>
          {FormLeadData !== [] ? (
            <FormLeadView leadData={FormLeadData} />
          ) : (
            trans("No Data Found")
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleModalToggle}>{trans("OK")}</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default translate(ViewLeads);
