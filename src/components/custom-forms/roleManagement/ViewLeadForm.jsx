import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { translate } from "react-switch-lang";
import { display } from "@mui/system";
import Dropzone from "react-dropzone-uploader";
import { URL } from "../../../env";

const ViewLeadForm = (props) => {
  const trans = props.t;
  let { idd } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm({ shouldFocusError: true });
  const initialstate = {
    name: "",
  };
  const [FormData, setFormData] = useState(initialstate);
  const { name } = FormData;
  const [AllLeadStages, setAllLeadStages] = useState(null);

  const [FormName, setFormName] = useState("");

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };
  const [forms, setForms] = useState([]);
  const [names, setNames] = useState({});
  const [formOptions, setFormOptions] = useState([]);

  const handleChangeStatus = ({ file }, status) => {
    // if (status == "done") {
    //  setValue("image", file);
    // }
  };

  useEffect(() => {
    const getAllForms = async () => {
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/formss/${idd}/edit`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );

      if (response.data.success === true) {
        // debugger;
        console.log("ViewLeadForm-response", response);
        setForms(response.data.form_fields);
        setNames(response.data.form);
        setFormOptions(response.data.option_ids);
        setFormName(response.data.form.name);
        setFormData({
          ...FormData,
          name: response.data.form.name,
          progress_status: response.data.form.related_to,
          field_label: response.data.form_fields.map(
            (item, index) => item["field_label"]
          ),
          field_name: response.data.form_fields.map(
            (item, index) => item["field_name"]
          ),
          field_type: response.data.form_fields.map(
            (item, index) => item["field_type"]
          ),
        });
      }
    };

    const getAllLeadStages = async () => {
      const response = await axios.get(`${URL}/lead_status`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("lead-forms:", response);
      setAllLeadStages(response.data.status);
    };
    getAllLeadStages();
    getAllForms();
  }, []);

  console.log("formOptions", formOptions);
  console.log("forms", forms);

  // console.log('lead form name',AllLeadStages != null && AllLeadStages.map((item)=>item.stage))

  const goBack = () => {
    navigate(`/lead/forms/list/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Manage Role")} title={trans("View Form")} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center w">
                  <h5>{trans("View Form")}</h5>
                  <Button
                    className=""
                    onClick={goBack}
                    style={{ float: "right" }}
                  >
                    {trans("Go Back")}
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <form className="needs-validation" noValidate="">
                  <Row>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Form Status")}
                      </Label>
                      <Input
                        className="form-control"
                        name="progress_status"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        {/* <option selected="true" value="" disabled>
                          {names.related_to === "0" ? "Lead"
                            : names.related_to === "1" ? "Qualifiled Lead"
                              : names.related_to === "2" ? "Nigotiation in progress"
                                : names.related_to === "3" ? "Signup in progress"
                                  : names.related_to === "4" ? "New Franchise"
                                    : names.related_to === "5" && "Active Franchise"}
                        </option> */}
                        {AllLeadStages != null &&
                          AllLeadStages.length > 0 &&
                          AllLeadStages.sort((a, b) =>
                            a.stage > b.stage ? 1 : -1
                          ).map((lead_form) => {
                            if (lead_form.stage == FormData.progress_status) {
                              return (
                                <option
                                  value={lead_form.stage}
                                  disabled
                                  selected
                                >
                                  {lead_form.name}
                                </option>
                              );
                            }
                          })}
                      </Input>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Form Name")}
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        value={FormName}
                        type="text"
                        placeholder={trans("Form Name")}
                        innerRef={register({ required: true })}
                      />
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    {/* {
                      console.log("forms-sort", forms.sort((a, b) => (a.field_type > b.field_type) ? 1 : -1))
                    } */}
                    {forms
                      .sort((a, b) => a.field_type - b.field_type)
                      .sort((z, x) => z.field_name - x.field_name)
                      .map((val) => {
                        if (val.field_type === "8") {
                          return (
                            <>
                              <Col md="12 mb-0">
                                <Label
                                  htmlFor="validationCustom02"
                                  className="my-1"
                                >
                                  {val.field_label}
                                </Label>
                                <div className="d-flex align-items-center">
                                  {/* <Input
                                  className="form-control"
                                  type="file"
                                  name={val.field_name}
                                  id="formFile"
                                  onChange={onHandleChange}
                                /> */}

                                  <Dropzone
                                    maxFiles={1}
                                    multiple={false}
                                    canCancel={false}
                                    name={val.field_name}
                                    inputContent={trans("Drop A File")}
                                    styles={{
                                      dropzone: { height: 200 },
                                      dropzoneActive: { borderColor: "green" },
                                    }}
                                    accept="image/*"
                                    onChangeStatus={handleChangeStatus}
                                    onChange={onHandleChange}
                                    // accept="image/*,audio/*,video/*"
                                  />
                                </div>
                              </Col>
                            </>
                          );
                        } else if (val.field_type === "5") {
                          return (
                            <>
                              <Col md="12 mb-0">
                                <div className="d-flex align-items-center">
                                  <Input
                                    className="ml-0"
                                    type="checkbox"
                                    name={val.field_name}
                                  />
                                  <Label
                                    className="my-1 ml-4"
                                    htmlFor={val.field_name}
                                    check
                                  >
                                    {val.field_label}
                                  </Label>
                                </div>
                              </Col>
                            </>
                          );
                        } else if (val.field_type === "6") {
                          return (
                            <>
                              <Col md="12 mb-0">
                                <div className="d-flex align-items-center">
                                  <Input
                                    className="ml-0"
                                    type="radio"
                                    name={val.field_name}
                                  />
                                  <Label className="my-1 ml-4">
                                    {val.field_label}
                                  </Label>
                                </div>
                              </Col>
                            </>
                          );
                        } else if (val.field_type === "3") {
                          return (
                            <>
                              <Col md="12 mb-0">
                                <Label
                                  htmlFor="validationCustom02"
                                  className="my-1"
                                >
                                  {val.field_label}
                                </Label>
                                <div className="d-flex align-items-center">
                                  <Input
                                    className="ml-0"
                                    type="number"
                                    name={val.value}
                                    step="any"
                                    innerRef={register({
                                      required: true,
                                      maxLength: 16,
                                      pattern: /^[+]?\d+([.]\d+)?$/,
                                    })}
                                  />
                                </div>
                              </Col>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <Col md="12 mb-2">
                                <Label
                                  htmlFor="validationCustom02"
                                  className="my-1"
                                >
                                  {val.field_label}
                                </Label>
                                <Input
                                  className="form-control"
                                  name={val.field_name}
                                  type={
                                    val.field_type === "1"
                                      ? "Text"
                                      : val.field_type === "2"
                                      ? "Email"
                                      : val.field_type === "3"
                                      ? "Number"
                                      : val.field_type === "4"
                                      ? "Date"
                                      : val.field_type === "5"
                                      ? "Checkbox"
                                      : val.field_type === "6"
                                      ? "Radio"
                                      : val.field_type === "7"
                                      ? "select"
                                      : val.field_type === "8"
                                      ? "File Upload"
                                      : val.field_type === "9"
                                      ? "Text Area"
                                      : val.field_type === "10" && "Password"
                                  }
                                  onChange={onHandleChange}
                                  defaultValue={
                                    val.field_type === "7" ? "" : ""
                                  }
                                  value={val.value}
                                  innerRef={register({ required: true })}
                                >
                                  {val.field_type == 7
                                    ? formOptions.map((option, i) => {
                                        if (option.select_field_id == val.id) {
                                          return (
                                            <option key={i}>
                                              {option.option_name}
                                            </option>
                                          );
                                        }
                                      })
                                    : null}
                                  {val.field_type === "5" ? " " : null}
                                </Input>
                              </Col>
                            </>
                          );
                        }
                      })}
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(ViewLeadForm);
