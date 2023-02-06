/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./footer.css";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import logo from "../../assets/logo.webp";
import footer_top_slide from "../../assets/footer_top_slide.webp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useSelector } from "react-redux";
import { URL } from "../../env";

const blue = {
  500: "#fff",
  600: "#a9a9a9",
  700: "#a9a9a9",
};

const CustomButtonRoot = styled("button")`
  font-family: JellyDonuts;
  font-size: 16px;
  font-weight: bold;
  background-color: ${blue[500]};
  padding: 5px 18px;
  border-radius: 25px;
  margin-right: 10px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  color: #000;
  margin-left: 13%;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }
  @media screen and (max-width: 380px) {
    font-size: 24px;
  }
  @media screen and (max-width: 340px) {
    font-size: 18px;
  }
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

const Footer = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const homeSetting = useSelector((state) => state.getSettingsData.settings);
  const navigate = useNavigate();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const id = 3;

  const [stores, setStores] = useState(null);

  let defaultHomeBGColor =
    "linear-gradient(90deg, rgba(245,145,178,1) 0%, rgba(240,91,140,1) 50%, rgba(236,56,115,1) 100%)";
  const [HomeBGColor, setHomeBGColor] = useState(defaultHomeBGColor);
  const [FooterDescription, setFooterDescription] = useState("");

  useEffect(() => {
    getHomeSettings();
    const getStores = async () => {
      const response = await axios.get(`${URL}/pages`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      });
      const data = response.data.pages;
      setStores(data);
    };
    getStores();
  }, []);

  const getHomeSettings = async () => {
    await axios
      .post(`${URL}/general_home_setting`)
      .then((response) => {
        setHomeBGColor(response.data.setting.background_color);
        setFooterDescription(response.data.setting.footer);
      })
      .catch((error) => {
        console.log("erorror", error);
      });
  };

  return (
    <div
      id="footer_main"
      className="container-fluid"
      style={{
        background: HomeBGColor,
      }}
    >
      <div className="footer-shape-divider-top">
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
      <div className="footer_main_body">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <div className="footer_about_sect">
              <img
                className="img-fluid footer_logoImage"
                src={`${process.env.PUBLIC_URL}/images/rd-logo-footer.webp`}
                alt=""
              />
              <p
                className="footer_text"
                dangerouslySetInnerHTML={{ __html: homeSetting?.footer }}
              />

              <div className="footer_social_icons">
                <a
                  target={"_blank"}
                  href={`${homeSetting?.fb_link != undefined
                    ? "//" + homeSetting?.fb_link
                    : `/`
                    }`}
                  className="icon_box"
                >
                  <FacebookIcon />
                </a>
                <a
                  target={"_blank"}
                  href={`${homeSetting?.insta_link != undefined
                    ? "//" + homeSetting?.insta_link
                    : `/`
                    }`}
                  className="icon_box"
                >
                  <InstagramIcon />
                </a>
                <a
                  target={"_blank"}
                  href={`${homeSetting?.twitter_link != undefined
                    ? "//" + homeSetting?.twitter_link
                    : `/`
                    }`}
                  className="icon_box"
                >
                  <TwitterIcon />
                </a>
                <a
                  target={"_blank"}
                  href={`${homeSetting?.linkedin_link != undefined
                    ? "//" + homeSetting?.linkedin_link
                    : `/`
                    }`}
                  x
                  className="icon_box"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-3">
            <div className="footer_pages_sect">
              <ul className="footer_list_box">
                {stores != null &&
                  stores.map((item, i) => (
                    <span key={i}>
                      {item.is_footer === 1 && (
                        <li>
                          {/* <i className="fas fa-angle-right icon"></i> */}
                          <Link
                            className="list_text"
                            to={`/pages/${item.slug}`}
                            state={{
                              page_id: item.id,
                              status: item.status,
                              is_footer: item.is_footer,
                            }}
                          >
                            {item.title_fr}
                          </Link>
                        </li>
                      )}
                    </span>
                  ))}
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-3"></div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-2">
            <div className="footer_end_sect">
              <img
                className="img-fluid footer_bottom_logo"
                src={logo}
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;