import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
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
import { CustomStyles, Category, Image } from "../../../constant/index";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { toast } from "react-toastify";

import { URL } from "../../../env";
import { useNavigate, useParams } from "react-router-dom";
import { translate } from "react-switch-lang";

const EditEcomCustomers = (props) => {
  const trans = props.t;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({shouldFocusError:true});;

  const params = useParams();

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);


  const onSubmit = (data) => {
    console.log("this is submitted data", data);

    const formData = new FormData();

    formData.append("id", params.id);
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("zip_code", data.zip_code);
    formData.append("address", data.address);
    formData.append("mobilenumber", data.mobilenumber);
    // formData.append("_method", "PATCH");

    axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      url: `${URL}/eccom-user-update`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const goBack = ()=>{
    navigate(`/ecommerce/customers/list/RD`);
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/eccom-user-edit/${params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      console.log("respedit", response);
      setUserData(response.data.user);
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent={trans("Ecommerce")} title={trans("Edit Customer")} />

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
                      <Label htmlFor="validationCustom02">
                        {trans("Name")} *
                      </Label>
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
                        key={userData != null && userData.name}
                        defaultValue={
                          userData != null  && userData.name
                        }
                      />
                      <span>
                        {errors.name?.type && trans("field is required")}
                        {errors.name?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.name?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Email")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        placeholder={trans("Enter email")}
                        innerRef={register({ required: true, maxLength: 60 })}
                        key={userData != null && userData.email}
                        defaultValue={
                          userData != null  && userData.email
                        }
                      />
                      <span>
                        {errors.email?.type == "required" && trans("field is required")}
                        {errors.email?.type == "maxLength" && trans("Maximum Length: ") + "60"}
                        {/* {errors.email?.type === "pattern" && trans("Email Format is: abcd@email.com")} */}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Mobile Number")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="mobilenumber"
                        type="tel"
                        placeholder={trans("Enter phone number")}
                        innerRef={register({ 
                          required: true,
                          maxLength: 18, 
                          pattern: /^[0-9 ()+-]+$/, 
                        })}
                        key={userData != null && userData.mobilenumber}
                        defaultValue={
                          userData != null  && userData.mobilenumber
                        }
                      />
                      <span>
                        {errors.mobilenumber?.type === "required" && trans("field is required")}
                        {errors.mobilenumber?.type === "maxLength" && trans("Maximum Length: ") + "18"}
                        {errors.mobilenumber?.type === "pattern" && trans("Please write numerical values or + or - or ( or )")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Address")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        placeholder={trans("Enter address")}
                        innerRef={register({ required: true, maxLength: 80  })}
                        key={userData != null && userData.address}
                        defaultValue={
                          userData != null  && userData.address
                        }
                      />
                      <span>
                        {errors.address?.type && trans("field is required")}
                        {errors.address?.type === "maxLength" && trans("Maximum Length: ") + "80"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("City")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="city"
                        type="text"
                        placeholder={trans("Enter city")}
                        innerRef={register({ required: true, maxLength: 30, })}
                        key={userData != null && userData.city}
                        defaultValue={
                          userData != null  && userData.city
                        }
                      />
                      <span>
                        {errors.city?.type && trans("field is required")}
                        {errors.city?.type == "maxLength" && trans("Maximum Length: ") + "30"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Zip")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="zip_code"
                        type="text"
                        placeholder={trans("Enter zip")}
                        innerRef={register({ 
                          required: true, maxLength: 12, pattern: /^\d{5}(?:[- ]?\d{4})?$/,  
                        })}
                        key={userData != null && userData.zip_code}
                        defaultValue={
                          userData != null  && userData.zip_code
                        }
                      />
                      <span>
                        {errors.zip_code?.type  === 'required' && trans("field is required")}
                        {errors.zip_code?.type === "maxLength" && trans("Maximum Length: ") + "12"}
                        {errors.zip_code?.type === "pattern" && trans("zip code must be 5 digits and can be up to 9 digits and must be positive value")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Country")} *
                      </Label>
                      <Input
                        className="form-control"
                        name="country"
                        type="text"
                        placeholder={trans("Enter country")}
                        innerRef={register({ required: true, maxLength: 30, pattern: /^[a-zA-Z0-9.\s]+$/  })}
                        key={userData != null && userData.country}
                        defaultValue={
                          userData != null  && userData.country
                        }
                      />
                      <span>
                        {errors.country?.type && trans("field is required")}
                        {errors.country?.type === "maxLength" && trans("Maximum Length: ") + "30"}
                        {errors.country?.type == "pattern" && "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  <Button color="primary">{trans("Submit form")}</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(EditEcomCustomers);
