import React, { useState } from "react";
import "./rightSide.css";
import SmallMap from "./SmallMap";

import { Card, CardBody, Form } from "reactstrap";
import { TextField } from "@mui/material";

import { useTranslation, } from "react-i18next";
import { Button } from "reactstrap";

import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { SIMPLE_URL, URL } from "../../../../env";

const RightSide = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [expand, setExpand] = useState(false);
  let date = new Date();
  let day = new Date(date).toLocaleString("en-us", { weekday: "long" });

  const setCollapse = () => {
    // debugger;
    setExpand(!expand);
  };
  const days = props?.storeDays;
  const map = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };
  days.sort((a, b) => {
    return map[a.day_name] - map[b.day_name];
  });

  // const temp = days && days?.find((item) => item.day_name == day);
  // const temp2 = days && days[0];
  // const temp3 = temp2?.day_name;

  const idd_of_store = props.stores.id;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("message", data.message);
    formData.append("store_id", idd_of_store);

    axios
      .post(`${URL}/store_customer_email`, formData)
      .then((response) => {
        toast.success(trans("mail sent successfully to shop owner"), {
          position: "top-right",
          autoClose: 5000,
        });
        reset();
      })
      .catch((error) => {
        toast.warn(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="leftRow3 px-1">
      <ToastContainer />
      <Card>
        <CardBody>
          <div className="row">
            <div className="col-lg-3 col-md-2 col-4 store_img_div">
              <img
                className="logoImg"
                src={`${SIMPLE_URL}/images/Store/${props.stores.image}`}
                alt={`${props.stores.image}`}
              ></img>
            </div>
            <div
              className=" col-lg-9 col-md-10 col-8 store_name_div"
              style={{ position: "relative" }}
            >
              <h6 className="store_name">{props.stores.name_fr}</h6>
              <p className="store_url">{props.stores.url_field}</p>
            </div>
          </div>
          <div className="store_right_side_input_fields mt-3">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label={trans("Name")}
                variant="outlined"
                className="form-control "
                name="name"
                {...register("name", {
                  required: false,
                  maxLength: 30,
                  pattern: /^[a-zA-Z0-9.\s]+$/,
                })}
              ></TextField>
              {errors.firstName?.type == "maxLength" &&
                trans("Maximum Length: ") + "30"}
              {errors.firstName?.type == "pattern" &&
                "Please write alphanumeric values"}
              <TextField
                label={trans("Email")}
                variant="outlined"
                className="form-control mt-2"
                {...register("email", {
                  required: true,
                  maxLength: 30,
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]/,
                })}
                name="email"
              ></TextField>
              <span
                className="text-danger text-capitalize"
                style={{ fontSize: 12 }}
              >
                {errors.email?.type == "required" &&
                  trans("field is required.")}
                {errors.email?.type == "maxLength" &&
                  trans("Maximum Length: ") + "30"}
                {errors.email?.type === "pattern" &&
                  trans("@ is required in email")}
              </span>
              <TextField
                label={trans("Telephone")}
                variant="outlined"
                className="form-control mt-2"
                name="phone"
                {...register("phone", {
                  required: false,
                  maxLength: 18,
                  pattern: /^(?=.*[0-9])[- +()0-9]+$/,
                })}
              ></TextField>
              {errors.phone?.type == "maxLength" &&
                trans("Maximum Length: ") + "18"}
              {errors.phone?.type == "pattern" &&
                trans("Please write numerical values or + or - or ( or )")}
              <TextField
                className="form-control mt-2"
                label={trans("Message")}
                multiline={true}
                rows="4"
                name="message"
                {...register("message", {
                  required: true,
                })}
              ></TextField>
              <span
                className="text-danger text-capitalize"
                style={{ fontSize: 12 }}
              >
                {errors.message?.type == "required" &&
                  trans("field is required.")}
              </span>
              <Button
                color="primary"
                type="submit"
                className="form-control mt-3"
              >
                {trans("Send Message")}
              </Button>
            </Form>
          </div>
        </CardBody>
      </Card>
      <Card style={{ marginTop: 16 }}>
        <CardBody>
          <div className="shop_schedule">
            <span className="shop_schedule_icon">
              <i className="fas fa-store"></i>
            </span>{" "}
            <span className="shop_schedule_text">{trans("Shop Schedule")}</span>
          </div>
          {days.map((item, index) => (
            <div
              className={
                days.length - 1 == index ? "shop_timing_last" : "shop_timing"
              }
            >
              <p>{props.trans(item.day_name)}</p>
              <h5>
                {" "}
                {item.day_start_time} - {item.day_end_time}
              </h5>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default RightSide;
