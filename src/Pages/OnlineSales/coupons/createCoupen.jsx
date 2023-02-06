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
import { useNavigate } from "react-router-dom";
import { URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, } from "react-redux";
import {
  CouponCreateAction
} from "../../../redux/Pages/OnlineSales/Coupons/actions";

const CreateCoupen = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const onSubmit = (data) => {

    if (data.avail_users <= 0) {
      setError("avail_users", {
        message: "available users must be greater than 0",
      });
    } else {
      dispatch(CouponCreateAction(data, trans, setError));
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/coupon/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
    };
    getData();
  }, []);

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

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Create Coupon")}
        parent={trans("Online Sales")}
        title={trans("Coupons")}
        subtitle={trans("Create")}
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
                        <span className="text-capitalize">{trans(frenchCode)}</span>{" "}
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
                        defaultValue="dd/mm/yyyy"
                        innerRef={register({ required: true })}
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
                        value={amount}
                        onChange={(e) => checkAmount(e)}
                        placeholder={trans("french amount")}
                        innerRef={register({
                          required: true,
                          maxLength: 16,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
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
                        placeholder={trans("french symbol")}
                        innerRef={register({ required: true })}
                        onChange={(e) => checkCopen(e)}
                      >
                        <option value="" selected disabled>
                          {trans("Select")}
                        </option>
                        <option value={"%"}>%</option>
                        <option value={"$"}>$</option>
                      </Input>
                      <span className="text-danger">
                        {errors.symbol && trans("field is required")}
                      </span>
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
                        placeholder={trans("available users")}
                        innerRef={register({
                          required: true,
                          maxLength: 16,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                      />
                      <span>
                        {errors.avail_users?.type == "required" &&
                          trans("field is required")}
                        {errors.avail_users?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
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

export default CreateCoupen;
