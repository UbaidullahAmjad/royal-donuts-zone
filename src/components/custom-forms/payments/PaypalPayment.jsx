/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import CKEditors from "react-ckeditor-component";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../env";
import { useNavigate } from "react-router-dom";
import { translate } from "react-switch-lang";

const PaypalPayment = (props) => {
  const trans = props.t;

  const paypapCurrencies_Init = [
    { code: "AUD", name: "Australian Dollar", symbol: "$" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "GBP", name: "British Pound Sterling", symbol: "£" },
    { code: "CAD", name: "Canadian Dollar", symbol: "$" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "CZK", name: "Czech Republic Koruna", symbol: "Kč" },
    { code: "DKK", name: "Danish Krone", symbol: "Kr." },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "$" },
    { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "ILS", name: "Israeli New Sheqel", symbol: "₪" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "TWD", name: "New Taiwan Dollar", symbol: "$" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "$" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
    { code: "PHP", name: "Philippine Peso", symbol: "₱" },
    { code: "PLN", name: "Polish Zloty", symbol: "zł" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" },
    { code: "SGD", name: "Singapore Dollar", symbol: "$" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHf" },
    { code: "THB", name: "Thai Baht", symbol: "฿" },
    { code: "USD", name: "US Dollar", symbol: "$" },
  ];
  const [paypapCurrencies, setPaypapCurrencies] = useState(
    paypapCurrencies_Init
  );

  const [PaypalPaymentData, setPaypalPaymentData] = useState(null);

  const [paypalIsActive, setPaypalIsActive] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  useEffect(() => {
    const getPaypalData = async () => {
      await axios
        .get(`${URL}/get_paypal_payment`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((response) => {
          console.log("getPaypalData-response:", response);
          const data = response.data.data;
          setPaypalPaymentData(data);
          if (response.data != null) {
            if (data.isActive == 1) {
              setPaypalIsActive(true);
            } else {
              setPaypalIsActive(false);
            }
          }
        });
    };
    getPaypalData();
  }, []);

  const handleShowPaypal = (event) => {
    setPaypalIsActive(event.target.checked);
  };

  const onSubmit = (data) => {
    console.log("PaypalPayment - submitted data:", data);
    console.log("PaypalPayment - showPaypal: ", paypalIsActive);

    const formData = new FormData();
    formData.append("paypal_client_id", data.paypal_client_id);
    formData.append("paypal_secret_key", data.paypal_secret_key);
    formData.append("currency", data.currency);
    let is_active = "";
    if (paypalIsActive == false) {
      is_active = 0;
    } else if (paypalIsActive == true) {
      is_active = 1;
    }
    formData.append("isActive", is_active);

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/paypal_payment`,
      data: formData,
    })
      .then((response) => {
        console.log("PaypalPaymen - onSubmit response:", response);
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {});
  };

  return (
    <Fragment>
      {/* <Breadcrumb parent={trans("Payments")} title={trans("Paypal") + " " + trans("Payment")} /> */}

      {/* <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card> */}
      {/* <CardHeader className="d-flex justify-content-between">
                                <h5>{trans("Paypal") + " " + trans("Payment")}</h5>
                            </CardHeader> */}
      {/* <CardBody> */}
      <CardHeader className="p-0 pb-4 mb-4">
        <h5>{trans("Paypal Payment")}</h5>
      </CardHeader>
      <Form
        className="needs-validation"
        noValidate=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-row">
          <Col md="12 mb-3">
            <Label htmlFor="validationCustom02">
              {trans("Paypal Client ID")}
            </Label>
            <Input
              className="form-control"
              name="paypal_client_id"
              type="text"
              key={
                PaypalPaymentData != null
                  ? PaypalPaymentData.paypal_client_id
                  : ""
              }
              defaultValue={
                PaypalPaymentData != null
                  ? PaypalPaymentData.paypal_client_id
                  : ""
              }
              innerRef={register({ required: true, maxLength: 300 })}
            />
            <span>
              {errors.paypal_client_id &&
                errors.paypal_client_id.type == "required" &&
                trans("field is required")}
              {errors.paypal_client_id?.type == "maxLength" &&
                trans("Maximum Length: ") + "300"}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="12 mb-3">
            <Label htmlFor="validationCustom02">
              {trans("Paypal") + " " + trans("Secret Key")}
            </Label>
            <Input
              className="form-control"
              name="paypal_secret_key"
              type="text"
              key={
                PaypalPaymentData != null
                  ? PaypalPaymentData.paypal_secret_key
                  : ""
              }
              defaultValue={
                PaypalPaymentData != null
                  ? PaypalPaymentData.paypal_secret_key
                  : ""
              }
              innerRef={register({ required: true, maxLength: 300 })}
            />
            <span>
              {errors.paypal_secret_key &&
                errors.paypal_secret_key?.type == "required" &&
                trans("field is required")}
              {errors.paypal_secret_key?.type == "maxLength" &&
                trans("Maximum Length: ") + "300"}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="6 mb-3">
            <Label htmlFor="validationCustom02">
              {trans("Select") + " " + trans("Paypal Currency")}
            </Label>
            <Input
              className="form-control"
              name="currency"
              type="select"
              key={PaypalPaymentData != null ? PaypalPaymentData.currency : ""}
              defaultValue={
                PaypalPaymentData != null ? PaypalPaymentData.currency : ""
              }
              innerRef={register({ required: true })}
            >
              <option value="" selected disabled>
                {trans("Select Currency")}
              </option>
              {paypapCurrencies.map((curr) => (
                <option value={curr.code}>
                  {curr.code} - {curr.name} - {curr.symbol}
                </option>
              ))}
            </Input>
            <span className="text-danger">
              {errors.currency &&
                errors.currency.type == "required" &&
                trans("field is required")}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
          <Col md="6 mb-3">
            {/* <Label htmlFor="validationCustom02">{trans("Show Paypal")}</Label> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }}
            >
              <Switch
                name="isActive"
                defaultValue={paypalIsActive}
                checked={paypalIsActive}
                onChange={handleShowPaypal}
              />
              <Label htmlFor="validationCustom02">{trans("Activate")}</Label>
            </div>
            <span className="text-danger">
              {errors.isActive &&
                errors.isActive.type == "required" &&
                trans("field is required")}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </Col>
        </div>
        <Button color="primary">{trans("Save")}</Button>
      </Form>
      {/* </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container> */}
    </Fragment>
  );
};

export default translate(PaypalPayment);
