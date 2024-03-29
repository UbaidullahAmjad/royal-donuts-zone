import React, { Fragment } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  Address,
  City,
  Email,
  nameAbrreviation,
  deliveryCompany,
  minQuantity,
  faxNumber,
  MobileNo,
  Name,
  Role,
  supplierName,
} from "../../../constant/index";
import { useEffect } from "react";
import { useState } from "react";

import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const EditSupplierList = (props) => {
  const trans = props.t;
  const param = useParams();
  const navigate = useNavigate();
  const id = param.idd;

  const [supplierCompanies, setSupplierCompanies] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [backBtn, setBackBtn] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("abbrivation", data.abbrivation);
    formData.append("email", data.email);
    formData.append("fax_number", data.fax_number);
    formData.append("address", data.address);
    formData.append("mobilenumber", data.mobilenumber);
    formData.append("company", data.company);
    formData.append("_method", "PATCH");

    console.log("this is submitted data", data);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/supplier_supplier/${id}`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
        setBackBtn(true);
      } else {
        if (response.data.type == "email") {
          setError(
            "email",
            {
              type: "string",
              message: trans("Email_Taken"),
            },
            {
              shouldFocus: true,
            }
          );
          toast.error(trans("Email_Taken"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    });
  };

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement/RD`);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/supplier_supplier/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("resp", response);
      setSupplierCompanies(response.data.companies);
      setSelectedCompany(response.data.company);
      setSupplier(response.data.supplier);
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Edit Supplier")} />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans("Supplier")}</h5>
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
                      <Label htmlFor="validationCustom02">{trans(Name)} *</Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        key={supplier != null && supplier.name}
                        defaultValue={supplier != null && supplier.name}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>
                      {errors.name?.type == "required" && trans("field is required")}
                        {errors.name?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" && "Please write alphanumeric values"}
                        </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {nameAbrreviation} *
                      </Label>
                      <Input
                        className="form-control"
                        name="abbrivation"
                        type="text"
                        key={supplier != null && supplier.abbrivation}
                        defaultValue={supplier != null && supplier.abbrivation}
                        innerRef={register({ required: true, maxLength: 2 })}
                        maxLength={2}
                      />
                      <span>
                        {errors.abbrivation &&
                        errors.abbrivation.type == "required"
                          ? trans("field is required")
                          : errors.abbrivation &&
                            errors.abbrivation.type == "maxLength" &&
                            trans("Length should be less than 2")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Email)} *</Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        key={supplier != null && supplier.email}
                        defaultValue={supplier != null && supplier.email}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                          })
                        }
                      />
                      <span>
                        {errors.email && errors.email.type == "required"
                          ? trans("email is required") && trans("Maximum Length: ") + "30"
                          : errors.email && errors.email.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(faxNumber)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="fax_number"
                        type="text"
                        key={supplier != null && supplier.fax_number}
                        defaultValue={supplier != null && supplier.fax_number}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 10,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>
                        {errors.fax_number?.type == "required" && trans("field is required")}
                        {errors.fax_number?.type == "maxLength" && trans("Maximum Length: ") + "10"}
                        {errors.fax_number?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Address)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        key={supplier != null && supplier.address}
                        defaultValue={supplier != null && supplier.address}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 150,
                      
                          })
                        }
                      />
                      <span>
                      {errors.address?.type == "required" && trans("field is required")}
                        {errors.address?.type == "maxLength" && trans("Maximum Length: ") + "150"}
                
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(MobileNo)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="mobilenumber"
                        type="tel"
                        key={supplier != null && supplier.mobilenumber}
                        defaultValue={supplier != null && supplier.mobilenumber}
                        innerRef={register({ 
                          required: true, 
                          maxLength: 18,
                          pattern: /^(?=.*[0-9])[- +()0-9]+$/ 
                        })}
                      />
                       <span className="text-danger">
                        {errors.mobilenumber?.type == "required" && trans("field is required")}
                        {errors.mobilenumber?.type == "maxLength" && trans("Maximum Length: ") + "18. "}
                        {errors.mobilenumber?.type == "pattern" && trans("Please write numerical values or + or - or ( or )")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(minQuantity)}
                      </Label>
                      <Input
                        className="form-control"
                        name="min_req_qty"
                        type="select"
                        innerRef={register({ required: false })}
                      >
                        {/* <option selected = {product !==null && product.id === product.min_req_qty}>{product.min_req_qty}</option> */}
                        <option value="" selected={true} disabled={true}>
                          {trans("Select Min Quantity Status")}
                        </option>
                        <option
                          value="1"
                          selected={
                            supplier != null && supplier.min_req_qty == "1"
                          }
                        >
                          {trans("Active")}
                        </option>
                        <option
                          value="0"
                          selected={
                            supplier != null && supplier.min_req_qty == "0"
                          }
                        >
                          {trans("Inactive")}
                        </option>
                      </Input>
                      <span>
                        {errors.min_req_qty && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {deliveryCompany} *
                      </Label>
                      <Input
                        className="form-control"
                        name="company"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option value="" disabled>
                          {trans("Select")}
                        </option>
                        {supplierCompanies !== [] &&
                          supplierCompanies.map((company) => {
                            return (
                              <option
                                value={company.id}
                                selected={
                                  selectedCompany !== null &&
                                  selectedCompany.delivery_company_id ===
                                    company.id
                                }
                              >
                                {company.name}
                              </option>
                            );
                          })}
                      </Input>
                      <span>
                        {errors.company && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  <Button color="primary">{trans("Save")}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(EditSupplierList);
