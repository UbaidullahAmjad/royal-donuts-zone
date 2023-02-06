import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../layout/breadcrumb";
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
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { toast } from "react-toastify";
import countries from "../../data/countries";
import SweetAlert from "sweetalert2";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import logo from "../../../assets/images/logo/logoo.png";
import logo from "../../assets/images/logo/logoo.png";

import Dropzone from "react-dropzone-uploader";

import { Eye, EyeOff } from "react-feather";

import DefaultProfileImg from "../../assets/images/dashboard/profile.jpg";

import * as ActionFunctions from "../../redux/UserProfile/actions";
import { SIMPLE_URL } from "../../env";

const UserProfile = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { user_data, user_password, user_confirm_password } = useSelector(
    (state) => state.userProfile
  );

  const user_id = atob(localStorage.getItem("user_id"));

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  useEffect(() => {
    if (user_data == null) {
      dispatch(ActionFunctions.GetUserProfileData(user_id));
    }
  }, []);

  const handleChangeStatus = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") allFiles.forEach((f) => f.remove());
    {
      setError(
        "image",
        {
          type: "string",
          message: trans("Maximum file size is 2 MB"),
        },
        {
          shouldFocus: true,
        }
      );
    }
    if (status == "done") {
      setValue("image", file);
      setError("image", {
        shouldFocus: false,
      });
    }
  };

  const onSubmit = (data) => {
    if (data.password == data.repeatPassword) {
      SweetAlert.fire({
        title: trans("Are you sure?"),
        text: trans("Do you want to update User Profile?"),
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: trans("Cancel"),
        confirmButtonText: trans("Update"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          dispatch(ActionFunctions.UpdateProfile(user_id, data, trans));
          localStorage.setItem(
            "Name",
            user_data.first_name + " " + user_data.last_name
          );
        }
      });
    } else {
      toast.error(trans("Password_Match"), 5000);
      setError(
        "password",
        {
          type: "string",
          message: trans("Password_Match"),
        },
        {
          shouldFocus: true,
        }
      );
      setError(
        "repeatPassword",
        {
          type: "string",
          message: trans("Password_Match"),
        },
        {
          shouldFocus: true,
        }
      );
    }
  };

  return (
    <Fragment>
      <Breadcrumb parent={trans("User Profile")} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <h5>{trans("Edit Profile")}</h5>
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
                        name="firstName"
                        type="text"
                        placeholder={trans("First Name")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        key={user_data != null && user_data.first_name}
                        defaultValue={user_data != null && user_data.first_name}
                      />
                      <span>
                        {errors.firstName?.type == "required" &&
                          trans("field is required")}
                        {errors.firstName?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.firstName?.type == "pattern" &&
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
                        name="lastName"
                        type="text"
                        placeholder={trans("Last Name")}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                        key={user_data != null && user_data.last_name}
                        defaultValue={user_data != null && user_data.last_name}
                      />
                      <span>
                        {errors.lastName?.type == "required" &&
                          trans("field is required")}
                        {errors.lastName?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.lastName?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Email")} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="email"
                        type="email"
                        readOnly
                        placeholder={trans("Enter Email")}
                        key={user_data != null && user_data.email}
                        defaultValue={user_data != null && user_data.email}
                        innerRef={register({
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      <span className="text-danger">
                        {errors.email?.type == "required" &&
                          trans("field is required")}
                        {errors.email?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30. "}
                        {/* { errors.email?.type == "pattern" && trans("Please write numeric values")} */}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">{Image}</Label>
                      <Controller
                        control={control}
                        name="image"
                        rules={{ required: false }}
                        render={() => (
                          <Dropzone
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            minSizeBytes={0}
                            maxSizeBytes={2000000}
                            inputContent={trans("Drop A File")}
                            styles={{
                              dropzone: { height: 200 },
                              dropzoneActive: { borderColor: "green" },
                            }}
                            accept="image/*"
                            onChangeStatus={handleChangeStatus}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.image?.type == "required"
                          ? trans("field is required")
                          : errors.image && errors.image.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                      <div className="container d-flex justify-content-center align-items-center">
                        {user_data?.image != null ? (
                          <img
                            width={100}
                            height={100}
                            src={`${SIMPLE_URL}/images/User/${user_data.image}`}
                            alt={localStorage.getItem("profileURL")}
                            style={{ marginTop: "20px" }}
                            onError={(e) => {
                              e.currentTarget.src = logo;
                            }}
                          ></img>
                        ) : (
                          <img
                            width={100}
                            height={100}
                            src={
                              localStorage.getItem("profileURL") != "null"
                                ? localStorage.getItem("profileURL")
                                : DefaultProfileImg
                            }
                            alt={
                              localStorage.getItem("profileURL") != "null"
                                ? localStorage.getItem("profileURL")
                                : DefaultProfileImg
                            }
                            style={{ marginTop: "20px" }}
                          ></img>
                        )}
                      </div>
                    </Col>
                    <Col md="12 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Address")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="address"
                        type="text"
                        placeholder={trans("Address")}
                        key={user_data != null && user_data.address}
                        defaultValue={user_data != null && user_data.address}
                        innerRef={register({
                          required: true,
                          maxLength: 120,
                        })}
                      />
                      <span className="text-danger">
                        {errors.address?.type == "required" &&
                          trans("field is required")}
                        {errors.address?.type == "maxLength" &&
                          trans("Maximum Length: ") + "120. "}
                        {/* { errors.email?.type == "pattern" && trans("Please write numeric values")} */}
                      </span>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Mobile Number")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="mobile_number"
                        type="text"
                        placeholder={trans("Mobile Number")}
                        key={user_data != null && user_data.mobilenumber}
                        defaultValue={
                          user_data != null && user_data.mobilenumber
                        }
                        innerRef={register({
                          required: true,
                          maxLength: 18,
                          pattern: /^(?=.*[0-9])[- +()0-9]+$/,
                        })}
                      />
                      <span className="text-danger">
                        {errors.mobile_number?.type == "required" &&
                          trans("field is required.")}
                        {errors.mobile_number?.type == "maxLength" &&
                          trans("Maximum Length: ") + "18"}
                        {errors.mobile_number?.type == "pattern" &&
                          trans(
                            "Please write numerical values or + or - or ( or )"
                          )}
                      </span>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Zip Code")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="zip_code"
                        type="text"
                        placeholder={trans("Zip Code")}
                        key={user_data != null && user_data.zip_code}
                        defaultValue={user_data != null && user_data.zip_code}
                        innerRef={register({
                          required: true,
                          pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                        })}
                      />
                      <span className="text-danger">
                        {errors.zip_code?.type == "required" &&
                          trans("field is required.")}
                        {errors.zip_code?.type == "pattern" &&
                          trans(
                            "zip code must be 5 digits and can be up to 9 digits"
                          )}
                      </span>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("City")} <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="city"
                        type="text"
                        placeholder={trans("City")}
                        key={user_data != null && user_data.city}
                        defaultValue={user_data != null && user_data.city}
                        innerRef={register({
                          required: true,
                          maxLength: 35,
                          pattern: /^[a-zA-Z0-9.\s]+$/,
                        })}
                      />
                      <span className="text-danger">
                        {errors.city?.type == "required" &&
                          trans("field is required.")}
                        {errors.city?.type == "maxLength" &&
                          trans("Maximum Length: ") + "35"}
                        {errors.city?.type == "pattern" &&
                          "Please write alphanumeric values"}
                      </span>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Country")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        className="form-control"
                        name="country"
                        type="select"
                        innerRef={register({ required: true })}
                      >
                        <option selected="true" value="" disabled>
                          {trans("Select")}
                        </option>
                        {countries !== [] &&
                          countries.map((item) => {
                            return (
                              <option
                                value={item}
                                selected={
                                  user_data !== null &&
                                  user_data.country == item
                                }
                              >
                                {item}
                              </option>
                            );
                          })}
                      </Input>
                      <span className="text-danger">
                        {errors.country?.type == "required" &&
                          trans("field is required.")}
                      </span>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("New Password")}
                      </Label>
                      <InputGroup>
                        <Input
                          className="form-control"
                          name="password"
                          type={user_password == false ? "password" : "text"}
                          placeholder={trans("New Password")}
                          innerRef={register({
                            required: false,
                            maxLength: 30,
                            minLength: 6,
                          })}
                        />
                        <InputGroupAddon addonType="append">
                          <PasswordShowComponent password={true} />
                        </InputGroupAddon>
                      </InputGroup>
                      <span className="text-danger">
                        {errors.password?.type == "required" &&
                          trans("field is required")}
                        {errors.password?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.password?.type == "minLength" &&
                          trans("Minimum Length: ") + "6"}
                        {errors.password?.type == "string" &&
                          errors.password.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                    <Col md="6 mb-3">
                      <Label htmlFor="validationCustom02">
                        {trans("Confirm New Password")}
                      </Label>
                      <InputGroup>
                        <Input
                          className="form-control"
                          name="repeatPassword"
                          type={
                            user_confirm_password == false ? "password" : "text"
                          }
                          placeholder={trans("Confirm New Password")}
                          innerRef={register({
                            required: false,
                            maxLength: 30,
                            minLength: 6,
                          })}
                        />
                        <InputGroupAddon addonType="append">
                          <PasswordShowComponent password={false} />
                        </InputGroupAddon>
                      </InputGroup>
                      <span className="text-danger">
                        {errors.repeatPassword?.type == "required" &&
                          trans("field is required")}
                        {errors.repeatPassword?.type == "maxLength" &&
                          trans("Maximum Length: ") + "30"}
                        {errors.repeatPassword?.type == "minLength" &&
                          trans("Minimum Length: ") + "6"}
                        {errors.repeatPassword?.type == "string" &&
                          errors.repeatPassword.message}
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

export default UserProfile;

export const PasswordShowComponent = (props) => {
  const dispatch = useDispatch();

  const { user_password, user_confirm_password } = useSelector(
    (state) => state.userProfile
  );

  const TogglePassword = () => {
    if (props.password == true) {
      dispatch(ActionFunctions.TogglePasswordShow());
    } else {
      dispatch(ActionFunctions.ToggleConfirmPasswordShow());
    }
  };

  return (
    <Button color="warning" onClick={TogglePassword}>
      {props.password == true ? (
        user_password == false ? (
          <Eye style={{ height: "20px", display: "flex", width: "20px" }} />
        ) : (
          <EyeOff style={{ height: "20px", display: "flex", width: "20px" }} />
        )
      ) : user_confirm_password == false ? (
        <Eye style={{ height: "20px", display: "flex", width: "20px" }} />
      ) : (
        <EyeOff style={{ height: "20px", display: "flex", width: "20px" }} />
      )}
    </Button>
  );
};
