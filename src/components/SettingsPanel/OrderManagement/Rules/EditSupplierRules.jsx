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
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  SupplierRuleEditAction,
} from "../../../../redux/SettingsPanel/OrderManagement/Rules/actions";

const EditSupplierRules = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const id = params.idd;

  const [deliveryDays, setDeliveryDays] = useState([]);
  const [rules, setRules] = useState(null);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const TypeHeadChanged = (data_selected) => {
    if (data_selected.length == 0) {
      setValue("delivery", []);
      setDeliveryDays([]);
    } else {
      setValue("delivery", data_selected);
    }
  };

  const onSubmit = (data) => {
    var days_array = [];
    if (data.delivery.length == 0) {
      setError("delivery", {
        message: trans("field is required"),
      });
    }
    data.delivery.map((item, index) => days_array.push(item));

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("acceptance", data.acceptance);
    formData.append("treatment", data.treatment);
    formData.append("delivery", JSON.stringify(days_array));
    formData.append("_method", "PATCH");

    dispatch(SupplierRuleEditAction(formData, id, trans, setError));
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/rule/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setDeliveryDays(response.data.delivery_days_array);
      setRules(response.data.rule);
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

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement`);
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Edit Rule")}
        parent={trans("Supplier") + " & " + trans("Rules")}
        title={trans("Rules")}
        subtitle={trans("Edit")}
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
                        key={rules != null && rules.name}
                        defaultValue={rules != null && rules.name}
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
                        {trans("Acceptance Time")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control digits"
                        type="time"
                        name="acceptance"
                        key={rules != null && rules.acceptance_time}
                        defaultValue={rules != null && rules.acceptance_time}
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
                        key={rules != null && rules.treatment_time}
                        defaultValue={rules != null && rules.treatment_time}
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
                        {trans("Delivery Days")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="delivery"
                        key={deliveryDays.length > 0 ? deliveryDays : []}
                        defaultValue={
                          deliveryDays.length > 0 ? deliveryDays : []
                        }
                        rules={{ required: true }}
                        // innerRef={{"delivery", { required: true }}}
                        render={() => (
                          <Typeahead
                            id="multiple-typeahead"
                            labelKey="name"
                            onChange={(selected) => TypeHeadChanged(selected)}
                            multiple
                            key={
                              deliveryDays.length > 0
                                ? deliveryDays.map((item) => {
                                  return item;
                                })
                                : []
                            }
                            defaultSelected={
                              deliveryDays.length > 0
                                ? deliveryDays.map((item) => {
                                  return item;
                                })
                                : []
                            }
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
export default EditSupplierRules;