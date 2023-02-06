import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm, Controller } from "react-hook-form";
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
import { useNavigate, useParams } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { URL } from "../../../env";
import { translate } from "react-switch-lang";

const EditSupplierCustomer = (props) => {
  const trans = props.t;
  const params = useParams();
  const navigate = useNavigate();
  const id = params.idd;
  const [cstomer, setCustomer] = useState(null);
  const [backBtn, setBackBtn] = useState(false)
  const [stores, setStores] = useState([])

  const {
    register,
    handleSubmit,
    control, 
    setValue,
    setError,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  // const TypeHeadChanged = (data_selected,i) => {
  //   console.log('dataaa selected', data_selected)
  //   setValue("stores", data_selected);
  // };

  const onSubmit = (data) => {
    const formData = new FormData();
    // data['stores'] = JSON.stringify(data.stores.map((item)=>item.id));
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("password", data.password);
    // formData.append('stores', data.stores)
    formData.append("franchise_name", data.franchise_name);
    formData.append("mobilenumber", data.mobilenumber);
    formData.append("city", data.city);
    formData.append("zip_code", data.zip_code);
    formData.append("_method", "PATCH");
    console.log("this is submitted data", data);
    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/supplier_customer/${id}`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
       setBackBtn(true)
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

  const goBack = ()=>{
    navigate(`/supplier/customers/list/RD`);
  }

  const [selectedStore, setSelectedStore] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/supplier_customer/${id}/edit`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("respss", response);
      setCustomer(response.data.customer);
      setStores(response.data.stores)
      setSelectedStore(response.data.selected_stores)
     
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Supplier")} title={trans("Edit Customer")} />

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
                        key={cstomer != null && cstomer.name}
                        defaultValue={cstomer != null && cstomer.name}
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
                      <Label htmlFor="validationCustom02">{trans(Email)} *</Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        key={cstomer != null && cstomer.email}
                        defaultValue={cstomer != null && cstomer.email}
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
                        {trans(Password)} *
                      </Label>
                      <Input
                        className="form-control"
                        name="password"
                        type="password"
                        placeholder={trans("Enter Password")}
                        key={cstomer != null && cstomer.password}
                        defaultValue={cstomer != null && cstomer.password}
                        innerRef={
                          register({
                            required: false,
                            maxLength: 30,
               
                          })
                        }
                      />
                      <span>
                      {errors.password?.type == "required" && trans("field is required")}
                        {errors.password?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.password?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>

                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {franchiseName} *
                      </Label>
                      <Input
                        className="form-control"
                        name="franchise_name"
                        type="text"
                        key={cstomer != null && cstomer.franchise_name}
                        defaultValue={cstomer != null && cstomer.franchise_name}
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
                        key={cstomer != null && cstomer.mobilenumber}
                        defaultValue={cstomer != null && cstomer.mobilenumber}
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
                        key={cstomer != null && cstomer.city}
                        defaultValue={cstomer != null && cstomer.city}
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
                        key={cstomer != null && cstomer.address}
                        defaultValue={cstomer != null && cstomer.address}
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
                        {errors.address?.type == "pattern" && "Please write alphanumeric values"}
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
                        key={cstomer != null && cstomer.zip_code}
                        defaultValue={cstomer != null && cstomer.zip_code}
                        innerRef={register({
                          required: true,
                          pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                          maxLength: 12
                        })}
                      />
                      <span>
                        {errors.zip_code && errors.zip_code.type == "required"
                          ? trans("field is required")
                          : errors.zip_code &&
                            trans(
                              "zip code must be 5 digits and can be up to 9 digits"
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

export default translate(EditSupplierCustomer);
