/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import man from "../assets/images/dashboard/profile.jpg";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import {
    Link,
    Navigate,
    useNavigate,
    // withRouter 
} from "react-router-dom";
import { Facebook, GitHub } from "react-feather";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { translate } from "react-switch-lang";
import { Spinner } from "react-bootstrap";
import { URL } from "../env";
import { useForm } from "react-hook-form";
var CryptoJS = require("crypto-js");

const EmailVerification = (props) => {
    const trans = props.t;
    const [selected, setSelected] = useState("jwt"); //firebase, jwt
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
        reset,
    } = useForm({ shouldFocusError: true });

    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        console.log("DATA --------------", data);
        axios
            .post(URL + "/forgot_password", {
                email: data.email,
                url: window.location.origin,
            })
            .then((response) => {
                // console.log("DATA-response --------------", response);
                if (response.data?.token && response.data?.user) {
                    setLoading(false);
                    navigate(
                        `${process.env.PUBLIC_URL}/change/password/${response.data.token}/${response.data.user.email}`,
                    );
                }
            })
            .catch((errors) => {
                console.log("ERROR -------------------", errors?.response?.data?.error);
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
            <Container fluid={true} className="p-0">
                <Row style={{ margin: 0 }}>
                    <Col xs="12">
                        <div className="login-card">
                            <div>
                                <div style={{ textAlign: "center" }}>
                                    <span
                                        onClick={() =>
                                            (window.location.href = `${process.env.PUBLIC_URL}/login`)
                                        }
                                        style={{ cursor: "pointer", color: "#f36292" }}
                                    >
                                        <span
                                            style={{
                                                fontSize: 32,
                                                fontWeight: 800,
                                                textAlign: "center",
                                            }}
                                        >
                                            Royal Donuts
                                        </span>
                                    </span>
                                </div>
                                <div
                                    className="login-main login-tab"
                                    style={{ boxShadow: "1px 1px 3px gray", marginTop: "20px" }}
                                >
                                    <TabContent activeTab={selected} className="content-login">
                                        <TabPane
                                            className="fade show"
                                            tabId={selected === "firebase" ? "firebase" : "jwt"}
                                        >
                                            <Form className="theme-form"
                                                onSubmit={handleSubmit(onSubmit)}
                                            >
                                                <h4 style={{ textAlign: "center" }}>
                                                    {trans("Email Verification")}
                                                </h4>
                                                <p style={{ textAlign: "center" }}>
                                                    {trans("VerificationDetail")}
                                                </p>
                                                <FormGroup>
                                                    <Label className="col-form-label">
                                                        {trans("EmailAddress")}
                                                    </Label>
                                                    <Input
                                                        className="form-control"
                                                        type="email"
                                                        name="email"
                                                        InputLabelProps={{
                                                            required: true,
                                                        }}
                                                        placeholder={trans("Enter Email")}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                // console.log('onKeyDown', e.target.value);
                                                                document.getElementById('login_submit_btn').click();
                                                            }
                                                        }}
                                                        innerRef={
                                                            register({
                                                                required: true,
                                                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                message: "Please enter a valid email",
                                                            })
                                                        }
                                                    />
                                                    <span className="text-danger">
                                                        {errors.email?.type == "required" && trans("field is required")}
                                                        {errors.email?.type == "pattern" &&
                                                            trans("Please enter valid email")}
                                                    </span>
                                                </FormGroup>
                                                <div className="form-group mb-0 mt-3" style={{ transform: 'translateY(15px)' }}>
                                                    <Button
                                                        id="login_submit_btn"
                                                        color="primary"
                                                        className="btn-block"
                                                        disabled={loading ? loading : loading}
                                                    // onClick={() => navigate(`${process.env.PUBLIC_URL}/change/password/iygygu`)}
                                                    >
                                                        {loading ? "LOADING..." : "Next"}
                                                    </Button>
                                                </div>
                                            </Form>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default translate(EmailVerification);
