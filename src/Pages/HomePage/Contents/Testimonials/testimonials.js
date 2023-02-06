/* eslint-disable react-hooks/rules-of-hooks */
import {
  Card,
  CardContent,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./testimonials.css";
// import { ArrowForward, ArrowBack } from "@material-ui/icons";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import { Col, Row } from "react-bootstrap";
import TestSlider from "./Testmonials_Slider/testmonial_slider";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonials } from "../../../../redux/HomePage/Testimonials/testimonialsAction";
import { useTranslation, } from "react-i18next";
import Skeleton from "@mui/material/Skeleton";
import getWindowDimensions from "../../../../Components/Hooks/useWindowDimensions"

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const testimonials = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { screenWidth } = getWindowDimensions();

  const slider = React.useRef(null);
  const theme = useTheme();
  const large_mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [allTestimonials, setAllTestimonials] = useState([]);
  const dispatch = useDispatch();
  const testimonialsData = useSelector(
    (state) => state.testimonialsReducers.testimonialsList
  );

  useEffect(() => {
    dispatch(getTestimonials());
  }, []);

  useEffect(() => {
    setAllTestimonials(testimonialsData);
  }, [testimonialsData]);

  const [ImageLoaded, setImageLoaded] = useState(false);

  return (
    <div style={{ marginTop: "5%", background: "#f8b5cb", overflow: "hidden" }}>
      <div className="testimonails-custom-shape-divider-top-1642772984">
        <div id="right_image_setting"></div>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div style={{ paddingBottom: 30 }}>
        <Grid container>
          <Grid item sm={10} md={11} xs={11}>
            <div style={{ display: "block" }}>
              <Card
                id="card"
                style={{
                  background: "transparent",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Container>
                    {large_mobile == false ? (
                      <Row
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Col
                          sm={6}
                          md={6}
                          style={{ display: "block", margin: "auto" }}
                        >
                          <Row style={{ display: "flex" }}>
                            <Col
                              md={2}
                              sm={4}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                              }}
                            >
                              {screenWidth > 360 && allTestimonials.length > 1 && (
                                <ArrowBack
                                  style={{ color: '#FFF', cursor: 'pointer', marginTop: 40 }}
                                  onClick={() => slider?.current?.slickPrev()}
                                />
                              )}
                            </Col>
                            <Col
                              className="testiminial_title_col"
                              md={8}
                              sm={8}
                              style={{ marginTop: "10%" }}
                            >
                              <h1
                                className="testiminial_title_1"
                                style={{
                                  fontFamily: "Poppins-Black",
                                  // fontSize: "2.2vw",
                                  margin: 0,
                                  lineHeight: "40px",
                                  color: "#F36292",
                                }}
                              >
                                {trans("Clients")}
                              </h1>
                              <h1
                                className="testiminial_title_2"
                                style={{
                                  fontFamily: "Poppins-Black",
                                  // fontSize: "2.6vw",
                                  marginTop: 0,
                                  color: "#F36292",
                                }}
                              >
                                {trans("Testimonials")}
                              </h1>
                            </Col>
                          </Row>
                        </Col>

                        <Col sm={6} md={6}>
                          <Row style={{ display: "flex" }}>
                            <Col md={11} sm={11}>
                              <Slider ref={slider} {...settings}>
                                {allTestimonials != [] &&
                                  allTestimonials.map((testimonial) => {
                                    return (
                                      <TestSlider
                                        description={testimonial.text}
                                        user_image={testimonial.file}
                                        name={testimonial.name}
                                      />
                                    );
                                  })}
                              </Slider>
                            </Col>
                            <Col
                              md={1}
                              sm={1}
                              style={{ display: "block", margin: "auto" }}
                            >
                              {screenWidth > 360 && allTestimonials.length > 1 && (
                                <ArrowForward
                                  id="arrow_forward"
                                  style={{ alignSelf: "center", color: '#FFF', cursor: 'pointer', marginTop: 40, zIndex: 99 }}
                                  onClick={() => slider?.current?.slickNext()}
                                />
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ) : (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                      >
                        <Col
                          xs={12}
                          style={{
                            display: "block",
                            margin: "auto",
                            padding: "0px 15px",
                          }}
                        >
                          <h1
                            className="testimonial_heading"
                            style={{
                              fontFamily: "Poppins-Black",
                              // fontSize: 70,
                              margin: 0,
                              lineHeight: "40px",
                            }}
                          >
                            {trans("Clients")}
                          </h1>
                          <h1
                            className="testimonial_sub_heading"
                            style={{
                              fontFamily: "Poppins-Black",
                              // fontSize: "6vw",
                              marginTop: 0,
                            }}
                          >
                            {trans("Testimonials")}
                          </h1>
                        </Col>

                        <Col xs={12}>
                          <Row>
                            {screenWidth > 360 && allTestimonials.length > 1 && (
                              <>
                                <Col
                                  xs={1}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "auto",
                                  }}
                                >
                                  <ArrowBack
                                    style={{ color: '#FFF', cursor: 'pointer', marginTop: 40 }}
                                    onClick={() => slider?.current?.slickPrev()}
                                  />
                                </Col>
                              </>
                            )}
                            <Col xs={10}>
                              <Slider ref={slider} {...settings}>
                                {allTestimonials != [] &&
                                  allTestimonials.map((testimonial) => {
                                    return (
                                      <TestSlider
                                        description={testimonial.text}
                                        user_image={testimonial.file}
                                        name={testimonial.name}
                                      />
                                    );
                                  })}
                              </Slider>
                            </Col>
                            {screenWidth > 360 && allTestimonials.length > 1 && (
                              <>
                                <Col
                                  xs={1}
                                  style={{
                                    display: "block",
                                    margin: "auto 0px",
                                  }}
                                >
                                  <ArrowForward
                                    id="arrow_forward"
                                    style={{ alignSelf: "center", color: '#FFF', cursor: 'pointer', marginTop: 40 }}
                                    onClick={() => slider?.current?.slickNext()}
                                  />
                                </Col>
                              </>
                            )}
                          </Row>
                        </Col>
                      </Row>
                    )}
                  </Container>
                </CardContent>
              </Card>
            </div>
          </Grid>
          <Grid item sm={2} md={1} xs={1}>
            <div style={{ justifyContent: "end", display: "flex" }}>
              <img
                src="/images/testimonails_donut.webp"
                id="test_donut_img"
                alt=""
                style={ImageLoaded === false ? { display: "none" } : {}}
                onLoad={() => setImageLoaded(true)}
              />
              {ImageLoaded === false && (
                <Skeleton
                  id="test_donut_img"
                  animation="wave"
                  variant="circular"
                  width={400}
                  height={280}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default testimonials;
