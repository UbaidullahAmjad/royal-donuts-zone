/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
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
  Address,
  customer,
  City,
  Email,
  franchiseName,
  MobileNo,
  Name,
  Password,
  Role,
  Zip,
} from "../../../constant/index";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { URL } from "../../../env";
import { useDispatch, } from "react-redux";
import {
  SupplierCustomerCreateAction
} from "../../../redux/Pages/Franchise_Store/SupplierCustomers/actions";

const SupplierCustomerCreate = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const [role, setRole] = useState([]);
  const [backBtn, setBackBtn] = useState(false);
  const [stores, setStores] = useState([]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const onSubmit = (data) => {
    const formData = new FormData();
    // data['stores'] = JSON.stringify(data.stores.map((item)=>item.id));
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("password", data.password);
    // formData.append('stores', data.stores)
    formData.append("franchise_name", data.franchise_name);
    formData.append("mobilenumber", data.mobilenumber);
    formData.append("city", data.city);
    formData.append("zip_code", data.zip_code);

    dispatch(SupplierCustomerCreateAction(formData, trans, setError))
  };

  // const TypeHeadChanged = (data_selected,i) => {
  //   setValue("stores", data_selected);
  // };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/supplier_customer/create`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      setRole(response.data.role);
      setStores(response.data.stores);
    };
    getData();
  }, []);

  const goBack = () => {
    navigate(`/supplier/customers/list`);
  };

  return (
    <Fragment>
      <Breadcrumb
        breadcrumbtitle={trans("Create Customer")}
        parent={trans("Franchise/Store")}
        title={trans("Franchisees") + " / " + trans("Customers")}
        subtitle={trans("Create")}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans("Customer")}</h5>
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
                        {trans("First Name")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="first_name"
                        type="text"
                        placeholder={trans("First Name")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {" "}
                        {errors.first_name?.type == "required" &&
                          trans("field is required")}
                        {errors.first_name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.first_name?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Last Name")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="last_name"
                        type="text"
                        placeholder={trans("Last Name")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {" "}
                        {errors.last_name?.type == "required" &&
                          trans("field is required")}
                        {errors.last_name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.last_name?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Email)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={trans("Enter email")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      <span>
                        {errors.email && errors.email.type == "required"
                          ? trans("email is required") &&
                          trans("Maximum Length: ") + "30"
                          : errors.email && errors.email.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Password)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="password"
                        type="password"
                        placeholder={trans("Enter Password")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      <span>
                        {errors.password?.type == "required" &&
                          trans("field is required")}
                        {errors.password?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(franchiseName)}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="franchise_name"
                        type="text"
                        placeholder={trans("Enter franchise name")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {errors.franchise_name?.type == "required" &&
                          trans("field is required")}
                        {errors.franchise_name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.franchise_name?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(MobileNo)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="mobilenumber"
                        type="tel"
                        placeholder={trans("Enter Mobile Number")}
                        innerRef={register({
                          required: true,
                          maxLength: 18,
                          pattern: /^(?=.*[0-9])[- +()0-9]+$/,
                        })}
                      />
                      <span className="text-danger">
                        {errors.mobilenumber?.type == "required" &&
                          trans("field is required")}
                        {errors.mobilenumber?.type == "maxLength" &&
                          trans("Maximum Length: ") + "18. "}
                        {errors.mobilenumber?.type == "pattern" &&
                          trans(
                            "Please write numerical values or + or - or ( or )"
                          )}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(City)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="city"
                        type="text"
                        placeholder={trans("Enter city")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span>
                        {errors.city?.type == "required" &&
                          trans("field is required")}
                        {errors.city?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.city?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Address)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        placeholder={trans("Enter address")}
                        innerRef={register({
                          required: true,
                          maxLength: 150,
                        })}
                      />
                      <span>
                        {errors.name?.type == "required" &&
                          trans("field is required")}
                        {errors.name?.type == "maxLength" &&
                          trans("Maximum Length: ") + "150"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Zip)} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="zip_code"
                        type="text"
                        placeholder={trans("Enter zip")}
                        innerRef={register({
                          required: true,
                          pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                          maxLength: 12,
                        })}
                      />
                      <span>
                        {errors.zip_code && errors.zip_code.type == "required"
                          ? trans("field is required") &&
                          trans("Maximum Length: ") + "12"
                          : errors.zip_code &&
                          trans(
                            "zip code must be 5 digits and can be up to 9 digits and must be a positive number"
                          )}
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

export default SupplierCustomerCreate;
