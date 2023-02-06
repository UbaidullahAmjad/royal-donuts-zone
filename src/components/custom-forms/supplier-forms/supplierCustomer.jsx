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
import { Typeahead } from "react-bootstrap-typeahead";
import { translate } from "react-switch-lang";
import { useForm, Controller } from "react-hook-form";

const SupplierCustomer = (props) => {
  const trans = props.t;
  const [role, setRole] = useState([]);
  const [backBtn, setBackBtn]  = useState(false)
  const [stores, setStores] = useState([])

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const onSubmit = (data) => {
    console.log("this is submitted data", data);
    // data['stores'] = JSON.stringify(data.stores.map((item)=>item.id));
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: "https://ecco.royaldonuts.xyz/api/supplier_customer",
      data: data,
    })
      .then((response) => {
        if (response.data.success === true) {
          toast.success(trans("successfull"), {
            position: toast.POSITION.TOP_RIGHT,
          });
         setBackBtn(true)
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
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
        else{
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        })}
        
      })
  };


  // const TypeHeadChanged = (data_selected,i) => {
  //   console.log('dataaa selected', data_selected)
  //   setValue("stores", data_selected);
  // };



  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://ecco.royaldonuts.xyz/api/supplier_customer/create`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        }
      );
      console.log("respss", response);
      setRole(response.data.role);
      setStores(response.data.stores)
    };
    getData();
   
  }, []);

  console.log("STORESS ---- ",stores);

  const goBack = ()=>{
    navigate(`/supplier/customers/list/RD`);
  }

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Create Customer")} />

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
                      <span> {errors.name?.type == "required" && trans("field is required")}
                        {errors.name?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" && "Please write alphanumeric values"}</span>
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
                        {errors.email && errors.email.type == "required"
                          ? trans("email is required")&& trans("Maximum Length: ") + "30"
                          : errors.email && errors.email.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(Password)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="password"
                        type="password"
                        placeholder={trans("Enter Password")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                          })
                        }
                      />
                      <span>
                      {errors.password?.type == "required" && trans("field is required")}
                        {errors.password?.type == "maxLength" && trans("Maximum Length: ") + "30"}
              
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans(franchiseName)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="franchise_name"
                        type="text"
                        placeholder={trans("Enter franchise name")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>
                      {errors.franchise_name?.type == "required" && trans("field is required")}
                        {errors.franchise_name?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.franchise_name?.type == "pattern" && "Please write alphanumeric values"}
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
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans(City)} *</Label>
                      <Input
                        className="form-control"
                        name="city"
                        type="text"
                        placeholder={trans("Enter city")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 30,
                            pattern: /^[a-zA-Z0-9.\s]+$/
                          })
                        }
                      />
                      <span>      
                        {errors.city?.type == "required" && trans("field is required")}
                        {errors.city?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.city?.type == "pattern" && "Please write alphanumeric values"}
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
                        placeholder={trans("Enter address")}
                        innerRef={
                          register({
                            required: true,
                            maxLength: 150,
                       
                          })
                        }
                      />
                      <span>
                      {errors.name?.type == "required" && trans("field is required")}
                        {errors.name?.type == "maxLength" && trans("Maximum Length: ") + "150"}
                      
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">{trans(Zip)} *</Label>
                      <Input
                        className="form-control"
                        name="zip_code"
                        type="text"
                        placeholder={trans("Enter zip")}
                        innerRef={register({
                          required: true,
                          pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                          maxLength: 12
                        })}
                      />
                      <span>
                        {errors.zip_code && errors.zip_code.type == "required"
                          ? trans("field is required") && trans("Maximum Length: ") + "12"
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

export default translate(SupplierCustomer);
