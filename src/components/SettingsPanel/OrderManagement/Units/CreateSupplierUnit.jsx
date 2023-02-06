/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../../layout/breadcrumb/index";
import { useForm } from "react-hook-form";
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
import { unit, unitAbrreviation } from "../../../../constant/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import { URL } from "../../../../env";
import { useDispatch, } from "react-redux";
import {
  UnitCreateAction,
} from "../../../../redux/SettingsPanel/OrderManagement/Units/actions";

const CreateSupplierUnit = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const onSubmit = (data) => {
    dispatch(UnitCreateAction(data, trans));
  };

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement`);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/unit/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
    };
    getData();
  }, []);
  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Create Unit")}
        parent={trans("Purchases") + " & " + trans("Supplies")}
        title={trans("Units")}
        subtitle={trans("Create")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans(unit)}</h5>
                <Button onClick={goBack}>{trans("Go Back")}</Button>
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
                        {trans(unit)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder={trans("Enter unit")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {errors.name?.type == "required" &&
                          trans("field is required")}
                        {errors.name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("French Abbreviation")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="abbreviation"
                        type="text"
                        placeholder={trans("Enter abbreviation")}
                        innerRef={register({
                          required: true,
                          maxLength: 2,
                          pattern: /^.*[a-zA-Z]+.*$/,
                        })}
                      />
                      <span>
                        {errors.abbreviation?.type == "required" &&
                          trans("abbreviation is required")}
                        {errors.abbreviation?.type == "maxLength" &&
                          trans("Maximum Length: ") + "2"}
                        {errors.abbreviation?.type == "pattern" &&
                          "Only alphabets are allowed"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  <Button color="success">{trans("Save")}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CreateSupplierUnit;
