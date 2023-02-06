/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./configurator.css";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { Container } from "@mui/material";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
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
  font-size: 16px;
  font-weight: bold;
  background-color: #f36292;
  padding: 7px 35px;
  border-radius: 50px;
  margin-right: 10px;
  color: white;
  -webkit-transition: all 150ms ease;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  margin-left: 6pc;

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
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

const ConfiguratorDesk = (props) => {
  const { t } = useTranslation();
  const trans = t;;

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
    <>
      <div
        style={
          LoadedImage1 === false &&
            LoadedImage2 === false &&
            LoadedImage3 === false &&
            LoadedImage4 === false &&
            LoadedImage5 === false &&
            LoadedImage6 === false
            ? { display: "none" }
            : { marginTop: "5%", background: "#f8b5cb" }
        }
      >
        <div>
          <img
            src="/images/configurator_design_5.webp"
            id="config_img"
            alt="configurator_design_5.webp"
            onLoad={() => setLoadedImage1(true)}
          />
        </div>
        <div>
          <Grid container>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <div id="config_text">
                <h1 id="config" className="mb-3">
                  {trans("Configuration")}{" "}
                </h1>
                <h1 id="config" style={{ lineHeight: "10px" }}>
                  {trans("From Donuts")}
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/design_1.webp"
                    id="config_left_side"
                    alt=""
                    onLoad={() => setLoadedImage2(true)}
                  />
                  <CustomButton id="config_btn" onClick={() => goToConfig()}>
                    {trans("Configurator")}
                  </CustomButton>
                </div>
              </div>
            </Grid>
            <Grid item xs={4} sm={4} md={4} style={{ display: "flex" }}>
              <img
                src="/images/config_1.webp"
                id="config_image1"
                alt=""
                onLoad={() => setLoadedImage3(true)}
              />
              <img
                src="/images/config_2.webp"
                id="config_image2"
                alt=""
                onLoad={() => setLoadedImage4(true)}
              />
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              style={{ position: "relative", overflow: "hidden" }}
            >
              <div>
                <img
                  src="/images/design_1.webp"
                  id="config_right_side"
                  alt=""
                  onLoad={() => setLoadedImage5(true)}
                />
                <img
                  src="/images/config_circle.webp"
                  id="config_right_side_circle"
                  alt=""
                  onLoad={() => setLoadedImage6(true)}
                />
              </div>
            </Grid>
          </Grid>
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
      {LoadedImage1 === false &&
        LoadedImage2 === false &&
        LoadedImage3 === false &&
        LoadedImage4 === false &&
        LoadedImage5 === false &&
        LoadedImage6 === false && (
          <div style={{ background: "#f8b5cb" }}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={450}
              style={{ marginTop: "5%", marginBottom: "20px" }}
            />
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
        )}
    </>
  );
};

export default ConfiguratorDesk;
