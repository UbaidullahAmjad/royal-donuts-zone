/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import "./header.css";
import Grid from "@mui/material/Grid";

import Navbar from "../../../../Components/Navbar/Navbar";
import HeaderContent from "./HeaderContent/HeaderContent";

import { useTranslation, } from "react-i18next";
import { HeaderContext } from "../../main";
import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material';
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { URL } from "../../../../env";

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

const header = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();
  const classes = MUIBreakpoints();
  const value = useContext(HeaderContext);

  const homeSetting = useSelector((state) => state.getSettingsData.settings);

  let defaultHomeBGColor =
    "linear-gradient(90deg, rgba(245,145,178,1) 0%, rgba(240,91,140,1) 50%, rgba(236,56,115,1) 100%)";
  const [HomeBGColor, setHomeBGColor] = useState(null);

  useEffect(() => {
    const GetHomeSettings = async () => {
      axios
        .post(`${URL}/general_home_setting`)
        .then((response) => {
          setHomeBGColor(response.data.setting.background_color);
        })
        .catch((error) => {
          console.log("erorror", error);
        });
    };
    if (HomeBGColor == null) {
      GetHomeSettings();
    }
  }, []);

  return (
    <div className="header_wrapper">
      <header
        style={{
          background: `${homeSetting?.background_color}`,
          // background: "rgb(245,145,178)",
          // background:
          //   "linear-gradient(90deg, rgba(245,145,178,1) 0%, rgba(240,91,140,1) 50%, rgba(236,56,115,1) 100%)",
          background:
            HomeBGColor != null && HomeBGColor != ""
              ? `linear-gradient(90deg, ${HomeBGColor}A0 0%, ${HomeBGColor}D0 50%, ${HomeBGColor} 100%)`
              : defaultHomeBGColor,
          // overflow: "hidden",
          position: "relative",
        }}
      >
        <div>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Navbar />
              <HeaderContent />
            </Grid>
          </Grid>
        </div>
        <div className="custom-shape-divider-bottom-1642677988">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </header>
    </div>
  );
};

export default header;
