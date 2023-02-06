import React, { Fragment } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
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
  faxNumber,
  minQuantity,
  MobileNo,
  Name,
  Role,
  supplierName,
} from "../../../constant/index";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { translate } from "react-switch-lang";

const Supplier = (props) => {
  const trans = props.t;
  const [supplierCompanies, setSupplierCompanies] = useState([]);
  const [backBtn, setBackBtn] = useState(false);
  const [supplierRoles, setSupplierRoles] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: "https://ecco.royaldonuts.xyz/api/supplier_supplier",
      data: data,
    })
      .then((response) => {
        console.log("ERROR SUPPLIER RESPONSe ---- ", response);
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBackBtn(true);
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.log("ERROR SUPPLIER ---- ", error.response);
        if (Object.keys(error.response.data.errors)[0] == "abbrivation") {
          const value = Object.keys(error.response.data.errors)[0];
          setError(
            "abbrivation",
            {
              type: "string",
              message: trans("The abbrivation has already been taken"),
            },
            {
              shouldFocus: true,
            }
          );
          console.log(
            "GET VLAUE  ABB --- ",
            error.response.data.errors[value][0]
          );
          toast.error(trans("The abbrivation has already been taken"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        console.log("ERROR SUPPLIER ---- ", error.response);
        if (Object.keys(error.response.data.errors)[0] == "email") {
          const value = Object.keys(error.response.data.errors)[0];
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
      });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/supplier_supplier/create`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );
      console.log("resp", response);
      setSupplierCompanies(response.data.companies);
      setSupplierRoles(response.data.role);
    };
    getData();
  }, []);

  const goBack = () => {
    navigate(`/homeSettings/Order-Management/OrderManagement/RD`);
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Create Supplier")} />

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
                        placeholder={trans("Enter name")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>  
                      {errors.name?.type == "required" && trans("field is required") ||
                        errors.name?.type == "maxLength" && trans("Maximum Length: ") + "30" ||
                        errors.name?.type == "pattern" && trans("Please write alphanumeric values")}
                        </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(nameAbrreviation)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="abbrivation"
                        type="text"
                        placeholder={trans("Enter name abrreviation")}
                        innerRef={register({ required: true, maxLength: 2 })}
                        maxLength={2}
                      />
                      <span>
                        {errors.abbrivation &&
                          errors.abbrivation.type == "required"
                          ? trans("field is required")
                          : errors.abbrivation &&
                            errors.abbrivation.type == "maxLength"
                            ? trans("Length should be less than 2")
                            : errors.abbrivation && errors.abbrivation.message}
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
                        placeholder={trans("Enter email")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                          })
                        }
                      />
                      <span>
                        {errors.email && errors.email?.type == "required"
                          ? trans("email is required") && trans(" Maximum Length: ") + "30"
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
                        type="number"
                        placeholder={trans("Enter Fax Number")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 10
                          })
                        }
                      />
                      <span>
                        {errors.fax_number?.type == "required" && trans("field is required")}
                        {errors.fax_number?.type == "maxLength" && trans("Maximum Length: ") + "10"}
                        {errors.fax_number?.type == "pattern" && trans("Number can not be a negative value")}
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
                        placeholder={trans("Enter Address")}
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
                        placeholder={trans("Enter Mobile Number")}
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

                    {/* <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Role)}</Label>
                      <Input
                        className="form-control"
                        name="user_type"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected value="" disabled>
                          {trans("Select")}
                        </option>
                        <option value={supplierRoles.id}>
                          {supplierRoles.name}
                        </option>
                      </Input>
                      <span>
                        {errors.user_type && trans("role is required")}
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col> */}

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
                        <option selected="true" value="" disabled>
                          {trans("Select")}
                        </option>
                        <option value={1}>{trans("Active")}</option>
                        <option value={0}>{trans("Inactive")}</option>
                      </Input>
                      <span className="text-danger">
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
                        <option selected value="" disabled>
                          {trans("Select")}
                        </option>
                        {supplierCompanies !== [] &&
                          supplierCompanies.map((company) => {
                            return (
                              <option value={company.id}>{company.name}</option>
                            );
                          })}
                      </Input>
                      <span className="text-danger">
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

export default translate(Supplier);
