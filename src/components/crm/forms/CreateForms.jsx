/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
import { URL } from "../../../env";

const CreateForm = (props) => {
  const trans = props.t;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const onSubmit = (data) => {
    console.log("Lead_Form submitted data", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("stage", data.stage);

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/lead_status`,
      data: formData,
    })
      .then((response) => {
        console.log("Lead Form response", response);
        if (response.data.success === true) {
          toast.success(
            `${trans("Lead")} ${trans("created")} ${trans("successfully")}`,
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          // navigate(`/crm/leads/list/RD`);
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        const err_msg = "" + err.response.data.message;
        console.log("CreateLead-error", err_msg);
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const goBack = () => {
    navigate(`/homeSettings/Lead-Management/LeadManagement/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb
        parent={trans("Leads") + " / " + trans("Forms")}
        title={trans("Create")}
      />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">
                  <h5>
                    {trans("CRM")} {trans("Create")} {trans("Leads Form")}
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
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Lead") + " " + trans("Name")}
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder={`${trans("Enter")} ${trans(
                          "Lead"
                        )} ${trans("Name")}`}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
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
                    {/* <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Select") + " " + trans("Stage")}
                      </Label>
                    
                          <Input
                            className="form-control"
                            name="stage"
                            type="number"
                            innerRef={register({ required: true, maxLength: 12,   pattern: /^[a-zA-Z0-9.\s]+$/ })}
                          ></Input>
        
                      <span className="text-danger">
                      {errors.stage?.type == "required" && trans("field is required")}
                        {errors.stage?.type == "maxLength" && trans("Maximum Length: ") + "12. "
                        }
                        { errors.stage?.type == "pattern" && trans("Please write numeric values")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col> */}
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Select") + " " + trans("Stage")}
                      </Label>
                      <Controller
                        control={control}
                        name="stage"
                        rules={{ required: true }}
                        defaultValue=""
                        render={() => (
                          <Input
                            className="form-control"
                            name="stage"
                            type="select"
                            innerRef={register({ required: true })}
                          >
                            <option value="" selected="true" disabled>
                              {trans("Select") + " " + trans("Stage")}
                            </option>
                            <option value={"1"}>
                              {"1"}
                            </option>
                            <option value={"2"}>
                              {"2"}
                            </option>
                            <option value={"3"}>
                              {"3"}
                            </option>
                            <option value={"4"}>
                              {"4"}
                            </option>
                            <option value={"5"}>
                              {"5"}
                            </option>
                            <option value={"6"}>
                              {"6"}
                            </option>
                            <option value={"7"}>
                              {"7"}
                            </option>
                            <option value={"8"}>
                              {"8"}
                            </option>
                          </Input>
                        )}
                      />
                      <span className='text-danger'>
                        {errors.stage && `${trans("Stage")} ${trans("is required")}`}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  <Button color="primary">{trans("Submit form")}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(CreateForm);
