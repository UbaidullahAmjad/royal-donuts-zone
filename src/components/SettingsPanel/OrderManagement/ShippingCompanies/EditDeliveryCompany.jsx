/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  minOrderAmount,
  deliveryCompany,
  deliveryFee,
  Name,
} from "../../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import { useTranslation, } from "react-i18next";
import { useDispatch, } from "react-redux";
import {
  ShippingCompanyEditAction,
} from "../../../../redux/SettingsPanel/OrderManagement/ShippingCompanies/actions";

const EditDeliveryCompany = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const param = useParams();
  const id = param.idd;
  const [DeliveryData, setDeliveryData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/deliverycompany/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setDeliveryData(response.data.company);
    };
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const navigate = useNavigate();
  const [backBtn, setBackBtn] = useState(false);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("delivery_fee", data.delivery_fee);
    formData.append("minimum_order_amount", data.minimum_order_amount);
    formData.append("_method", "PATCH");

    dispatch(ShippingCompanyEditAction(formData, id, trans, setError));
  };

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement`);
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Delivery Company")}
        parent={trans("Supplier") + " & " + trans("Rules")}
        title={trans("Delivery Company")}
        subtitle={trans("Edit")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans("Delivery Companies")}</h5>
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
                        key={DeliveryData != null && DeliveryData.name}
                        defaultValue={DeliveryData != null && DeliveryData.name}
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
                        key={
                          DeliveryData != null &&
                          DeliveryData.minimum_order_amount
                        }
                        defaultValue={
                          DeliveryData != null &&
                          DeliveryData.minimum_order_amount
                        }
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                      />

                      <span>
                        {errors.minimum_order_amount?.type == "required" &&
                          trans("field is required")}
                        {errors.minimum_order_amount?.type == "maxLength" &&
                          trans("Maximum Length: ") + "12"}
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
                        key={DeliveryData != null && DeliveryData.delivery_fee}
                        defaultValue={
                          DeliveryData != null && DeliveryData.delivery_fee
                        }
                        innerRef={register({
                          required: true,
                          maxLength: 12,
                          pattern: /^[+]?\d+([.]\d+)?$/,
                        })}
                      />
                      <span>
                        {errors.delivery_fee?.type == "required" &&
                          trans("field is required")}
                        {errors.delivery_fee?.type == "maxLength" &&
                          trans("Maximum Length: ") + "12"}
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

export default EditDeliveryCompany;
