import React from "react";
import { Form } from "reactstrap";
import Header from "../../../Components/Header/Header";
import {
  TextField,
} from "@mui/material";
import Spinner from "react-bootstrap/Spinner";

import { useForm } from "react-hook-form";
import { Card, Button } from "react-bootstrap";
import { useTranslation, } from "react-i18next";
import { useState } from "react";
import Footer from "../../../Components/Footer/Footer";
import CopyRight from "../../copy-right/CopyRight";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { URL } from "../../../env";

const EmailVertification = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(URL + "/forgot_password", {
        email: data.email,
        url: window.location.origin + `/change/password`,
      })
      .then((response) => {
        if (response.data?.token && response.data?.user) {
          setLoading(false);
          toast.success(trans("Change Password Link"), {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 10000,
          });
        }
      })
      .catch((errors) => {
        if (errors?.response?.data?.error) {
          setLoading(false);
          toast.error(trans(errors?.response?.data?.message), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container-fluid">
        <div className="user_auth__wrapped">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-6 col-lg-6">
              <Card className="p-3">
                <h4 className="text-center">{trans("Email Verification")}</h4>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  <span className="text-danger">
                    {errors.email?.type == "required" &&
                      trans("field is required")}
                    {errors.email?.type == "pattern" &&
                      trans("Please enter valid email")}
                  </span>
                  <Button
                    type="submit"
                    className="user_submit_btn mt-3"
                    style={{ fontSize: 22 }}
                  >
                    {loading === true ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      trans("Next")
                    )}
                  </Button>
                </Form>
                <div style={{ textAlign: "end", marginTop: 5, marginBottom: 15 }}>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "#ff6295",
                      fontFamily: "Poppins-Bold",
                    }}
                  >
                    {trans("Remember Password?")}
                  </Link>
                </div>
              </Card>
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
