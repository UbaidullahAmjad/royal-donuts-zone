/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
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
import {
  frenchCoupen,
  frenchCode,
  frenchAmount,
  frenchSymbol,
  Date,
  availUsers,
} from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, } from "react-redux";
import {
  CouponEditAction,
} from "../../../redux/Pages/OnlineSales/Coupons/actions";

const FrenchCoupen = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const params = useParams();
  const navigate = useNavigate();
  const [CouponData, setCouponData] = useState(null);
  const [backBtn, setBackBtn] = useState(false);

  const goBack = () => {
    navigate(`/coupens/list`);
  };

  const [amount, setAmount] = useState("");
  const [symbol, setSymbol] = useState("");
  const checkAmount = (e) => {
    if (e.target.value > 100 && symbol == "%") {
      setAmount(100);
      alert("cannot be greater than 100");
    } else {
      setAmount(e.target.value);
    }
  };
  const checkCopen = (e) => {
    if (e.target.value == "%" && amount > 100) {
      setAmount(100);
    }
    setSymbol(e.target.value);
  };

  const onSubmit = (data) => {
    if (data?.avail_users <= 0) {
      setError("avail_users", {
        message: "available users must be greater than 0",
      });
    } else {
      onSubmitApiCall(data);
    }
  };

  const onSubmitApiCall = (data) => {
    const form_data = new FormData();
    form_data.append("code", data.code);
    form_data.append("expiry_date", data.expiry_date);
    form_data.append("amount", data.amount);
    form_data.append("symbol", data.symbol);
    form_data.append("avail_users", data.avail_users);
    form_data.append("_method", "PATCH");

    dispatch(CouponEditAction(form_data, params.idd, trans, setError));
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/coupon/${params.idd}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setCouponData(response.data.coupon);
      setAmount(response.data.coupon.amount);
      setSymbol(response.data.coupon.symbol);
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Edit Coupon")}
        parent={trans("Online Sales")}
        title={trans("Coupons")}
        subtitle={trans("Edit")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-end">
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
                      <Label htmlFor="validationDefault01">
                        <span className="text-capitalize">{trans("frenchCode")}</span>{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="code"
                        type="text"
                        placeholder={trans("Enter coupon code")}
                        innerRef={register({
                          required: true,
                          maxLength: 18,
                          pattern: /^[a-zA-Z0-9%&-]+$/,
                        })}
                        key={CouponData != null && CouponData.code}
                        defaultValue={CouponData != null && CouponData.code}
                      />
                      <span>
                        {errors.code &&
                          errors.code.type == "required" &&
                          trans("field is required")}
                        {errors.code?.type == "pattern" &&
                          trans(
                            "coupon_code_field_error"
                          )}
                        {errors.code?.type == "maxLength" &&
                          trans("Maximum Length: ") + "18"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationDefault02">
                        {trans("Expiry Date")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control digits"
                        name="expiry_date"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        innerRef={register({ required: true })}
                        key={CouponData != null && CouponData.expiry_date}
                        defaultValue={
                          CouponData != null && CouponData.expiry_date
                        }
                      />
                      <span>
                        {errors.expiry_date && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationDefault02">
                        <span className="text-capitalize">{`${trans("french amount")} €`}</span>
                        {" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control digits"
                        name="amount"
                        type="number"
                        step="any"
                        // value = {amount}
                        onChange={(e) => checkAmount(e)}
                        placeholder={trans("Enter coupon amount")}
                        innerRef={register({
                          required: true,
                          maxLength: 16,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                        // key={amount != null && amount}
                        value={amount != null && amount}
                      />
                      <span>
                        {errors.amount?.type == "required" &&
                          trans("field is required")}
                        {errors.amount?.type == "maxLength" &&
                          trans("Maximum Length: ") + "16"}
                        {errors.amount?.type == "pattern" &&
                          trans("Number can not be a negative value")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationDefault02">
                        <span className="text-capitalize">{trans("french symbol")}</span>
                        {" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="symbol"
                        type="select"
                        placeholder={trans("Choose Symbol")}
                        innerRef={register({ required: true })}
                        onChange={(e) => checkCopen(e)}
                      >
                        <option value="" selected={true} disabled={true}>
                          {trans("Select Amount Symbol")}
                        </option>
                        <option
                          value={"%"}
                          selected={symbol != null && symbol == "%"}
                        >
                          %
                        </option>
                        <option
                          value={"$"}
                          selected={
                            CouponData != null && CouponData.symbol == "$"
                          }
                        >
                          $
                        </option>
                      </Input>
                      <span>{errors.symbol && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationDefault02">
                        <span className="text-capitalize">{trans("Available users")}</span>
                        {" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control digits"
                        name="avail_users"
                        type="number"
                        step="any"
                        placeholder={trans("Enter avail users")}
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                        key={CouponData != null && CouponData.avail_users}
                        defaultValue={
                          CouponData != null && CouponData.avail_users
                        }
                      />
                      <span>
                        {errors.avail_users?.type == "required" &&
                          trans("field is required")}
                        {errors.avail_users?.type == "maxLength" &&
                          trans("Maximum Length: ") + "12"}
                        {errors.avail_users?.type == "pattern" &&
                          trans("Number can not be a negative value")}
                        {errors.avail_users &&
                          trans(errors.avail_users?.message)}
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

export default FrenchCoupen;
