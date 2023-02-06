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
import DataTable from "../../dataTable/dataTable";
import SweetAlert from "sweetalert2";
import { Link, Redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { translate } from "react-switch-lang";
import { URL, SIMPLE_URL } from "../../../env";

const LeadsListing = (props) => {
  const trans = props.t;

  const navigate = useNavigate();
  const [allLeads, setAllLeads] = useState([]);
  const [openCSV, setOpenCSV] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });


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
    { field: "index_no", headerName: "#", flex: 0.2 },
    {
      field: "name", headerName: trans("First Name"), flex: 1, renderCell: (cellValues) => {
        return cellValues.row.lead.name;
      },
    },
    {
      field: "last_name", headerName: trans("Last Name"), flex: 1, renderCell: (cellValues) => {
        return cellValues.row.lead.last_name;
      },
    },
    {
      field: "email", headerName: trans("Email"), flex: 1, renderCell: (cellValues) => {
        return cellValues.row.lead.email;
      },
    },
    // { field: "mobilenumber", headerName: trans("Mobile Number"), minWidth: 140 },
    {
      field: "franchise_name",
      headerName: trans("Franchise_Name"),
      flex: 1,
      renderCell: (cellValues) => {
        return cellValues.row.lead.franchise_name;
      },
    },

    {
      field: "stage_name",
      headerName: trans("Lead") + " " + trans("Stage"),
      flex: 1,
      renderCell: (cellValues) => {


        return cellValues.row.stage_name
      },
    },
    {
      field: "action",
      headerName: trans("Action"),
      flex: 2.5,
      renderCell: (cellValues) => {
        return (
          <div className="d-flex w-100">
            <Button
              color="success mr-2"
              outline
              onClick={() => checkListItemView(cellValues.row.lead.id)}
            >
              <i className="fa fa-eye"></i>
            </Button>
            <Link to={`/crm/leads/edit/${cellValues.row.lead.id}/RD`}>
              <Button color="primary mr-2" outline>
                <i className="fa fa-edit"></i>
              </Button>
            </Link>
            <Button
              color="danger"
              className="sweet-7 mr-4"
              name="alertDanger"
              onClick={(e) => Displayalert(e.target.name, cellValues.row.lead.id)}
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
      .delete(`${URL}/leadss/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        console.log("Lead-RESSS", response);
        const deleted_product = allLeads.filter((item) => item.lead.id != id);
        const index_update = deleted_product;
        index_update.map((item, index) => (item["index_no"] = index + 1));
        setAllLeads(index_update);
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
        console.log("id: ", id, " ------  stage_status: ", stage_status);
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
        console.log("id: ", id, " ------  stage_status: ", stage_status);
      }
    });
  };

  useEffect(() => {
    const getAllLeads = async () => {
      const response = await axios.get(`${URL}/leadss`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("leads", response);
      const leads = response.data.leads;
      leads.map((item, index) => (item["index_no"] = index + 1));
      leads.map((item) => {
        if (item.stage != null) {
          item["stage_name"] = item.stage.name;
        } else {
          item["stage_name"] = " ";
        }
      });
      console.log("LEADS -----", leads);
      setAllLeads(leads);
    };

    getAllLeads();
  }, []);

  const [csvFile, setCSVFile] = useState()

  const uploadCSV = (e) => {
    console.log('evente', e.target.files[0])
    setCSVFile(e.target.files[0])
  }

  const SubmitCSV = (data) => {
    const formDatta = new FormData()
    console.log('csv file', csvFile)
    formDatta.append("csv", csvFile)
    axios({
      method: 'post',
      url: `${URL}/product_csv_import`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formDatta
    }).then((res) => console.log('response', res))
  }

  console.log("AllLeads ------ :", allLeads)
  const role = atob(localStorage.getItem("role"))
  const permissions = atob(localStorage.getItem("permissions"));

  return (
    <Fragment>
      <Breadcrumb parent={trans("Leads")} title={trans("Leads Listing")} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <Row>
                  {permissions.match("create") && (
                    <Col className="text-right">
                      <Link to="/crm/leads/create/RD" className="mr-2">
                        <Button className="mb-2 mb-sm-0">
                          <i className="fa fa-plus mr-2"></i>
                          <span className="text-capitalize">
                            {`${trans("create")} ${trans("Leads")} `}
                          </span>
                        </Button>
                      </Link>
                      <Button
                        className="btn btn-primary mr-2 mb-2 mb-sm-0"
                        onClick={() => setOpenCSV(!openCSV)}
                      >
                        {trans("Import CSV")}{" "}
                      </Button>
                      <Button className="btn btn-primary mr-2 mr-sm-0">
                        {trans("Export CSV")}{" "}
                      </Button>
                    </Col>
                  )}
                </Row>

              </CardHeader>
              <CardBody>
                <DataTable height={90} columns={columns} rows={allLeads} get_row_id={(row) => row.lead.id} />
              </CardBody>
              <Modal isOpen={openCSV} toggle={() => setOpenCSV(!openCSV)} centered>
                <ModalHeader toggle={() => setOpenCSV(!openCSV)}>
                  Import CSV file
                </ModalHeader>
                <ModalBody>
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Form
                            id="form1"
                            className="needs-validation"
                            noValidate=""
                            onSubmit={handleSubmit(SubmitCSV)}
                          >
                            <div className="form-row">
                              <Col md="12 mb-3">
                                <Label htmlFor="validationCustom02">
                                  {trans("Upload file")} *
                                </Label>
                                <Input
                                  className="form-control"
                                  name="csv_file"
                                  type="file"
                                  accept=".csv"
                                  onChange={(e) => uploadCSV(e)}
                                  innerRef={register({
                                    required: true,
                                    pattern: /(.*?)\.(csv)$/
                                  })}
                                />
                                <span>
                                  {errors.csv_file?.type == "required" &&
                                    trans("field is required")}
                                  {errors.csv_file?.type == 'pattern' && trans("Only CSV file can be uploaded")}
                                </span>
                              </Col>
                            </div>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-between">
                  <Button color="primary" type="submit" form="form1">
                    {"Upload"}
                  </Button>
                  <Button onClick={() => setOpenCSV(!openCSV)}>cancel</Button>
                </ModalFooter>
              </Modal>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(LeadsListing);
