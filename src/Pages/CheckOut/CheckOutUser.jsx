/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./checkOut.css";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutFormFill,
  checkoutFormPushData,
  checkoutFormSubmit,
  checkoutFormUserData,
} from "../../redux/CheckOut/checkOutFormAction";
import { isTokenAvailable } from "../../redux/Tokens/token";
import { isTokenExpiryTime } from "../../redux/Tokens/tokenexpire";
import { useTranslation, } from "react-i18next";
import countries from "../../assets/countries";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import moment from "moment";
import { CheckoutGetUserDataAction } from "../../redux/CheckOut/CheckOutUser/CheckoutGetUserAction";
import { URL } from "../../env";

var CryptoJS = require("crypto-js");

const CheckOutUser = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const { user_data } = useSelector((state) => state.checkoutForm);

  const location = useLocation();
  const userInfo = useSelector((state) => state.getCheckoutGetUser.checkoutUserData);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ shouldFocusError: true });

  // dispatch(isTokenAvailable());
  const isTokenAvailableState = useSelector((state) => state.tokenAvailable);
  const [checkoutType, setCheckoutType] = useState("guest");
  const [userId, setUserId] = useState(
    localStorage.getItem("user_id") ? localStorage.getItem("user_id") : ""
  );
  var bytes = CryptoJS.AES.decrypt("" + userId, "_#userid_");
  var original_id = null;
  if (bytes != null) {
    original_id = bytes.toString(CryptoJS?.enc?.Utf8);
  }

  const initialstate = {
    isDefaultValues: true,
  };

  const [FormData, setFormData] = useState(initialstate);
  const {
    isDefaultValues,
  } = FormData;

  useEffect(() => {
    isTokenAvailableState ? setCheckoutType("user") : setCheckoutType("guest");

    dispatch(isTokenAvailable());
    dispatch(isTokenExpiryTime());

    dispatch(checkoutFormSubmit(handleSubmit));

    if (userInfo == undefined || userInfo == "" || userInfo == "[object Object]" || original_id != "") {
      dispatch(CheckoutGetUserDataAction(original_id))
    }
  }, [original_id]);
  // ------------------------------------------

  useEffect(() => {
    if (userInfo != undefined && userInfo != null && userInfo != "") {
      localStorage.setItem("user_temp", userInfo == "" ? "" : userInfo);
    }

    if (userInfo != undefined && userInfo != null && userInfo != "") {
      const bytes = CryptoJS.AES.decrypt(userInfo, "_userInfo_");

      var decrypted_UserInfo = null;
      if (bytes != null) {
        decrypted_UserInfo = JSON.parse(bytes.toString(CryptoJS?.enc?.Utf8));
      }
      if (decrypted_UserInfo != null) {
        dispatch(
          checkoutFormPushData({ key: "user_id", value: decrypted_UserInfo.id })
        );
      }

      if (decrypted_UserInfo != null) {
        dispatch(checkoutFormUserData(decrypted_UserInfo));
      }
    }
  }, [userInfo]);

  const onHandleChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (type == "checkbox") {
      setFormData({
        ...FormData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...FormData,
        [name]: value,
      });
    }
  };

  return (
    <Form>
      {user_data != null && (
        <div className="co__delivery_address mt-4">
          <Form.Label className="co__label_title form_labels">
            {trans("Delivery Address")}
          </Form.Label>
          <div className="row m-0">
            <div className="col-md-6 ps-0 pe-0 pe-md-1">
              <div className="mb-3" controlId="delivery_f_name">
                <TextField
                  InputLabelProps={{
                    style: {
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: "400",
                    },
                  }}
                  label={trans("First Name")}
                  variant="outlined"
                  fullWidth
                  size="medium"
                  type="text"
                  name="firstName"
                  onChange={(e) => dispatch(checkoutFormFill(e))}
                  {...register("firstName", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.\s]+$/,
                  })}
                  defaultValue={user_data.first_name}
                  InputProps={{ readOnly: true }}
                />
                <span
                  className="text-danger text-capitalize"
                  style={{ fontSize: 12 }}
                >
                  {errors.firstName?.type == "required" &&
                    trans("field is required.")}
                  {errors.firstName?.type == "maxLength" &&
                    trans("Maximum Length: ") + "30"}
                  {errors.lastName?.type == "pattern" &&
                    "Please write alphanumeric values"}
                </span>
                <div className="valid-feedback">{trans("Looks good!")}</div>
              </div>
            </div>
            <div className="col-md-6 ps-0 ps-md-1 pe-0">
              <div className="mb-3" controlId="delivery_l_name">
                <TextField
                  InputLabelProps={{
                    style: {
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: "400",
                    },
                  }}
                  label={trans("Last Name")}
                  variant="outlined"
                  fullWidth
                  size="medium"
                  type="text"
                  name="lastName"
                  onChange={(e) => dispatch(checkoutFormFill(e))}
                  {...register("lastName", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.\s]+$/,
                  })}
                  InputProps={{ readOnly: true }}
                  defaultValue={user_data.last_name}
                />
                <span
                  className="text-danger text-capitalize"
                  style={{ fontSize: 12 }}
                >
                  {errors.lastName?.type == "required" &&
                    trans("field is required.")}
                  {errors.lastName?.type == "maxLength" &&
                    trans("Maximum Length: ") + "30"}
                  {errors.lastName?.type == "pattern" &&
                    "Please write alphanumeric values"}
                </span>
                <div className="valid-feedback">{trans("Looks good!")}</div>
              </div>
            </div>
          </div>
          <div className="mb-3" controlId="delivery_l_name">
            <TextField
              InputLabelProps={{
                style: {
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "400",
                },
              }}
              label={trans("Email")}
              variant="outlined"
              fullWidth
              size="medium"
              type="email"
              name="email"
              // defaultValue={email}
              onChange={(e) => dispatch(checkoutFormFill(e))}
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]/,
              })}
              InputProps={{ readOnly: true }}
              defaultValue={user_data.email}
            />
            <span
              className="text-danger text-capitalize"
              style={{ fontSize: 12 }}
            >
              {errors.email?.type == "required" && trans("field is required.")}
              {errors.email?.type == "maxLength" &&
                trans("Maximum Length: ") + "60"}
              {errors.email?.type === "pattern" &&
                trans("@ is required in email")}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </div>
          <div className="mb-3" controlId="delivery_address_no">
            <TextField
              InputLabelProps={{
                style: {
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "400",
                },
              }}
              label={trans("Address")}
              InputProps={{ readOnly: isDefaultValues }}
              variant="outlined"
              fullWidth
              size="medium"
              type="text"
              name="address"
              onChange={(e) => dispatch(checkoutFormFill(e))}
              {...register("address", { required: true, maxLength: 120 })}
              defaultValue={user_data.address}
            />
            <span
              className="text-danger text-capitalize"
              style={{ fontSize: 12 }}
            >
              {errors.address?.type == "required" &&
                trans("field is required.")}
              {errors.address?.type == "maxLength" &&
                trans("Maximum Length: ") + "120"}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </div>
          <div className="mb-3" controlId="delivery_phone_no">
            <TextField
              label={trans("Phone ")}
              InputLabelProps={{
                style: {
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: "400",
                },
              }}
              variant="outlined"
              fullWidth
              size="medium"
              type="tel"
              name="phone"
              defaultValue={user_data.mobilenumber}
              onChange={(e) => dispatch(checkoutFormFill(e))}
              {...register("phone", {
                required: true,
                maxLength: 18,
                pattern: /^(?=.*[0-9])[- +()0-9]+$/,
              })}
              // readOnly={isDefaultValues}
              InputProps={{ readOnly: isDefaultValues }}
            />
            <span
              className="text-danger text-capitalize"
              style={{ fontSize: 12 }}
            >
              {errors.phone?.type == "required" && trans("field is required.")}
              {errors.phone?.type == "maxLength" &&
                trans("Maximum Length: ") + "18"}
              {errors.phone?.type == "pattern" &&
                trans("Please write numerical values or + or - or ( or )")}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </div>
          <Form.Check
            className="co__form_check_default_value mb-3 form_labels"
            label={trans("Same As Billing Address")}
            name="isDefaultValues"
            checked={isDefaultValues}
            defaultChecked={isDefaultValues}
            // onChange={onHandleChange}
            onChange={(e) => (onHandleChange(e), dispatch(checkoutFormFill(e)))}
            {...register("isDefaultValues", {
              required: false,
              onChange: (e) => (
                dispatch(checkoutFormFill(e)),
                onHandleChange(e)
              ),
            })}
          />
          <div className="mb-3" controlId="delivery_country">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {trans("Country/Region")}
              </InputLabel>
              <Select
                variant="outlined"
                fullWidth
                size="medium"
                label={trans("Country/Region")}
                name="country"
                defaultValue={"France"}
                onChange={(e) => dispatch(checkoutFormFill(e))}
                {...register("country", { required: true })}
              >
                <MenuItem>{trans("Select Country")}</MenuItem>
                {countries !== [] &&
                  countries.map((count, i) => {
                    return <MenuItem value={count}>{count}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            <span
              className="text-danger text-capitalize"
              style={{ fontSize: 12 }}
            >
              {errors.country?.type == "required" && trans("field is required")}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
          </div>
          <div className="row m-0">
            <div className="col-md-6 ps-0 pe-0 pe-md-1">
              <div className="mb-3" controlId="delivery_postal_code">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: "400",
                    },
                  }}
                  label={trans("Postal Code")}
                  variant="outlined"
                  fullWidth
                  size="medium"
                  type="text"
                  name="postalCode"
                  InputProps={{ readOnly: isDefaultValues }}
                  defaultValue={user_data.zip_code}
                  onChange={(e) => dispatch(checkoutFormFill(e))}
                  {...register("postalCode", {
                    required: true,
                    pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                  })}
                />
                <span
                  className="text-danger text-capitalize"
                  style={{ fontSize: 12 }}
                >
                  {errors.postalCode?.type == "required" &&
                    trans("field is required.")}
                  {errors.postalCode?.type == "pattern" &&
                    trans(
                      "zip code must be 5 digits and can be up to 9 digits"
                    )}
                </span>
                <div className="valid-feedback">{trans("Looks good!")}</div>
              </div>
            </div>
            <div className="col-md-6 ps-0 ps-md-1 pe-0">
              <div className="mb-3" controlId="delivery_city">
                <TextField
                  InputLabelProps={{
                    style: {
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: "400",
                    },
                  }}
                  label={trans("City")}
                  variant="outlined"
                  fullWidth
                  size="medium"
                  type="text"
                  name="city"
                  defaultValue={user_data.city}
                  onChange={(e) => dispatch(checkoutFormFill(e))}
                  {...register("city", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.\s]+$/,
                  })}
                  InputProps={{ readOnly: isDefaultValues }}
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
            </div>
          </div>
        </div>
      )}
    </Form>
  );
};

export default CheckOutUser;
