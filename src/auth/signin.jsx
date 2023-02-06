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
import { Password, RememberPassword, SignIn } from "../constant";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpiryTime } from "../redux/tokens/tokenexpire/action";
import { isTokenAvailable } from "../redux/tokens/token/action";
import { User_Auth_Token } from "../redux/tokens/user_auth_token/action";
import { UserRolePermission } from "../redux/LoginUserData/action";
import { setStores } from "../redux/user_stores/storesAction";
import { translate } from "react-switch-lang";
import { Spinner } from "react-bootstrap";
var CryptoJS = require("crypto-js");

const Logins = (props) => {
  const trans = props.t;
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState("cplusoft@gmail.com"); //test@gmail.com
  const [password, setPassword] = useState("123456789"); //test123
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("jwt"); //firebase, jwt
  const [togglePassword, setTogglePassword] = useState(false);

  const [permission, setPermission] = useState(
    localStorage.getItem("permissions")
  );

  // let encryptRemenberCheck = CryptoJS.AES.encrypt(
  //   JSON.stringify(localStorage.getItem("passwordremember")),
  //   "_passwordremember_"
  // ).toString();
  // const bytesRemenberCheck = CryptoJS.AES.decrypt(encryptRemenberCheck, "_passwordremember_");
  // const decryptedRemenberCheck = bytesRemenberCheck.toString(CryptoJS?.enc?.Utf8);

  const [PasswordRemember, setPasswordRemember] = useState(localStorage.getItem("passwordremember"));
  const handlePasswordRemember = (e) => {
    if (e.target.checked) {
      console.log("passwordremember-Checkbox is checked..");
      // let encryptRemenberCheck = CryptoJS.AES.encrypt(
      //   true,
      //   "_passwordremember_"
      // ).toString();
      localStorage.setItem("passwordremember", true)
      setPasswordRemember(true)
    } else {
      console.log("passwordremember-Checkbox is not checked..");
      // let encryptRemenberCheck = CryptoJS.AES.encrypt(
      //   false,
      //   "_passwordremember_"
      // ).toString();
      localStorage.setItem("passwordremember", false)
      setPasswordRemember(false)
    }
  }
  // console.log("PasswordRemember-encryptRemenberCheck", encryptRemenberCheck)
  // console.log("PasswordRemember-decryptedRemenberCheck", decryptedRemenberCheck)

  console.log("PasswordRemember-localStorage.getItem(passwordremember)", localStorage.getItem("passwordremember"))
  console.log("PasswordRemember", PasswordRemember)

  const [UserData, setUserData] = useState(null);
  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(localStorage.getItem("Name"));
  const [role, setRole] = useState(atob(localStorage.getItem("role")));
  const [token, setToken] = useState(localStorage.getItem("token123"));
  const [tokenExpiryTime, setTokenExpiryTime] = useState(
    localStorage.getItem("token_expiry_time")
  );
  const [alertMessage, setAlertMessage] = useState("");
  const [stateAlert, setStateAlert] = useState({
    openAlert: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openAlert } = stateAlert;
  const [alertType, setAlertType] = useState("error");
  const handleClickAlert = (newState) => {
    setStateAlert({ openAlert: true, ...newState });
  };
  const handleCloseAlert = () => {
    setStateAlert({ ...stateAlert, openAlert: false });
  };
  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);

  const { store_user_token } = useSelector((state) => state.get_user_token);

  const isTokenExpiryState = useSelector((state) =>
    state.tokenExpiry.expire_time === undefined
      ? 0
      : state.tokenExpiry.expire_time
  );
  const dispatch = useDispatch();
  console.log("isTokenAvailableState: " + isTokenAvailableState);
  console.log("isTokenExpiryState: " + isTokenExpiryState);

  useEffect(() => {
    // let encryptRemenberCheck = CryptoJS.AES.encrypt(
    //   false,
    //   "_passwordremember_"
    // ).toString();
    localStorage.setItem(
      "passwordremember",
      localStorage.getItem("passwordremember") != undefined
        && localStorage.getItem("passwordremember") != null ? localStorage.getItem("passwordremember") : false
    );
    setPasswordRemember(PasswordRemember != undefined && PasswordRemember != null ? PasswordRemember : false);
    localStorage.setItem("profileURL", value);
    if (UserData != null) {
      localStorage.setItem("user_id", btoa(UserData.data.id));
      var all_permission = [];
      all_permission.push(UserData.permissions);
      console.log("PERRR", all_permission);
      localStorage.setItem("permissions", btoa(all_permission));
    }
    localStorage.setItem("Name", name);
    localStorage.setItem("role", btoa(role));

    localStorage.setItem("token123", token);
    localStorage.setItem("token_expiry_time", tokenExpiryTime);

    dispatch(isTokenAvailable());
    dispatch(isTokenExpiryTime());
  }, [
    value,
    UserData,
    name,
    role,
    permission,
    token,
    tokenExpiryTime,
    dispatch,
  ]);

  // useEffect(() => {
  //   console.log("USER IDDD ---------------------- ", SetUserId);

  // }, [SetUserId]);
  // useEffect(() => {
  //   isTokenAvailableState === true &&
  //     window.location.href.indexOf(`${process.env.PUBLIC_URL}/login`) > -1 &&
  //     (window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/RD`);
  // }, [isTokenAvailableState]);

  const loginWithJwt = async (email, password) => {
    setLoading(true);

    const baseUrl = `https://ecco.royaldonuts.xyz/api/signin-pagee`;
    axios
      .post(baseUrl, {
        email,
        password,
      })
      .then((user) => {
        setLoading(true);
        console.log("RESPONSE USER ---- ", user.data);
        setValue(man);
        setUserData(user.data);
        setName(`${user.data.data.name}`);
        setRole(user.data.role);
        setPermission(user.data.permissions);
        dispatch(setStores(user.data.selected_stores));
        localStorage.setItem("role", btoa(user.data.role));
        if (
          user.data.selected_stores != [] ||
          user.data.selected_stores != undefined
        ) {
          localStorage.setItem(
            "user_stores",
            JSON.stringify(user.data.selected_stores)
          );
        }

        // -------------------------
        const minutesToAdd = 60;
        const currentDate = new Date();
        const expiryDate = new Date(
          currentDate.getTime() + minutesToAdd * 60000
        );

        if (PasswordRemember && JSON.parse(PasswordRemember) == false) {
          setTokenExpiryTime(expiryDate);
        } else {
          localStorage.setItem("token_expiry_time", "null");
          setTokenExpiryTime("null");
        }
        dispatch(isTokenExpiryTime());
        if (user.data.role == "Eccom_Customer") {
          toast.error(trans("Access denied"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setToken(user.data.token);
          dispatch(isTokenAvailable());
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err: ", err.response);
        console.log("onLine", window.navigator.onLine);

        /** Checking internet connection */
        if (window.navigator.onLine == true) {
          /** If internet connection is available */
          // toast.error(trans(err.response.data.message));
          setAlertMessage(trans(err.response?.data?.message));
          setAlertType("error");
          handleClickAlert({
            vertical: "top",
            horizontal: "right",
          });
        } else {
          /** If internet connection is not available */
          toast.error(trans("Internet_Error"), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "ISTOKEN-AVAILABLe-STATE ---- ",
      isTokenAvailableState,
      " ---- 000 ---- ",
      UserData,
      " ==============",
      process.env.PUBLIC_URL
    );
    if (isTokenAvailableState == true) {
      if (PasswordRemember && PasswordRemember == true) {
        if (atob(localStorage.getItem("role")) == "Supplier_Customer") {
          // <Navigate to={`/customer-suppliers/customerSuppliers/RD`} replace />;
          navigate(`/customer-suppliers/customerSuppliers/RD`);
        } else {
          // <Navigate to={`/dashboard/default/RD`} replace />;
          navigate(`/dashboard/default/RD`);
          // console.log("REDIRECT ADMIN DASHBOARD");
        }
      }
    }
  }, [isTokenAvailableState]);

  return (
    <>
      <ToastContainer />
      <Container fluid={true} className="p-0">
        <Row style={{ margin: 0 }}>
          <Col xs="12">
            <div className="login-card">
              <div>
                <div style={{ textAlign: "center" }}>
                  {/* <a className="logo" href="index.html">
                  <img
                    className="img-fluid for-light"
                    src={require("../assets/images/logo/login.png")}
                    alt=""
                  />
                  <img
                    className="img-fluid for-dark"
                    src={require("../assets/images/logo/logo_dark.png")}
                    alt=""
                  />
                </a> */}
                  <span
                    onClick={() =>
                      (window.location.href = `${process.env.PUBLIC_URL}/login`)
                    }
                    style={{ cursor: "pointer", color: "#f36292" }}
                  // style={{ cursor: "pointer", color: "#0275d8" }}
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
                      <Form className="theme-form">
                        <h4 style={{ textAlign: "center" }}>
                          {trans("SignIn")}
                        </h4>
                        <p style={{ textAlign: "center" }}>
                          {trans("LoginDetail")}
                        </p>
                        <FormGroup>
                          <Label className="col-form-label">
                            {trans("EmailAddress")}
                          </Label>
                          <Input
                            className="form-control"
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={email}
                            placeholder={trans("Enter Email")}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label">
                            {trans("Password")}
                          </Label>
                          <Input
                            className="form-control"
                            type={togglePassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            defaultValue={password}
                            required
                            placeholder={trans("Enter Password")}
                          />
                          <div
                            className="show-hide"
                            onClick={() => setTogglePassword(!togglePassword)}
                          >
                            <span className={togglePassword ? "" : "show"}>
                              {togglePassword ? trans("hide") : trans("show")}
                            </span>
                          </div>
                        </FormGroup>
                        <div className="password_remember_box">
                          <div className="checkbox ml-3">
                            <Input
                              id="checkbox1"
                              type="checkbox"
                              defaultChecked={JSON.parse(PasswordRemember)}
                              defaultValue={JSON.parse(PasswordRemember)}
                              onChange={(e) => handlePasswordRemember(e)}
                            />
                            <Label className="text-muted" for="checkbox1">{trans("Remember password")}</Label>
                          </div>
                          <div className="form-group ml-3 mb-0">
                            <Link className="link" to={`${process.env.PUBLIC_URL}/email/verification`} style={{ top: 0, left: 0, right: '0', }}>{trans("Forgot Password")}</Link>
                          </div>
                        </div>
                        <div className="form-group mb-0 mt-3" style={{ transform: 'translateY(15px)' }}>
                          {selected === "firebase" ? (
                            <Button
                              color="primary"
                              className="btn-block"
                              disabled={loading ? loading : loading}
                            // onClick={(e) => loginAuth(e)}
                            >
                              {loading ? "LOADING..." : SignIn}
                            </Button>
                          ) : (
                            <Button
                              color="primary"
                              className="btn-block"
                              onClick={(e) => loginWithJwt(email, password)}
                            >
                              {loading === true ? (
                                <Spinner animation="border" />
                              ) : (
                                trans("SignIn")
                              )}
                            </Button>
                          )}
                        </div>
                      </Form>
                    </TabPane>
                    <TabPane className="fade show" tabId="auth0">
                      <div className="auth-content">
                        <img
                          src={require("../assets/images/auth-img.svg")}
                          alt=""
                        />
                        <h4>{"Welcome to login with Auth0"}</h4>
                        <p>
                          {
                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
                          }
                        </p>
                        {/* <Button color="info" onClick={loginWithRedirect}>
                        {AUTH0}
                      </Button> */}
                      </div>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
            key={vertical + horizontal}
            style={{ zIndex: "9999999" }}
          >
            <Alert
              onClose={handleCloseAlert}
              severity={alertType}
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    </>
  );
};

export default translate(Logins);
// export default withRouter(translate(Logins));
