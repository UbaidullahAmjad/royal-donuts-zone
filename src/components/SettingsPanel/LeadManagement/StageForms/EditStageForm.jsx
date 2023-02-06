/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../../layout/breadcrumb/index";
import { Controller, useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import { URL, SIMPLE_URL } from "../../../../env";
import { useDispatch, } from "react-redux";
import {
  StageFormEditAction
} from "../../../../redux/SettingsPanel/LeadManagement/StageForms/actions";

const EditStageForm = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const [countries, setCountries] = useState([
    "Afganistan",
    "Albania",
    "Algeria",
    "Australia",
    "Austria",
    "UK",
    "USA",
    "Germany",
    "Pakistan",
    "Canada",
    "France",
  ]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isEditPage, setIsEditPage] = useState(currentPath.includes("edit"));
  const [LeadsFoundData, setLeadsFoundData] = useState(null);
  const [AllLeadForms, setAllLeadForms] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getLeadsFoundData();
    getAllLeadForms();
  }, []);

  const getLeadsFoundData = async () => {
    const response = await axios.get(`${URL}/lead_status/${params.id}/edit`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    setLeadsFoundData(response.data.status);
  };

  const getAllLeadForms = async () => {
    const response = await axios.get(`${URL}/lead_status`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
    });
    const leads = response.data.status;
    setAllLeadForms(leads);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("stage", data.stage);
    formData.append("_method", "PATCH");

    dispatch(StageFormEditAction(formData, params.id, trans));
  };

  const goBack = () => {
    navigate(`/homeSettings/Lead-Management/LeadManagement`);
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={
          (isEditPage == true ? trans("Edit") : trans("View")) +
          " " +
          trans("Stage") +
          " " +
          trans("Form")
        }
        parent={trans("CRM")}
        title={trans("Stage") + " / " + trans("Forms")}
        subtitle={isEditPage == true ? trans("Edit") : trans("View")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">
                  <h5>
                    {trans("CRM")}{" "}
                    {isEditPage == true ? trans("Edit") : trans("View")}{" "}
                    {trans("Stage")} {trans("Form")}
                  </h5>
                  <Button onClick={goBack}>{trans("Go Back")}</Button>
                </div>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="8 mb-3">
                      <Card style={{ border: "1px solid rgba(0,0,0, 0.1)" }}>
                        <CardBody className="px-2">
                          <div className="row m-0">
                            <Col md="6 mb-3">
                              <Label htmlFor="validationCustom02">
                                {trans("Name")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                readOnly={isEditPage == false}
                                className="form-control"
                                name="name"
                                type="text"
                                placeholder={`${trans("Enter")} ${trans(
                                  "Name"
                                )}`}
                                innerRef={register({
                                  required: true,
                                  maxLength: 30,
                                  pattern: /^[a-zA-Z0-9.\s]+$/,
                                })}
                                key={
                                  LeadsFoundData != null && LeadsFoundData.name
                                }
                                defaultValue={
                                  LeadsFoundData != null && LeadsFoundData.name
                                }
                              />
                              <span>
                                {(errors.name?.type == "required" &&
                                  trans("field is required")) ||
                                  (errors.name?.type == "maxLength" &&
                                    trans("Maximum Length: ") + "30") ||
                                  (errors.name?.type == "pattern" &&
                                    trans("Please write alphanumeric values"))}
                              </span>
                              <div className="valid-feedback">
                                {trans("Looks good!")}
                              </div>
                            </Col>
                            <Col md="6 mb-3">
                              <Label htmlFor="validationCustom02">
                                {trans("Select") + " " + trans("Stage")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              {isEditPage == false ? (
                                <input
                                  type={"text"}
                                  className="form-control"
                                  defaultValue={
                                    LeadsFoundData != null &&
                                    LeadsFoundData.stage
                                  }
                                  key={
                                    LeadsFoundData != null &&
                                    LeadsFoundData.stage
                                  }
                                  readOnly
                                />
                              ) : (
                                <Controller
                                  control={control}
                                  name="stage"
                                  rules={{ required: true }}
                                  key={
                                    LeadsFoundData != null &&
                                    LeadsFoundData.stage
                                  }
                                  defaultValue={
                                    LeadsFoundData != null &&
                                    LeadsFoundData.stage
                                  }
                                  render={() => (
                                    <Input
                                      className="form-control"
                                      name="stage"
                                      type="select"
                                      innerRef={register({ required: true })}
                                      key={
                                        LeadsFoundData != null &&
                                        LeadsFoundData.stage
                                      }
                                      defaultValue={
                                        LeadsFoundData != null &&
                                        LeadsFoundData.stage
                                      }
                                    >
                                      <option value="" selected="true" disabled>
                                        {trans("Select") + " " + trans("Stage")}
                                      </option>
                                      {/* <option value={"1"}>
                                                                            {"1"}
                                                                        </option> */}
                                      <option value={"2"}>{"2"}</option>
                                      <option value={"3"}>{"3"}</option>
                                      <option value={"4"}>{"4"}</option>
                                      <option value={"5"}>{"5"}</option>
                                      <option value={"6"}>{"6"}</option>
                                      <option value={"7"}>{"7"}</option>
                                    </Input>
                                  )}
                                />
                              )}
                              <span className="text-danger">
                                {errors.stage &&
                                  `${trans("Franchise")} ${trans(
                                    "is required"
                                  )}`}
                              </span>
                              <div className="valid-feedback">
                                {trans("Looks good!")}
                              </div>
                            </Col>
                            <Col md="12 mb-3">
                              {isEditPage == true && (
                                <>
                                  <Button color="success">
                                    {trans("Save")}
                                  </Button>
                                </>
                              )}
                            </Col>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="4">
                      <Card
                        className="px-2 py-4"
                        style={{ border: "1px solid rgba(0,0,0, 0.1)" }}
                      >
                        <div className="row m-0">
                          <Col md="12 p-0">
                            {AllLeadForms &&
                              AllLeadForms.sort((a, b) =>
                                a.stage > b.stage ? 1 : -1
                              ).map((all_forms) => {
                                return (
                                  <>
                                    <Col md="12 mb-3">
                                      <Label htmlFor="validationCustom02">
                                        {trans("Lead")} {trans("Form")}{" "}
                                        {trans("Name")}
                                      </Label>
                                      <Input
                                        disabled
                                        readOnly={isEditPage == false}
                                        className="form-control"
                                        // name="name"
                                        type="text"
                                        placeholder={`${trans("Enter")} ${trans(
                                          "First Name"
                                        )}`}
                                        innerRef={register({ required: true })}
                                        key={
                                          all_forms != null && all_forms.name
                                        }
                                        defaultValue={
                                          all_forms != null && all_forms.name
                                        }
                                      />
                                      <span>
                                        {errors.name &&
                                          `${trans("Lead")} ${trans(
                                            "is required"
                                          )}`}
                                      </span>
                                      <div className="valid-feedback">
                                        {trans("Looks good!")}
                                      </div>
                                    </Col>
                                  </>
                                );
                              })}
                          </Col>
                        </div>
                      </Card>
                    </Col>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default EditStageForm;
