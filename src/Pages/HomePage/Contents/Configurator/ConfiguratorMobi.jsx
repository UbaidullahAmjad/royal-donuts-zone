/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./ConfiguratorMobi.css";
import { Container } from "@mui/material";
import "./configurator.css";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { useTranslation, } from "react-i18next";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const blue = {
  500: "#F36292",
  600: "#C25C7C",
  700: "#C25C7C",
};

const CustomButtonRoot = styled("button")`
  font-family: JellyDonuts;
  font-size: 14px;
  max-width: 230px;
  font-weight: bold;
  background-color: #f36292;
  padding: 5px 30px;
  border-radius: 50px;
  /* margin-right: 10px; */
  color: white;
  -webkit-transition: all 150ms ease;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  margin-top: 3pc;
  padding: 15px;

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
  @media (max-width: 490px) {
    font-size: 16px;
  }
  @media (max-width: 380px) {
    font-size: 15px;
  }
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

const ConfiguratorMobi = (props) => {
  const { t } = useTranslation();
  const trans = t;

  const navigate = useNavigate();
  const [LoadedImage1, setLoadedImage1] = useState(false);
  const [LoadedImage2, setLoadedImage2] = useState(false);
  const [LoadedImage3, setLoadedImage3] = useState(false);
  const [LoadedImage4, setLoadedImage4] = useState(false);
  const [LoadedImage5, setLoadedImage5] = useState(false);
  const [LoadedImage6, setLoadedImage6] = useState(false);

  const goToConfig = () => {
    navigate("/configurator");
  };

  return (
    <div className="mobi_configurator_page">
      <div className="mobi_configurator_wrapper">
        <div className="mobi_config_img_wrapper">
          <img
            src="/images/configurator_design_5.webp"
            className="mobi_config_img"
            alt="configurator_design_5.webp"
            onLoad={() => setLoadedImage1(true)}
          />
          <div className="mb_config_text_box">
            <h1 className="mb_config_title mb-3">{trans("Configuration")} </h1>
            <h1 className="mb_config_title" style={{ lineHeight: "10px" }}>
              {trans("From Donuts")}
            </h1>
          </div>
        </div>
        <div className="mobi_configurator_box">
          <div className="mobi_config_donut_image_box">
            <img
              className="mobi_config_image1"
              src="/images/config_1.webp"
              alt=""
              onLoad={() => setLoadedImage3(true)}
            />
            <img
              className="mobi_config_image2"
              src="/images/config_2.webp"
              alt=""
              onLoad={() => setLoadedImage4(true)}
            />
          </div>
          <CustomButton className="mb_config_btn" onClick={() => goToConfig()}>
            {trans("Configurator")}
          </CustomButton>
        </div>
        <div className="custom-shape-divider-top-1642772984">
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
      </div>
    </div>
  );
};

export default ConfiguratorMobi;
