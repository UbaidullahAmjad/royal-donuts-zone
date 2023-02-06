/* eslint-disable no-unused-vars */
import React from "react";
import { Form } from "reactstrap";
import Header from "../../../Components/Header/Header";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";
import { Card, Button } from "react-bootstrap";
import { useTranslation, } from "react-i18next";
import { useState } from "react";
import Footer from "../../../Components/Footer/Footer";
import CopyRight from "../../copy-right/CopyRight";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import PasswordShow from "../PasswordShow";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { URL } from "../../../env";

const EmailVertification = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({ shouldFocusError: true });

  const [loading, setLoading] = useState(false);
  const [VerifyTokenLoader, setVerifyTokenLoader] = useState(false);

  const [VerifyTokenError, setVerifyTokenError] = useState(null);

  const [UserData, setUserData] = useState(null);

  const [passwordShow, setPasswordShow] = useState(false);
  const [passRepeatShow, setPassRepeatShow] = useState(false);

  const params = useParams();

  useEffect(() => {
    setVerifyTokenLoader(true);
    const VerifyToken = () => {
      axios
        .post(URL + "/verify_token", {
          token: params.token,
          id: params.idd,
        })
        .then((response) => {
          if (response.data?.success) {
            setVerifyTokenLoader(false);
            setUserData(response?.data?.user);
          }
        })
        .catch((error) => {
          if (error?.response?.data?.error) {
            setVerifyTokenLoader(false);
            setVerifyTokenError(error.response?.data?.message);
            setUserData(null);
          }
        });
    };
    VerifyToken();
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(URL + "/change_password", {
        new_password: data.password,
        id: UserData.id,
      })
      .then((response) => {
        if (response.data?.success) {
          setLoading(false);
          toast.success(trans("Password changed successfully"), {
            position: "top-right",
            autoClose: 3000,
          });
          navigation("/");
        }
      })
      .catch((error) => {
        if (error?.response?.data?.error == true) {
          toast.error(trans(error?.response?.data.message), {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="user_auth__wrapped">
          <div className="row justify-content-center">
            <div
              className="col-sm-10 col-md-6 col-lg-6"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {VerifyTokenLoader == true ? (
                <div className="d-flex flex-direction-row">
                  <div className="col md-10 col-10">
                    <h1 style={{ marginRight: 20, width: "100%" }}>
                      {VerifyTokenError != null
                        ? trans(VerifyTokenError)
                        : trans("Please wait for token verification")}
                    </h1>
                  </div>
                  <div className="col md-10 col-10">
                    <Spinner
                      style={{ marginTop: 8 }}
                      animation="border"
                      variant="primary"
                    />
                  </div>
                </div>
              ) : UserData != null ? (
                <Card className="p-3">
                  <h4 className="text-center">
                    {trans("Change User Password")}
                  </h4>
                  <Form
                    className="needs-validation"
                    noValidate=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
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
                          label={trans("New Password")}
                          endAdornment={
                            <InputAdornment position="end">
                              <PasswordShow
                                passShow={passwordShow}
                                onclick={() => setPasswordShow(!passwordShow)}
                              />
                            </InputAdornment>
                          }
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
                    <FormControl fullWidth>
                      <div className="mb-3">
                        <InputLabel>{trans("Confirm New Password")}</InputLabel>
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
                          {...register("repeatPassword", {
                            required: true,
                            maxLength: 30,
                            minLength: 6,
                            validate: (val) => {
                              if (watch("password") != val) {
                                return trans("Password does not matched");
                              }
                            },
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
                          {errors.repeatPassword?.type == "minLength" &&
                            trans("Minimum Length: ") + "6"}
                          {errors.repeatPassword?.type == "validate" &&
                            errors.repeatPassword?.message}
                        </span>
                      </div>
                    </FormControl>
                    <Button
                      type="submit"
                      className="user_submit_btn mt-3"
                      style={{ fontSize: 22 }}
                    >
                      {loading === true ? (
                        <Spinner animation="border" variant="light" />
                      ) : (
                        trans("Submit")
                      )}
                    </Button>
                  </Form>
                </Card>
              ) : (
                <div className="col md-10 col-10">
                  <h1
                    style={{
                      marginRight: 20,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {VerifyTokenError != null
                      ? trans(VerifyTokenError)
                      : trans("Please wait for token verification")}
                  </h1>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button
                      className="user_submit_btn mt-3"
                      style={{ fontSize: 22 }}
                    >
                      {trans("Back")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CopyRight />
    </>
  );
};

export default EmailVertification;
