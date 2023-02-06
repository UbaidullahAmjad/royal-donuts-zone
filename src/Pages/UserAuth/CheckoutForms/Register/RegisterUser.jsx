/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "../../UserAuth.css";
import { Form, InputGroup, Card, Button } from "react-bootstrap";
import Footer from "../../../../Components/Footer/Footer";
import Header from "../../../../Components/Header/Header";
import PasswordShow from "../../PasswordShow";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useTranslation, } from "react-i18next";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import countries from "../../../../assets/countries";

import { isTokenAvailable } from "../../../../redux/Tokens/token";
import { checkoutFormUserData } from "../../../../redux/CheckOut/checkOutFormAction";

import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { URL } from "../../../../env";

var CryptoJS = require("crypto-js");

const RegisterUser = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const { checkOut } = props;
  const {
    page,
    valueTime,
    valueDateRange,
    address,
    zipCode,
    orderType,
    isCartFilled,
    store,
    setLoginStatus,
  } = props;

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();

  const initialFormValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const dispatch = useDispatch();

  const [RegisterForm, setRegisterForm] = useState(initialFormValue);
  const { password, repeatPassword } = RegisterForm;

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tokenExpiryTime, setTokenExpiryTime] = useState(
    localStorage.getItem("token_expiry_time")
  );

  const [validated, setValidated] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [passRepeatShow, setPassRepeatShow] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState(
    localStorage.getItem("user_temp") ? localStorage.getItem("user_temp") : ""
  );

  const [statePassAlert, setStatePassAlert] = useState({
    openPassAlert: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openPassAlert } = statePassAlert;
  const [alertType, setAlertType] = useState("error");
  const handleClickPassAlert = (newState) => {
    setStatePassAlert({ openPassAlert: true, ...newState });
  };
  const handleClosePassAlert = () => {
    setStatePassAlert({ ...statePassAlert, openPassAlert: false });
  };

  useEffect(() => {
    localStorage.setItem("user_id", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("token_expiry_time", tokenExpiryTime);
  }, [userId, token, tokenExpiryTime]);

  const controlRegisterForm = (event) => {
    const { name, value } = event.target;
    setRegisterForm({
      ...RegisterForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    // event.preventDefault();
    // throw new Error("GOT IT")

    let pass = event.password;
    let repeatPass = event.repeatPassword;

    if (pass.length < 2) {
      setPasswordError(trans("Password length must be alteast 6 characters"));
      setAlertType("error");
      handleClickPassAlert({
        vertical: "top",
        horizontal: "right",
      });
    } else {
      if (pass !== repeatPass) {
        setPasswordError(trans("Password does not matched"));
        setAlertType("error");
        handleClickPassAlert({
          vertical: "top",
          horizontal: "right",
        });
      } else {
        setLoading(true);
        if (pass === repeatPass) {
          const formData = new FormData();
          formData.append("first_name", event.firstName);
          formData.append("last_name", event.lastName);
          formData.append("email", event.email);
          formData.append("address", event.address);
          formData.append("mobile_number", event.mobile_number);
          formData.append("zip_code", event.zip_code);
          formData.append("city", event.city);
          formData.append("country", event.country);
          formData.append("password", event.password);
          formData.append("confirm_password", event.repeatPassword);
          formData.append("portal", "webshop");

          axios({
            method: "post",
            url: `${URL}/signup-pagee`,
            data: formData,
          })
            .then((response) => {
              if (response.data.success === true) {
                let data = response.data.data;
                let encryptData = CryptoJS.AES.encrypt(
                  JSON.stringify(data),
                  "_userInfo_"
                ).toString();
                const bytes = CryptoJS.AES.decrypt(encryptData, "_userInfo_");
                var decrypted_UserInfo = null;
                if (bytes != null) {
                  decrypted_UserInfo = JSON.parse(
                    bytes.toString(CryptoJS?.enc?.Utf8)
                  );
                }
                if (decrypted_UserInfo != null) {
                  dispatch(checkoutFormUserData(decrypted_UserInfo));
                }
                setLoading(false);
                setLoginStatus(true);
                setPasswordError(response.data.message);

                const user_id = response.data.data.id;
                // Encrypt
                const encrypted_user_id = CryptoJS.AES.encrypt(
                  "" + user_id,
                  "_#userid_"
                ).toString();
                setUserId(encrypted_user_id);
                setToken(response.data.token);
                localStorage.setItem("name", response.data.data.name);
                dispatch(isTokenAvailable());

                // -------------------------
                const minutesToAdd = 60;
                const currentDate = new Date();
                const expiryDate = new Date(
                  currentDate.getTime() + minutesToAdd * 60000
                );
                setTokenExpiryTime(expiryDate);
                // dispatch(isTokenExpiryTime());
                setAlertType("success");
                handleClickPassAlert({
                  vertical: "top",
                  horizontal: "right",
                });

                setTimeout(function () {
                  navigate("/checkout", {
                    state: {
                      isCartFilled: isCartFilled,
                      showGuestTabOnTabLogin: false,
                    },
                    replace: true,
                  });
                }, 2000);
              } else {
                setLoading(false);
                // setPasswordError("User Already Registered !!")
                setPasswordError(response.data.data);
                throw new Error("THEN");
                setAlertType("error");
                handleClickPassAlert({
                  vertical: "top",
                  horizontal: "right",
                });
              }
            })
            .catch((err) => {
              console.log("error msg", err);

              setLoading(false);
              /** Checking internet connection */
              if (window.navigator.onLine == true) {
                /** If internet connection is available */
                setPasswordError(trans("Failed to Register User !!"));
                setAlertType("error");
                handleClickPassAlert({
                  vertical: "top",
                  horizontal: "right",
                });
              } else {
                /** If internet connection is not available */
                setPasswordError(trans("Internet Connection not available"));
                setAlertType("error");
                handleClickPassAlert({
                  vertical: "top",
                  horizontal: "right",
                });
              }
            });
        }
      }
    }
  };

  const onSubmit_3 = (data) => {
    // console.log("Signup-onSubmit:-", data);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="user_auth__wrapped">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="p-0">
                {/* <h4 className="text-center">{trans("Register New User")}</h4> */}
                <Form
                  noValidate
                  validated={""}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row m-0">
                    <div className="col-md-6 ps-0 pe-0 pe-md-1">
                      <div className="mb-3" controlId="reg_fname">
                        <TextField
                          InputLabelProps={{
                            required: true,
                          }}
                          label={trans("First Name")}
                          variant="outlined"
                          fullWidth
                          size="normal"
                          type="text"
                          name="firstName"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              document
                                .getElementById("register_submit_btn")
                                .click();
                            }
                          }}
                          {...register("firstName", {
                            required: true,
                            pattern: /^[a-zA-Z0-9.\s]+$/,
                          })}
                        />
                        <span className="text-danger" style={{ fontSize: 12 }}>
                          {errors.firstName?.type == "required" &&
                            trans("field is required")}
                          {errors.firstName?.type == "pattern" &&
                            "Please write alphanumeric values"}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 ps-0 ps-md-1 pe-0">
                      <div className="mb-3" controlId="reg_lname">
                        <TextField
                          InputLabelProps={{
                            required: true,
                          }}
                          label={trans("Last Name")}
                          variant="outlined"
                          fullWidth
                          size="normal"
                          type="text"
                          name="lastName"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              document
                                .getElementById("register_submit_btn")
                                .click();
                            }
                          }}
                          {...register("lastName", {
                            required: true,
                            pattern: /^[a-zA-Z0-9.\s]+$/,
                          })}
                        />
                        <span
                          className="text-danger text-capitalize"
                          style={{ fontSize: 12 }}
                        >
                          {errors.lastName?.type == "required" &&
                            trans("field is required.")}
                          {errors.lastName?.type == "maxLength" &&
                            trans("Maximum Length: ") + "20"}
                          {errors.lastName?.type == "pattern" &&
                            "Please write alphanumeric values"}
                        </span>
                        <div className="valid-feedback">
                          {trans("Looks good!")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3" controlId="reg_email">
                    <TextField
                      InputLabelProps={{
                        required: true,
                      }}
                      label={trans("Email")}
                      variant="outlined"
                      fullWidth
                      size="normal"
                      type="email"
                      name="email"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          document
                            .getElementById("register_submit_btn")
                            .click();
                        }
                      }}
                      {...register("email", {
                        required: true,
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />{" "}
                    <div className="d-flex flex-column">
                      <span className="text-danger" style={{ fontSize: 12 }}>
                        {errors.email?.type == "required" &&
                          trans("field is required")}
                        {errors.email?.type == "pattern" &&
                          trans("Enter valid email")}
                      </span>
                      <Form.Text
                        className="text-muted"
                        style={{ fontSize: 12 }}
                      >
                        {trans(
                          "Signup_Mail_Msg"
                        )}
                      </Form.Text>
                    </div>
                  </div>
                  <div className="mb-3" controlId="reg_address">
                    <TextField
                      InputLabelProps={{
                        required: true,
                      }}
                      label={trans("Address")}
                      variant="outlined"
                      fullWidth
                      size="normal"
                      type="text"
                      name="address"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          document
                            .getElementById("register_submit_btn")
                            .click();
                        }
                      }}
                      {...register("address", {
                        required: true,
                      })}
                    />
                    <span className="text-danger" style={{ fontSize: 12 }}>
                      {errors.address?.type == "required" &&
                        trans("field is required")}
                    </span>
                    <div className="valid-feedback">{trans("Looks good!")}</div>
                  </div>
                  <div className="mb-3" controlId="reg_phone">
                    <TextField
                      InputLabelProps={{
                        required: true,
                      }}
                      label={trans("Mobile No")}
                      variant="outlined"
                      fullWidth
                      size="normal"
                      type="tel"
                      name="mobile_number"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          document
                            .getElementById("register_submit_btn")
                            .click();
                        }
                      }}
                      {...register("mobile_number", {
                        required: true,
                        maxLength: 18,
                        pattern: /^(?=.*[0-9])[- +()0-9]+$/,
                      })}
                    />
                    <span
                      className="text-danger text-capitalize"
                      style={{ fontSize: 12 }}
                    >
                      {errors.mobile_number?.type == "required" &&
                        trans("field is required.")}
                      {errors.mobile_number?.type == "maxLength" &&
                        trans("Maximum Length: ") + "18"}
                      {errors.mobile_number?.type == "pattern" &&
                        trans(
                          "Please write numerical values or + or - or ( or )"
                        )}
                    </span>
                    <div className="valid-feedback">{trans("Looks good!")}</div>
                  </div>
                  <div className="mb-3" controlId="reg_zipcode">
                    <TextField
                      InputLabelProps={{
                        required: true,
                      }}
                      label={trans("Zip Code")}
                      variant="outlined"
                      fullWidth
                      size="normal"
                      type="tel"
                      name="zip_code"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          document
                            .getElementById("register_submit_btn")
                            .click();
                        }
                      }}
                      {...register("zip_code", {
                        required: true,
                        pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                      })}
                    />
                    <span
                      className="text-danger text-capitalize"
                      style={{ fontSize: 12 }}
                    >
                      {errors.zip_code?.type == "required" &&
                        trans("field is required.")}
                      {errors.zip_code?.type == "pattern" &&
                        trans(
                          "zip code must be 5 digits and can be up to 9 digits"
                        )}
                    </span>
                    <div className="valid-feedback">{trans("Looks good!")}</div>
                  </div>
                  <div className="mb-3" controlId="reg_city">
                    <TextField
                      InputLabelProps={{
                        required: true,
                      }}
                      label={trans("City")}
                      variant="outlined"
                      fullWidth
                      size="normal"
                      type="text"
                      name="city"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          document
                            .getElementById("register_submit_btn")
                            .click();
                        }
                      }}
                      {...register("city", {
                        required: true,
                        pattern: /^[a-zA-Z0-9.\s]+$/,
                      })}
                    />
                    <span
                      className="text-danger text-capitalize"
                      style={{ fontSize: 12 }}
                    >
                      {errors.city?.type == "required" &&
                        trans("field is required.")}
                      {errors.city?.type == "maxLength" &&
                        trans("Maximum Length: ") + "35"}
                      {errors.city?.type == "pattern" &&
                        "Please write alphanumeric values"}
                    </span>
                    <div className="valid-feedback">{trans("Looks good!")}</div>
                  </div>
                  <div className="mb-3" controlId="reg_country">
                    <TextField
                      InputLabelProps={{
                        style: {
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: "400",
                        },
                      }}
                      label={trans("Country/Region")}
                      variant="outlined"
                      fullWidth
                      size="normal"
                      select
                      type="select"
                      defaultValue="France"
                      name="country"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          document
                            .getElementById("register_submit_btn")
                            .click();
                        }
                      }}
                      {...register("country", { required: true })}
                    >
                      <MenuItem defaultChecked value="">
                        {trans("Select Country")}
                      </MenuItem>
                      {countries !== [] &&
                        countries.map((count, i) => {
                          return <MenuItem value={count}>{count}</MenuItem>;
                        })}
                    </TextField>
                    <span
                      className="text-danger text-capitalize"
                      style={{ fontSize: 12 }}
                    >
                      {errors.country?.type == "required" &&
                        trans("field is required.")}
                    </span>
                    <div className="valid-feedback">{trans("Looks good!")}</div>
                  </div>
                  <div className="mb-3" controlId="reg_pass">
                    <FormControl fullWidth>
                      <div className="mb-3">
                        <InputLabel>{trans("Password")}</InputLabel>
                        <OutlinedInput
                          InputLabelProps={{
                            required: true,
                          }}
                          variant="outlined"
                          fullWidth
                          size="normal"
                          type={passwordShow ? "text" : "password"}
                          name="password"
                          label={trans("Password")}
                          endAdornment={
                            <InputAdornment position="end">
                              <PasswordShow
                                passShow={passwordShow}
                                onclick={() => setPasswordShow(!passwordShow)}
                              />
                            </InputAdornment>
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              document
                                .getElementById("register_submit_btn")
                                .click();
                            }
                          }}
                          {...register("password", {
                            required: true,
                            maxLength: 30,
                            minLength: 6,
                            pattern: /^[a-zA-Z0-9.\s]+$/,
                          })}
                        />
                        <span
                          className="text-danger text-capitalize"
                          style={{ fontSize: 12 }}
                        >
                          {errors.password?.type == "required" &&
                            trans("field is required.")}
                          {errors.password?.type == "maxLength" &&
                            trans("Maximum Length: ") + "30"}
                          {errors.password?.type == "minLength" &&
                            trans("Minimum Length: ") + "6"}
                        </span>
                      </div>
                    </FormControl>
                  </div>
                  <div className="mb-3" controlId="reg_repeat_pass">
                    <FormControl fullWidth>
                      <div className="mb-3">
                        <InputLabel>{trans("Repeat Password")}</InputLabel>
                        <OutlinedInput
                          InputLabelProps={{
                            required: true,
                          }}
                          variant="outlined"
                          fullWidth
                          size="normal"
                          type={passRepeatShow ? "text" : "password"}
                          name="repeatPassword"
                          label={trans("Repeat Password")}
                          endAdornment={
                            <InputAdornment position="end">
                              <PasswordShow
                                passShow={passRepeatShow}
                                onclick={() =>
                                  setPassRepeatShow(!passRepeatShow)
                                }
                              />
                            </InputAdornment>
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              document
                                .getElementById("register_submit_btn")
                                .click();
                            }
                          }}
                          {...register("repeatPassword", {
                            required: true,
                            maxLength: 30,
                            minLength: 6,
                          })}
                        />
                        <span
                          className="text-danger text-capitalize"
                          style={{ fontSize: 12 }}
                        >
                          {errors.repeatPassword?.type == "required" &&
                            trans("field is required.")}
                          {errors.repeatPassword?.type == "maxLength" &&
                            trans("Maximum Length: ") + "30"}
                          {errors.repeatPassword?.type == "minLength" &&
                            trans("Minimum Length: ") + "6"}
                        </span>
                      </div>
                    </FormControl>
                    {alertType === "error" &&
                      passwordError !== trans("User Already Registered !!") && (
                        <span
                          className="mb-3"
                          style={{ fontSize: 10, color: "red" }}
                        >
                          {passwordError}
                        </span>
                      )}
                  </div>
                  <Button
                    id="register_submit_btn"
                    type="submit"
                    className="user_submit_btn"
                    style={{ fontSize: 22 }}
                  >
                    {loading === true ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      trans("Register")
                    )}
                  </Button>
                </Form>
                <Stack spacing={2} sx={{ width: "100%" }}>
                  <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={openPassAlert}
                    autoHideDuration={6000}
                    onClose={handleClosePassAlert}
                    key={vertical + horizontal}
                    style={{ zIndex: "9999999" }}
                  >
                    <Alert
                      onClose={handleClosePassAlert}
                      severity={alertType}
                      sx={{ width: "100%" }}
                    >
                      {/* Password not matched! */}
                      {passwordError}
                    </Alert>
                  </Snackbar>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
