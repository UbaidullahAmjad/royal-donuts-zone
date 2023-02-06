/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useMemo } from "react";
import "./checkOut.css";
import { Form } from "react-bootstrap";
import { Button, Checkbox, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import countries from "../../assets/countries";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutFormFill,
  checkoutFormSubmit,
  checkoutGuestFormFilled,
} from "../../redux/CheckOut/checkOutFormAction";
import TextField from "@mui/material/TextField";
import moment from "moment";

const CheckOutTab = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { isCartFilled } = props;

  const location = useLocation();
  const navigate = useNavigate();

  let cart_products = useSelector((state) => state.myProductsCart?.cartItems);
  let checkoutFormData = useSelector((state) => state.checkoutForm.formData);

  useEffect(() => {
    dispatch(checkoutFormSubmit(handleSubmit));
  }, []);

  return (
    <div className="col-sm-12 col-md-12 col-lg-12 mb-3 mt-4 p-0">
      <Form
        id="checkout_form_submit"
        className="needs-validation"
        noValidate=""
      // onSubmit={() => dispatch(checkoutFormSubmit(handleSubmit(onSubmit)))}
      >
        <div className="co__contact_information card mb-3">
          <input
            type="hidden"
            className="isDefaultValues"
            defaultChecked={false}
            {...register("isDefaultValues", { required: false })}
            onChange={(event) => dispatch(checkoutFormFill(event))}
          />
          {/* --------------------- */}
          <Form.Group className="mb-3 mx-3" controlId="contact_info">
            <Form.Label className="co__label_title form_labels mt-2">
              <span>{trans("Contact Information")}</span>
            </Form.Label>
            <TextField
              InputLabelProps={{
                style: {
                  fontFamily: "Poppins",
                  fontWeight: "400",
                },
              }}
              label={trans("Email")}
              variant="outlined"
              fullWidth
              size="medium"
              type="email"
              name="contact"
              defaultValue={checkoutFormData?.contact}
              {...register("contact", {
                required: true,
                maxLength: 30,
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]/,
              })}
              onChange={(event) => dispatch(checkoutFormFill(event))}
            />
            <span
              className="text-danger text-capitalize"
              style={{ fontSize: 12 }}
            >
              {errors.contact?.type == "required" &&
                trans("field is required.")}
              {errors.contact?.type == "maxLength" &&
                trans("Maximum Length: ") + "30"}
              {errors.contact?.type === "pattern" &&
                trans("@ is required in email")}
            </span>
            <div className="valid-feedback">{trans("Looks good!")}</div>
            <br />
            <Checkbox
              className="checkbox"
              defaultChecked={checkoutFormData?.checked}
              {...register("checked", { required: false })}
              onChange={(event) => dispatch(checkoutFormFill(event))}
            />
            <span
              style={{ fontSize: "13px", fontWeight: "bold" }}
              className="form_labels"
            >
              {trans("Signup for exclusive offers via phone or email")}
            </span>
          </Form.Group>
        </div>
        <div className="co__delivery_address card">
          <Form.Label className="co__label_title form_labels">
            {trans("Delivery Address")}
          </Form.Label>
          <Form.Group className="mb-3 " controlId="delivery_country">
            <TextField
              InputLabelProps={{
                style: {
                  fontFamily: "Poppins",
                  fontWeight: "400",
                },
              }}
              label={trans("Country/Region")}
              variant="outlined"
              fullWidth
              size="medium"
              select
              type="select"
              name="country"
              defaultValue={"France"}
              {...register("country", { required: true })}
              onChange={(event) => dispatch(checkoutFormFill(event))}
            >
              <MenuItem defaultChecked value="">
                {trans("Select Country")}
              </MenuItem>
              {countries !== [] &&
                countries.map((count, i) => {
                  return (
                    <MenuItem value={count} id={count}>
                      {count}
                    </MenuItem>
                  );
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
          </Form.Group>
          <div className="row m-0">
            <div className="col-md-6 pe-0  ps-0">
              <Form.Group
                className="mb-3 d-flex flex-column "
                controlId="delivery_f_name"
              >
                <TextField
                  InputLabelProps={{
                    style: {
                      fontFamily: "Poppins",
                      fontWeight: "400",
                    },
                  }}
                  label={trans("First Name")}
                  variant="outlined"
                  size="medium"
                  type="text"
                  name="firstName"
                  defaultValue={checkoutFormData?.firstName}
                  {...register("firstName", {
                    required: true,
                    maxLength: 30,
                    pattern: /^[a-zA-Z0-9.\s]+$/,
                  })}
                  onChange={(event) => {
                    setValue("firstName", event.target.value);
                    dispatch(checkoutFormFill(event));
                  }}

                />
                <span
                  className="text-danger text-capitalize"
                  style={{ fontSize: 12 }}
                >
                  {errors.firstName?.type == "required" &&
                    trans("field is required.")}
                  {errors.firstName?.type == "maxLength" &&
                    trans("Maximum Length: ") + "30"}
                  {errors.firstName?.type == "pattern" &&
                    "Please write alphanumeric values"}
                </span>
                <div className="valid-feedback">{trans("Looks good!")}</div>
              </Form.Group>
            </div>
            <div className="col-md-6 ps-0 ps-md-2 pe-0 checkoutUser_fields">
              <Form.Group
                className="mb-3 d-flex flex-column"
                controlId="delivery_l_name"
              >
                <TextField
                  InputLabelProps={{
                    style: {
                      fontFamily: "Poppins",
                      fontWeight: "400",
                    },
                  }}
                  label={trans("Last Name")}
                  variant="outlined"
                  size="medium"
                  type="text"
                  name="lastName"
                  defaultValue={checkoutFormData?.lastName}
                  {...register("lastName", {
                    required: true,
                    maxLength: 30,
                    pattern: /^[a-zA-Z0-9.\s]+$/,
                  })}
                  onChange={(event) => {
                    setValue("lastName", event.target.value);
                    dispatch(checkoutFormFill(event));
                  }}
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
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3 " controlId="delivery_address_no">
            <TextField
              InputLabelProps={{
                style: {
                  fontFamily: "Poppins",
                  fontWeight: "400",
                },
              }}
              label={trans("Address")}
              variant="outlined"
              fullWidth
              size="medium"
              type="text"
              name="address"
              defaultValue={checkoutFormData?.address}
              {...register("address", { required: true, maxLength: 120 })}
              onChange={(event) => {
                setValue("address", event.target.value);
                dispatch(checkoutFormFill(event));
              }}
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
          </Form.Group>
          <div className="row m-0">
            <div className="col-md-6 p-0">
              <Form.Group
                className="mb-3 d-flex flex-column"
                controlId="delivery_postal_code"
              >
                <TextField
                  InputLabelProps={{
                    style: {
                      fontFamily: "Poppins",
                      fontWeight: "400",
                    },
                  }}
                  label={trans("Postal Code")}
                  variant="outlined"
                  size="medium"
                  type="text"
                  name="postalCode"
                  defaultValue={checkoutFormData?.postalCode}
                  {...register("postalCode", {
                    required: true,
                    pattern: /^\d{5}(?:[- ]?\d{4})?$/,
                  })}
                  onChange={(event) => {
                    setValue("postalCode", event.target.value);
                    dispatch(checkoutFormFill(event));
                  }}
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
              </Form.Group>
            </div>
            <div className="col-md-6 ps-0 ps-md-2 pe-0 checkoutUser_fields">
              <Form.Group
                className="mb-3 d-flex flex-column"
                controlId="delivery_city"
              >
                <TextField
                  InputLabelProps={{
                    style: {
                      fontFamily: "Poppins",
                      fontWeight: "400",
                    },
                  }}
                  label={trans("City")}
                  variant="outlined"
                  size="medium"
                  type="text"
                  name="city"
                  defaultValue={checkoutFormData?.city}
                  {...register("city", {
                    required: true,
                    maxLength: 35,
                    pattern: /^[a-zA-Z0-9.\s]+$/,
                  })}
                  onChange={(event) => {
                    setValue("city", event.target.value);
                    dispatch(checkoutFormFill(event));
                  }}
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
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3 " controlId="delivery_phone_no">
            <TextField
              InputLabelProps={{
                style: {
                  fontFamily: "Poppins",
                  fontWeight: "400",
                },
              }}
              label={trans("Phone")}
              variant="outlined"
              fullWidth
              size="medium"
              type="tel"
              name="phone"
              // value={phone}
              defaultValue={checkoutFormData?.phone}
              {...register("phone", {
                required: true,
                maxLength: 18,
                pattern: /^(?=.*[0-9])[- +()0-9]+$/,
              })}
              onChange={(event) => {
                setValue("phone", event.target.value);
                dispatch(checkoutFormFill(event));
              }}
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
          </Form.Group>
        </div>
      </Form>
    </div>
  );
};

export default CheckOutTab;
