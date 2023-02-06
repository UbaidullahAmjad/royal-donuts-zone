import { useMediaQuery } from "@mui/material";
import React from "react";
import { Card, CardBody } from "reactstrap";

import "./ShopInformation.css";

import { useTranslation, } from "react-i18next";

const ShopInformation = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const extra_small_screen_matches = useMediaQuery("(max-width:500px)");

  let date = new Date();
  let day = new Date(date).toLocaleString("en-us", { weekday: "long" });
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

  return (
    <div>
      {" "}
      <Card>
        <CardBody>
          <div className="container-fluid">
            <div className="row justify-content-center m-0">
              <div className="col-md-11">
                <div className="col-lg-8 col-md-12">
                  <div className="row">
                    <div
                      className={
                        extra_small_screen_matches == false &&
                        "col-md-4 seperator"
                      }
                    >
                      <div className="row">
                        <div
                          className="col-lg-3 col-md-12 col-sm-12 loc_icon"
                          style={{ paddingRight: 0 }}
                        >
                          {" "}
                          <span className="location">
                            <i
                              className="fas fa-map-marker-alt locationIcon"
                              style={{ color: "#FF6295" }}
                            ></i>
                          </span>
                        </div>
                        <div className=" col-lg-9 col-md-12 col-sm-12 loc_desc">
                          <span id="location_description"
                            onClick={() => document.getElementById("myMap").scrollIntoView()}
                            style={{ cursor: 'pointer' }}
                          >
                            {props.stores.name_fr}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        extra_small_screen_matches == false &&
                        "col-md-4 seperator"
                      }
                    >
                      <div className="row">
                        <div className="col-lg-3 col-md-12 col-sm-12 telephone_icon">
                          {" "}
                          <span className="location">
                            <i
                              className="fas fa-phone-alt locationIcon"
                              style={{ color: "#FF6295" }}
                            ></i>
                          </span>
                        </div>
                        <div className="col-lg-9 col-md-12 col-sm-12 telephone_desc">
                          <a href={`tel:${props.stores.phone}`} style={{ textDecoration: 'none' }}>
                            <span
                              id="location_description"
                              style={{ color: "#000" }}
                            >
                              {props.stores.phone}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className={"col-md-4"}>
                      <div className="row">
                        <div className="col-lg-3 col-md-12 col-sm-12 clock_icon">
                          {" "}
                          <span className="location">
                            <i
                              className="fas fa-clock locationIcon"
                              style={{ color: "#FF6295" }}
                            ></i>
                          </span>
                        </div>

                        {days != undefined &&
                          days?.length > 0 &&
                          days?.slice(0, 1).map((item) => (
                            <div className="col-lg-9 col-md-12 col-sm-12 clock_desc">
                              <div id="">{trans(item?.day_name)}</div>
                              <div id="">
                                {" "}
                                {item?.day_start_time} TO {item?.day_end_time}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ShopInformation;
