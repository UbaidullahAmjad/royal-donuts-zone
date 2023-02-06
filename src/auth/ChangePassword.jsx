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
    useParams,
    // withRouter 
} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useTranslation, } from "react-i18next";
import { Spinner } from "react-bootstrap";
import { URL } from "../env";
import { useForm } from "react-hook-form";
var CryptoJS = require("crypto-js");

const ChangePassword = (props) => {
    const { t } = useTranslation();
    const trans = t;
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    // const { loginWithRedirect } = useAuth0();
    const [password, setPassword] = useState(""); //test123
    const [passwordConfirm, setPasswordConfirm] = useState(""); //test123
    const [selected, setSelected] = useState("jwt"); //firebase, jwt
    const [togglePassword, setTogglePassword] = useState(false);
    const [togglePasswordConfirm, setTogglePasswordConfirm] = useState(false);

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
    const [VerifyTokenValid, setVerifyTokenValid] = useState(true);
    const [VerifyTokenLoader, setVerifyTokenLoader] = useState(false);
    const [VerifyTokenError, setVerifyTokenError] = useState(null);
    const [UserData, setUserData] = useState(null);

    const params = useParams();

    useEffect(() => {
        setVerifyTokenLoader(true);
        const VerifyToken = () => {
            axios
                .post(URL + "/verify_token", {
                    token: params.token,
                    id: params.id,
                })
                .then((response) => {
                    setVerifyTokenLoader(false);
                    setVerifyTokenValid(true)
                    if (response.data?.success) {
                        setUserData(response?.data?.user);
                    }
                })
                .catch((error) => {
                    console.log("verity-response-error", error.response)
                    setVerifyTokenValid(false)
                    setVerifyTokenLoader(false);
                    if (error?.response?.data?.error) {
                        setVerifyTokenError(error.response?.data?.message);
                        setUserData(null);
                    }
                });
        };
        VerifyToken();
    }, []);

    const onSubmit = (data) => {
        setLoading(true);
        console.log("DATA --------------", data);

        axios
            .post(URL + "/change_password", {
                new_password: data.password,
                id: UserData.id,
            })
            .then((response) => {
                if (response.data?.success) {
                    console.log("QWERTY");
                    setLoading(false);
                    toast.success(trans("Password changed successfully"), {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    navigation("/login", { replace: true, });
                }
            })
            .catch((error) => {
                if (window.navigator.onLine == true) {
                    /** If internet connection is available */
                    if (error?.response?.data?.error == true) {
                        toast.error(trans(error?.response?.data.message), {
                            position: "top-right",
                            autoClose: 3000,
                        });
                    }
                } else {
                    /** If internet connection is not available */
                    toast.error(trans("Internet_Error"), {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            });
    }


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
                                        onClick={() => {
                                            // (window.location.href = `${process.env.PUBLIC_URL}/login`)
                                            navigation(`${process.env.PUBLIC_URL}/login`, { replace: true })
                                        }}
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
                                            <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                                <h4 style={{ textAlign: "center" }}>
                                                    {trans("Change User Password")}
                                                </h4>
                                                <p style={{ textAlign: "center" }}>
                                                    {trans("ChangePasswordDetail")}
                                                </p>
                                                {
                                                    VerifyTokenLoader == true ? (
                                                        <div className="row d-flex justify-content-center">
                                                            <div className="col md-10 col-10">
                                                                <h4 style={{ marginRight: 20, textAlign: 'center', width: "100%" }}>
                                                                    {VerifyTokenError != null
                                                                        ? trans(VerifyTokenError)
                                                                        : trans("Please wait for token verification")}
                                                                </h4>
                                                            </div>
                                                            <div className="col md-10 col-10 d-flex justify-content-center">
                                                                <Spinner
                                                                    style={{ marginTop: 8 }}
                                                                    animation="border"
                                                                    variant="primary"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : VerifyTokenValid == true ? (<>
                                                        <FormGroup>
                                                            <Label className="col-form-label">
                                                                {trans("Enter New Password")}
                                                            </Label>
                                                            <Input
                                                                className="form-control"
                                                                InputLabelProps={{
                                                                    required: true,
                                                                }}
                                                                name="password"
                                                                type={togglePassword ? "text" : "password"}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                defaultValue={password}
                                                                required
                                                                placeholder={trans("Enter New Password")}
                                                                innerRef={
                                                                    register({
                                                                        required: true,
                                                                        maxLength: 30,
                                                                        minLength: 6,
                                                                        pattern: /^[a-zA-Z0-9.\s]+$/,
                                                                    })
                                                                }
                                                            />
                                                            <div
                                                                className="show-hide"
                                                                onClick={() => setTogglePassword(!togglePassword)}
                                                            >
                                                                <span className={togglePassword ? "" : "show"}>
                                                                    {togglePassword ? trans("hide") : trans("show")}
                                                                </span>
                                                            </div>
                                                            <div>
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
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label className="col-form-label">
                                                                {trans("Confirm New Password")}
                                                            </Label>
                                                            <Input
                                                                InputLabelProps={{
                                                                    required: true,
                                                                }}
                                                                className="form-control"
                                                                name="repeatPassword"
                                                                type={togglePasswordConfirm ? "text" : "password"}
                                                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                                                defaultValue={passwordConfirm}
                                                                placeholder={trans("Confirm New Password")}
                                                                innerRef={
                                                                    register({
                                                                        required: true,
                                                                        maxLength: 30,
                                                                        minLength: 6,
                                                                        // pattern: /^[a-zA-Z0-9.\s]+$/,
                                                                        validate: (val) => {
                                                                            if (watch("password") != val) {
                                                                                return trans("Password does not matched");
                                                                            }
                                                                        },
                                                                    })
                                                                }
                                                            />
                                                            <div
                                                                className="show-hide"
                                                                onClick={() => setTogglePasswordConfirm(!togglePasswordConfirm)}
                                                            >
                                                                <span className={togglePasswordConfirm ? "" : "show"}>
                                                                    {togglePasswordConfirm ? trans("hide") : trans("show")}
                                                                </span>
                                                            </div>
                                                            <div>
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
                                                                    {errors.repeatPassword?.type == "validate" &&
                                                                        errors.repeatPassword?.message}
                                                                </span>
                                                            </div>
                                                        </FormGroup>
                                                        <div className="form-group mb-0 mt-3" style={{ transform: 'translateY(15px)' }}>
                                                            <Button
                                                                type="submit"
                                                                className="btn-block"
                                                                color="primary"
                                                                disabled={loading ? loading : loading}
                                                            // onClick={(e) => loginAuth(e)}
                                                            >
                                                                {loading ? "LOADING..." : "Submit"}
                                                            </Button>
                                                        </div>
                                                    </>) : (<>
                                                        <FormGroup>
                                                            <Label className="col-form-label" style={{ color: 'red', textAlign: 'center' }}>
                                                                {trans("Invalid Token")}
                                                            </Label>
                                                        </FormGroup>
                                                        <div className="form-group mb-0 mt-3" style={{ transform: 'translateY(15px)' }}>
                                                            <Button
                                                                type="submit"
                                                                className="btn-block"
                                                                color="primary"
                                                                onClick={() => {
                                                                    navigation(`${process.env.PUBLIC_URL}/login`, { replace: true })
                                                                }}
                                                            >
                                                                {trans("Back to Login")}
                                                            </Button>
                                                        </div>
                                                    </>)
                                                }
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

export default ChangePassword;
