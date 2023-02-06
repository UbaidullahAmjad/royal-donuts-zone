import React, { Fragment, useEffect, useState } from "react";
import { useTranslation, } from "react-i18next";
import Breadcrumb from "../../layout/breadcrumb";
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
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { countryList } from "../../assets/countries/countries";
import { URL } from "../../env";

const Profile = (props) => {
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState();
  const { t } = useTranslation();
  const trans = t;
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  let user_id = atob(localStorage.getItem("user_id"));

  const [mobile, setmobile] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${URL}/leads/dashboard`,
        { params: { user_id: user_id } }
        // headers: {
        //     Authorization: "Bearer " + localStorage.getItem("token123"),
        //   }
      );
      setUserData(res.data.data);
      setmobile(res.data.data.mobilenumber);
    };
    getData();
  }, []);

  const formSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("last_name", data.last_name);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("email", data.email);
    formData.append("mobilenumber", data.mobilenumber);
    formData.append("address", data.address);
    // formData.append("name", data.name);
    formData.append("zip_code", data.zip_code);

    axios({
      method: "post",
      url: `${URL}/update-profilee/${user_id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token123"),
      },
      data: formData,
    })
      .then((response) => {
        if (response.data.success === true) {
          toast.success(
            `${trans("form detail")} ${trans("updated")} ${trans(
              "successfully"
            )}`,
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        } else {
          toast.error(trans("failed"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        const err_response = err.response;
        console.log("EditLead-error-response", err_response);
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  // const onSubmit = (data) => {
  //     const formData = new FormData();
  //     formData.append("name", data.name);
  //     formData.append("last_name", data.last_name);
  //     // formData.append("email", data.email);
  //     formData.append("address", data.address);
  //     formData.append("franchise_name", data.franchise_name);
  //     formData.append("zip_code", data.zip_code);
  //     // formData.append("progress_status", data.progress_status);
  //     formData.append("_method", "PATCH");

  //     axios({
  //         method: "post",
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + localStorage.getItem("token123"),
  //         },
  //         url: `${URL}/leadss/${user_id}`,
  //         data: formData,
  //     }).then((response) => {
  //         if (response.data.success === true) {
  //             toast.success(`${trans("FORM DETAIL")} ${trans("updated")} ${trans("successfully")}`, {
  //                 position: toast.POSITION.TOP_RIGHT,
  //             });
  //             // navgiate(`/crm/leads/list`);
  //         } else {
  //             toast.error(trans("failed"), {
  //                 position: toast.POSITION.TOP_RIGHT,
  //             });
  //         }
  //     }).catch((err) => {
  //         const err_response = err.response;
  //         // const err_msg = "" + err.response.data.errors.email;
  //         toast.error(trans("failed"), {
  //             position: toast.POSITION.TOP_RIGHT,
  //         });
  //     });
  // }

  return (
    <>
      <Fragment>
        <Breadcrumb parent={trans("Lead")} title={trans("Profile")} />
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <Row className="d-flex justify-content-between px-2">
                    <Col sm="6">
                      {userData !== null && (
                        <span>
                          <b>{trans("Username")}:</b>
                          <span className="ml-2">{userData.name}</span>
                        </span>
                      )}
                    </Col>
                    <Col sm="4">
                      {userData !== null && (
                        <>
                          {/* <Input 
                                            className="form-control"
                                            // name="ftype"
                                            type="select"
                                            // onChange={onHandleChange}
                                        >
                                            {userData.progress_status === 0 && 
                                            <option selected="true" value={ userData.progress_status} disabled>{trans("Lead")}</option>
                                        }
                                         {userData.progress_status === 1 && 
                                            <option selected="true" value={ userData.progress_status} disabled>{trans("Qualified Lead")}</option>
                                        }
                                          {userData.progress_status === 2 && 
                                            <option selected="true" value={ userData.progress_status} disabled>{trans("Nigotiation in progress")}</option>
                                        }
                                         {userData.progress_status === 3 && 
                                            <option selected="true" value={ userData.progress_status} disabled>{trans("Signup in progress")}</option>
                                        }
                                          {userData.progress_status === 4 && 
                                            <option selected="true" value={ userData.progress_status} disabled>{trans("New Franchise")}</option>
                                        }
                                          {userData.progress_status === 5 && 
                                            <option selected="true" value={ userData.progress_status} disabled>{trans("Active Franchise")}</option>
                                        }
                                           
                                        </Input> */}
                          <b>{trans("Stage")}: </b>
                          <span className="ml-2">
                            {userData.progress_status === 0 && trans("Lead")}
                            {userData.progress_status === 1 &&
                              trans("Qualified Lead")}
                            {userData.progress_status === 2 &&
                              trans("Nigotiation in progress")}
                            {userData.progress_status === 3 &&
                              trans("Signup in progress")}
                            {userData.progress_status === 4 &&
                              trans("New Franchise")}
                            {userData.progress_status === 5 &&
                              trans("Active Franchise")}
                          </span>
                        </>
                      )}
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <Form
                    className="needs-validation"
                    noValidate=""
                    onSubmit={handleSubmit(formSubmit)}
                  >
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("First Name")}
                      </Label>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        key={
                          userData !== null && userData.name != null
                            ? userData.name
                            : ""
                        }
                        defaultValue={
                          userData !== null && userData.name != null
                            ? userData.name
                            : ""
                        }
                        placeholder={trans("Enter first name")}
                        innerRef={register({ required: true })}
                      // onChange = {(e)=>changeHandler(e)}
                      />
                      <span>{errors.name && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Last Name")}
                      </Label>
                      <Input
                        className="form-control"
                        name="last_name"
                        key={
                          userData !== null && userData.last_name != null
                            ? userData.last_name
                            : ""
                        }
                        defaultValue={
                          userData !== null && userData.last_name != null
                            ? userData.last_name
                            : ""
                        }
                        type="text"
                        placeholder={trans("Enter name")}
                        innerRef={register({ required: true })}
                      // onChange = {(e)=>changeHandler(e)}
                      />
                      <span>
                        {errors.last_Name && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    {/* <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Username")}
                      </Label>
                      <Input
                        // readOnly
                        className="form-control"
                        name="user_name"
                        key={
                          userData !== null && userData.user_name != null
                            ? userData.user_name
                            : ""
                        }
                        defaultValue={
                          userData !== null && userData.user_name != null
                            ? userData.user_name
                            : ""
                        }
                        type="text"
                        placeholder={trans("Enter name")}
                        innerRef={register({ required: true })}
                      />
                      <span>
                        {errors.user_name && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col> */}
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Email")}
                      </Label>
                      <Input
                        readOnly
                        className="form-control"
                        name="email"
                        type="email"
                        value={
                          userData !== null && userData.email != null
                            ? userData.email
                            : ""
                        }
                        placeholder={trans("Enter email")}
                        innerRef={register({ required: true })}
                      />
                      <span>{errors.email && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Address")}
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        key={
                          userData !== null && userData.address != null
                            ? userData.address
                            : ""
                        }
                        defaultValue={
                          userData !== null && userData.address != null
                            ? userData.address
                            : ""
                        }
                        placeholder={trans("Enter address")}
                        innerRef={register({ required: true })}
                      // onChange = {changeHandler}
                      />
                      <span>
                        {errors.address && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Franchise Name")}
                      </Label>
                      <Input
                        className="form-control"
                        name="franchise_name"
                        key={
                          userData !== null && userData.franchise_name != null
                            ? userData.franchise_name
                            : ""
                        }
                        defaultValue={
                          userData !== null && userData.franchise_name != null
                            ? userData.franchise_name
                            : ""
                        }
                        type="text"
                        placeholder={trans("Enter name")}
                        innerRef={register({ required: true })}
                        readOnly
                      />
                      <span>
                        {errors.franchise_name && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Mobile number")}
                      </Label>
                      <Input
                        className="form-control"
                        name="mobilenumber"
                        type="tel"
                        key={userData != null ? userData.mobilenumber : ""}
                        defaultValue={
                          userData != null ? userData.mobilenumber : ""
                        }
                        placeholder={trans("Enter mobile number")}
                        innerRef={register({
                          required: true,
                          maxLength: 18,
                          pattern: /^(?=.*[0-9])[- +()0-9]+$/,
                        })}
                      // onChange = {changeHandler}
                      />
                      <span>
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
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("City")}
                      </Label>
                      <Input
                        className="form-control"
                        name="city"
                        type="text"
                        key={
                          userData !== null && userData.city != null
                            ? userData.city
                            : ""
                        }
                        defaultValue={
                          userData !== null && userData.city != null
                            ? userData.city
                            : ""
                        }
                        placeholder={trans("Enter city")}
                        innerRef={register({ required: true })}
                      // onChange = {(e)=>changeHandler(e)}
                      />
                      <span>{errors.city && trans("field is required")}</span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Country")}
                      </Label>
                      <Input
                        className="form-control"
                        name="country"
                        type="select"
                        key={
                          userData !== null && userData.country != null
                            ? userData.country
                            : ""
                        }
                        defaultValue={
                          userData !== null && userData.country != null
                            ? userData.country
                            : ""
                        }
                        placeholder={trans("Enter country")}
                        innerRef={register({ required: true })}
                      // onChange = {(e)=>changeHandler(e)}
                      >
                        <option disabled>country</option>
                        {countryList != null &&
                          countryList.map((country) => {
                            return <option value={country}>{country}</option>;
                          })}
                      </Input>
                      <span>
                        {errors.country && trans("field is required")}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{trans("Zip")}</Label>
                      <Input
                        className="form-control"
                        name="zip_code"
                        type="number"
                        key={
                          userData !== null && userData.zip_code != null
                            ? userData.zip_code
                            : ""
                        }
                        defaultValue={
                          userData !== null && userData.zip_code != null
                            ? userData.zip_code
                            : ""
                        }
                        innerRef={register({
                          required: true,
                          pattern: /^\d{5}(?:[- ]?\d{4})?$/,
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
                    <Row>
                      <Col md="12">
                        <Button color="success">{trans("Save")}</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
};

export default Profile;
