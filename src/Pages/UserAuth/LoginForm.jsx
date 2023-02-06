/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import PasswordShow from "./PasswordShow";
import "./UserAuth.css";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isTokenAvailable } from "../../redux/Tokens/token";
import { useTranslation, } from "react-i18next";
import Spinner from "react-bootstrap/Spinner";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { checkoutFormUserData } from "../../redux/CheckOut/checkOutFormAction";

import { useForm } from "react-hook-form";
import { URL } from "../../env";

var CryptoJS = require("crypto-js");

const LoginForm = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const { checkOut } = props;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tokenExpiryTime, setTokenExpiryTime] = useState(
    localStorage.getItem("token_expiry_time")
  );

  useEffect(() => {
    localStorage.setItem("user_id", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("token_expiry_time", tokenExpiryTime);
  }, [userId, token, tokenExpiryTime]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const initialFormValue = {
    email: "",
    password: "",
  };

  const [LoginForm, setLoginForm] = useState(initialFormValue);
  const { email, password } = LoginForm;
  const [validated, setValidated] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  const controlLoginForm = (event) => {
    const { name, value } = event.target;
    setLoginForm({
      ...LoginForm,
      [name]: value,
    });
  };

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

  const onSubmit = (event) => {
    const form = event.currentTarget;
    setLoading(true);
    axios
      .post(`${URL}/signin-pagee`, {
        email: event.email,
        password: event.password,
        // portal: "webshop",
      })
      .then((response) => {
        if (response.data.success === true) {
          setLoading(false);
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

            if (decrypted_UserInfo != null) {
              dispatch(checkoutFormUserData(decrypted_UserInfo));
            }
          }

          // User Logged-In
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
          setAlertMessage(trans("Loggin Successfull !!"));
          handleClickAlert({
            vertical: "top",
            horizontal: "right",
          });

          if (checkOut && checkOut === true) {
            dispatch(isTokenAvailable());
          } else {
            setTimeout(function () {
              navigate("/");
            }, 2000);
          }
        } else {
          setLoading(false);
          setAlertMessage(trans("Credentailsss are not valid"));
          setAlertType("error");
          handleClickAlert({
            vertical: "top",
            horizontal: "right",
          });
        }
      })
      .catch((err) => {
        console.log("ERROR -------------", err);
        setLoading(false);
        if (window.navigator.onLine == true) {
          /** If internet connection is available */
          setAlertMessage(trans(err.response.data.message));
          setAlertType("error");
          handleClickAlert({
            vertical: "top",
            horizontal: "right",
          });
        } else {
          /** If internet connection is not available */
          setAlertMessage(trans("Internet Connection not available"));
          setAlertType("error");
          handleClickAlert({
            vertical: "top",
            horizontal: "right",
          });
        }
      });

    setValidated(true);
  };

  return (
    <>
      <Form
        className="needs-validation"
        noValidate=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-4 mb-4">
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
            onChange={controlLoginForm}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // console.log('onKeyDown', e.target.value);
                document.getElementById("login_submit_btn").click();
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
          />
          <span className="text-danger">
            {errors.email?.type == "required" && trans("field is required")}
            {errors.email?.type == "pattern" &&
              trans("Please enter valid email")}
          </span>
        </div>
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
              onChange={controlLoginForm}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // console.log('onKeyDown', e.target.value);
                  document.getElementById("login_submit_btn").click();
                }
              }}
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
            {errors.password?.type == "required" && trans("field is required.")}
            {errors.password?.type == "maxLength" &&
              trans("Maximum Length: ") + "30"}
            {errors.password?.type == "maxLength" &&
              trans("Minimum Length: ") + "6"}

            <div style={{ textAlign: "end", marginTop: 5 }}>
              <Link
                to="/email/verification"
                style={{
                  textDecoration: "none",
                  color: "#ff6295",
                  fontFamily: "Poppins-Bold",
                }}
              >
                {trans("Forgot Password?")}
              </Link>
            </div>
          </div>
        </FormControl>
        <Button
          id="login_submit_btn"
          type="submit"
          className="user_submit_btn"
          style={{ fontSize: 22 }}
        >
          {loading === true ? (
            <Spinner animation="border" variant="light" />
          ) : (
            trans("Login")
          )}
        </Button>
      </Form>
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
    </>
  );
};

export default LoginForm;
