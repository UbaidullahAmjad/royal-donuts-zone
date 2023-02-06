/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import axios from "axios";
import { useForm } from "react-hook-form";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import { URL } from "../../../env";
import { useDispatch, useSelector } from "react-redux";
import {
  StripePaymentGetDataAction,
  StripePaymentSaveDataAction,
} from "../../../redux/SettingsPanel/GlobalSettings/StripePayment/actions";

const StripePayment = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const [activeStatus, setActiveStatus] = useState(0);
  const [method, setMethod] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();

  const StripePaymentData = useSelector((state) => state.getStripePayment);

  useEffect(() => {
    if (StripePaymentData?.stripePayment == null) {
      dispatch(StripePaymentGetDataAction())
    }
    if (StripePaymentData.stripePaymentLength != StripePaymentData.tempArrLength) {
      dispatch(StripePaymentGetDataAction())
    }
  }, [StripePaymentData?.tempArrLength]);

  useEffect(() => {
    setMethod(StripePaymentData?.stripePayment);
    setActiveStatus(StripePaymentData?.stripePayment ? StripePaymentData?.stripePayment.isActive ? StripePaymentData?.stripePayment.isActive : 0 : 0);

    //   });
  }, [StripePaymentData?.tempArrLength])


  const goBack = () => {
    navigate(`/delivery/companies/list`);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("stripe_client_id", data.stripe_client_id);
    formData.append("stripe_secret_key", data.stripe_secret_key);
    formData.append("isActive", activeStatus);

    dispatch(StripePaymentSaveDataAction(formData, trans));
  };

  const setActivation = (e) => {
    if (e.target.checked == true) {
      setActiveStatus(1);
    } else if (e.target.checked == false) {
      setActiveStatus(0);
    }
  };

  return (
    <>
      <Fragment>
        {/* <Breadcrumb
          parent={trans("Payments")}
          title={trans("Stripe")}
        /> */}

        {/* <Container fluid={true}>
          <Row> */}
        {/* <Col sm="12">
              <Card> */}
        {/* <CardHeader className="d-flex justify-content-end">
                  <h5>{trans("Stripe Payment")}</h5>
                  <Button onClick={goBack}>{trans("Go Back")}</Button>
                </CardHeader> */}
        {/* <CardBody> */}

        <CardHeader className="p-0 pb-4 mb-4">
          <h5>{trans("Stripe Payment")}</h5>
        </CardHeader>
        <Form
          className="needs-validation"
          noValidate=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-row">
            <Col md="12 mb-3">
              <Label htmlFor="validationCustom02">
                {trans("Stripe")} {trans("Key")}
              </Label>
              <Input
                className="form-control"
                name="stripe_client_id"
                type="text"
                key={method != null && method.stripe_client_id}
                defaultValue={method != null && method.stripe_client_id}
                innerRef={register({
                  required: true,
                  maxLength: 300,
                })}
              />
              <span>
                {errors.stripe_client_id?.type == "required" &&
                  trans("field is required")}
                {errors.stripe_client_id?.type == "maxLength" &&
                  trans("Maximum Length: ") + "300"}
                {errors.stripe_client_id?.type == "pattern" &&
                  "Please write alphanumeric values"}
              </span>
              <div className="valid-feedback">{trans("Looks good!")}</div>
            </Col>

            <Col md="6 mb-3">
              <Label htmlFor="validationCustom02">{trans("Secret key")}</Label>
              <Input
                className="form-control"
                name="stripe_secret_key"
                type="text"
                key={method != null && method.stripe_secret_key}
                defaultValue={method != null && method.stripe_secret_key}
                innerRef={register({
                  required: true,
                  maxLength: 300,
                })}
              />
              <span>
                {errors.stripe_secret_key?.type === "required" &&
                  trans("field is required")}
                {errors.stripe_secret_key?.type === "maxLength" &&
                  trans("Maximum Length: ") + "300"}
                {errors.stripe_secret_key?.type == "pattern" &&
                  "Please write alphanumeric values"}
              </span>
              <div className="valid-feedback">{trans("Looks good!")}</div>
            </Col>
            <Col md="6 mb-3 d-flex justify-content-center align-items-center pt-4">
              <FormControlLabel
                name="isActive"
                control={
                  <Switch
                    name="isActive"
                    type="checkbox"
                    key={method != null && method.isActive}
                    defaultChecked={method != null && method.isActive == 1}
                    onChange={(e) => setActivation(e)}
                  />
                }
                label={trans("Activate")}
                labelPlacement="end"
              />
            </Col>
          </div>
          <Button color="success">{trans("Save")}</Button>
        </Form>
        {/* </CardBody> */}
        {/* </Card>
            </Col>
          </Row>
        </Container> */}
      </Fragment>
    </>
  );
};

export default StripePayment;
