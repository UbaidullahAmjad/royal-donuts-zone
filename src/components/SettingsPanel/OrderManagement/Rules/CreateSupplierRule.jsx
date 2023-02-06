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
import {
  Rule,
  deliveryDays,
  AcceptanceTime,
  treatmentDay,
  Name,
  Role,
} from "../../../../constant/index";
import Typeahead from "../../../../components/TypeAhead/TypeAhead";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  SupplierRuleCreateAction,
} from "../../../../redux/SettingsPanel/OrderManagement/Rules/actions";

const CreateSupplierRule = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);

  const TypeHeadChanged = (data_selected) => {
    setValue("delivery", data_selected);
  };

  const onSubmit = (data) => {
    var days_array = [];
    data.delivery.map((item, index) => days_array.push(item));

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("acceptance", data.acceptance);
    formData.append("treatment", data.treatment);
    formData.append("delivery", JSON.stringify(days_array));

    dispatch(SupplierRuleCreateAction(formData, trans, setError));
  };

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement`);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/rule/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
    };
    getData();
  }, []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Create Rule")}
        parent={trans("Supplier") + " & " + trans("Rules")}
        title={trans("Rules")}
        subtitle={trans("Create")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans(Rule)}</h5>
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
                        {trans(Name)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        placeholder={trans("Enter name")}
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
                        {trans(AcceptanceTime)}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control digits"
                        type="time"
                        name="acceptance"
                        innerRef={register({ required: true })}
                      />
                      <span>
                        {errors.acceptance && trans("time is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(treatmentDay)}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="treatment"
                        type="number"
                        step="any"
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                      />
                      <span>
                        {errors.treatment?.type == "required" &&
                          trans("day is required")}
                        {errors.treatment?.type == "maxLength" &&
                          trans("Maximum Length: ") + "12"}
                        {errors.treatment?.type == "pattern" &&
                          trans("Number can not be a negative value")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(deliveryDays)}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="delivery"
                        rules={{ required: true }}
                        render={() => (
                          <Typeahead
                            id="multiple-typeahead"
                            className=""
                            clearButton
                            labelKey="name"
                            onChange={(selected) => TypeHeadChanged(selected)}
                            multiple
                            options={days}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.delivery && trans("field is required")}
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

export default CreateSupplierRule;
