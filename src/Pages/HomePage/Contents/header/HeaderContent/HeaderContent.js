/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useContext } from "react";

import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Button } from "reactstrap";
import { Carousel, Container } from "react-bootstrap";
import "./HeaderContent.css";
import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material';
import { useTranslation, } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { HeaderContext } from "../../../main";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { SIMPLE_URL, URL } from "../../../../../env";
import { useDispatch, useSelector } from "react-redux";
import { HomeCarouselGetData } from "../../../../../redux/HomePage/HeaderContent/HomeCarouselAction"

const Item = styled(Button)(({ theme }) => ({
  color: breakpoint_theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&:hover": {
    backgroundColor: blue[700],
  },
}));

const blue = {
  500: "#ea2666",
  600: "#D2225B",
  700: "#D2225B",
};

const CustomButtonRoot = styled(Button)({
  // marginTop: "8.5pc",
  marginTop: "0.5pc",
  fontFamily: "JellyDonuts",
  fontSize: "20px",
  fontWeight: "bold",
  backgroundColor: "#ea2666",
  // padding: "0px 45px",
  // padding: "8px 45px 0px 45px",
  padding: "6px 45px 6px 45px",
  lineHeight: "2.5rem",
  borderRadius: "42px",
  marginRight: "10px",
  color: "white",
  WebkitTransition: "all 150ms ease",
  transition: "all 150ms ease",
  cursor: "pointer",
  border: "none",

  "&:hover": {
    backgroundColor: `${blue[600]} !important`,
    borderColor: `${blue[600]} !important`,
    boxShadow: "none",
    cursor: "pointer",
  },

  "&:active": {
    boxShadow: "none",
    backgroundColor: `${blue[700]} !important`,
    borderColor: `${blue[700]} !important`,
  },

  "&:focus": {
    boxShadow: `0 0 0 0.2rem ${blue[500]} !important`,
  },
});

function CustomButton(props) {
  const { t } = useTranslation();
  const trans = t;
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

const breakpoint_theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const HeaderContent = () => {
  const value = useContext(HeaderContext);
  const dispatch = useDispatch();

  const animation = useAnimation();

  const [SliderData, setSliderData] = useState({
    oldSlide: 0,
    activeSlide: 0,
    activeSlide2: 0,
  });

  const breakpoint_theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const MUIBreakpoints = makeStyles((theme) => ({
    HeaderSkeleton: {
      [breakpoint_theme.breakpoints.up("xs")]: {
        height: "480px!important",
        marginBottom: "-100px",
      },
      [breakpoint_theme.breakpoints.up("sm")]: {
        height: "500px!important",
        marginBottom: "-100px",
      },
      [breakpoint_theme.breakpoints.up("md")]: {
        height: "550px!important",
        marginBottom: "-100px",
      },
      [breakpoint_theme.breakpoints.up("lg")]: {
        height: "550px!important",
        marginBottom: "-100px",
      },
    },
  }));

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // speed: 2000,
    // autoplay: true,
    // autoplaySpeed: 10000,
    arrows: true,
    dots: true,
    nextArrow: <ArrowForwardIosIcon />,
    prevArrow: <ArrowBackIosIcon />,
    beforeChange: (current, next) =>
      setSliderData({ oldSlide: current, activeSlide: next }),
    afterChange: (current) => setSliderData({ activeSlide2: current }),
    responsive: [
      {
        breakpoint: 800,
        settings: {
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
        },
      },
    ],
  };

  const classes = MUIBreakpoints();

  // const [loading, setloading] = useState(true);

  const getHomeCarousel = useSelector((state) => state.getHomeCarousel)
  let CarouselData = getHomeCarousel?.carouselList ?? [];
  const homeSetting = useSelector((state) => state.getSettingsData.settings);
  let defaultHomeButtonColor = "#ea2666;";
  const HomeButtonColor = homeSetting?.button_color ?? defaultHomeButtonColor
  const loading = getHomeCarousel.loading;

  useEffect(() => {
    dispatch(HomeCarouselGetData())
  }, []);

  return (
    <div id="slider_header">
      {loading == true ? (
        <Skeleton
          className={classes.HeaderSkeleton}
          animation="wave"
          variant="rectangular"
          width={"100%"}
        />
      ) : (
        <Slider {...settings} style={{ height: 420 }}>
          {CarouselData.length > 0 &&
            CarouselData.map((item) => (
              <div key={item.id}>
                <Container fluid id="slick_fluid_container">
                  <Container id="slick_container">
                    <Grid container spacing={2} id="root_grid">
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        style={{ paddingTop: 0 }}
                      >
                        <motion.div
                          key={SliderData["activeSlide2"]}
                          initial={{ opacity: 0, x: "-15vw" }}
                          animate={{ x: 0, opacity: 1 }}
                          // whileInView={{
                          //   opacity: 1,
                          //   x: 0,
                          // }}
                          exit={{ opacaity: 0, x: 0 }}
                          transition={{
                            delay: 0.4,
                            duration: 2,
                            type: "spring",
                          }}
                        >
                          <div id="first_content">
                            <h4
                              id="first_heading"
                              dangerouslySetInnerHTML={{
                                __html: item.first_heading,
                              }}
                            ></h4>
                            <div id="second_content">
                              <h2
                                id="second_heading"
                                dangerouslySetInnerHTML={{
                                  __html: item.second_heading,
                                }}
                              ></h2>
                              {item?.important_text != null && (
                                <p
                                  id="imp_text"
                                  dangerouslySetInnerHTML={{
                                    __html: item.important_text,
                                  }}
                                ></p>
                              )}
                              {item?.button_text != null &&
                                item?.button_text != "" && (
                                  <motion.div
                                    key={SliderData["activeSlide2"]}
                                    initial={{ opacity: 0, y: -80 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    // whileInView={{
                                    //   opacity: 1,
                                    //   x: 0,
                                    // }}
                                    exit={{ opacaity: 0, x: 0 }}
                                    transition={{
                                      delay: 0.4,
                                      duration: 2,
                                      type: "spring",
                                    }}
                                  >
                                    <Link
                                      style={{ textDecoration: "none" }}
                                      to={item.url ? item.url : `/`}
                                    // replace={`true`}
                                    >
                                      <CustomButton
                                        id="imp_button"
                                      >
                                        <p
                                          dangerouslySetInnerHTML={{
                                            __html: item.button_text,
                                          }}
                                        ></p>
                                      </CustomButton>
                                    </Link>
                                  </motion.div>
                                )}
                            </div>
                          </div>
                        </motion.div>
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} id="second_grid">
                        <motion.div
                          key={SliderData["activeSlide2"]}
                          initial={{ opacity: 0, x: "15vw" }}
                          animate={{ opacity: 1, x: 0 }}
                          // whileInView={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: "0" }}
                          // whileFocus={{ x: ["50vw", 0] }}
                          transition={{
                            delay: 0.4,
                            duration: 2,
                            type: "spring",
                          }}
                        >
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "contain",
                            }}
                            src={`${SIMPLE_URL}/images/Carousel/${item.image}`}
                          />
                        </motion.div>
                      </Grid>
                    </Grid>
                  </Container>
                </Container>
              </div>
            ))}
        </Slider>
      )}
    </div>
  );
};

export default HeaderContent;
