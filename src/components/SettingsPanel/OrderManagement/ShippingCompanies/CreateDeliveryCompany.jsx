/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../../layout/breadcrumb/index";
import axios from "axios";
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
  minOrderAmount,
  deliveryCompany,
  deliveryFee,
  Name,
} from "../../../../constant/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, } from "react-redux";
import {
  ShippingCompanyCreateAction,
} from "../../../../redux/SettingsPanel/OrderManagement/ShippingCompanies/actions";

const CreateDeliveryCompany = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const onSubmit = (data) => {

    dispatch(ShippingCompanyCreateAction(data, trans, setError));
  };

  const createNewDeliveryCompany = (data) => {
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/deliverycompany`,
      data: data,
    })
      .then((response) => {
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBackBtn(true);
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          errors.showMessages();
        }
      })
      .catch((error) => {
        if (Object.keys(error.response.data.errors)[0] == "name") {
          setError(
            "name",
            {
              type: "string",
              message: trans(error.response.data.errors.name),
            },
            {
              shouldFocus: true,
            }
          );
          toast.error(trans(error.response.data.errors.name), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  }

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement`);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/deliverycompany/create`, {
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
        breadcrumbtitle={trans("Delivery Company")}
        parent={trans("Supplier") + " & " + trans("Rules")}
        title={trans("Delivery Company")}
        subtitle={trans("Create")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans("Create Delivery Company")}</h5>
                <Button onClick={goBack}>{trans("Go Back")}</Button>
              </CardHeader>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
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
                        {trans(minOrderAmount) + " €"}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="minimum_order_amount"
                        type="number"
                        step="any"
                        placeholder={trans("Enter amount")}
                        innerRef={register({
                          required: true,
                          maxLength: 16,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                      />
                      <span>
                        {errors.minimum_order_amount?.type == "required" &&
                          trans("field is required")}
                        {errors.minimum_order_amount?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.minimum_order_amount?.type == "pattern" &&
                          trans("Number can not be a negative value")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(deliveryFee) + " €"}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="delivery_fee"
                        type="number"
                        step="any"
                        placeholder={trans("Enter amount")}
                        innerRef={register({
                          required: true,
                          maxLength: 16,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                      />
                      <span>
                        {errors.delivery_fee?.type == "required" &&
                          trans("field is required")}
                        {errors.delivery_fee?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.delivery_fee?.type == "pattern" &&
                          trans("Number can not be a negative value")}
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

export default CreateDeliveryCompany;
