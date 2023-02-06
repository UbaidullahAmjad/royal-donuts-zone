/* eslint-disable no-unused-vars */
import React, { createContext, useRef, useState } from "react";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Card, CardContent, Grid, TextField, Container } from "@mui/material";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
// import { ArrowForward, ArrowBack } from "@material-ui/icons";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import { useTranslation, } from "react-i18next";
import getWindowDimensions from "../../Components/Hooks/useWindowDimensions";

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 3,
  rows: 2,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const pink = {
  500: "#F36292",
  600: "#C25C7C",
  700: "#C25C7C",
};

const CustomButtonRoot = styled("button")`
  font-family: JellyDonuts;
  font-size: 16px;
  margin-top: 3%;
  /* font-size: 32px; */
  font-weight: bold;
  background-color: ${pink[500]};
  padding: 4px 20px;
  border-radius: 25px;
  margin-right: 10px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${pink[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${pink[700]};
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

export const RelatedProductList = createContext();

const RelatedProducts = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { screenWidth } = getWindowDimensions();
  const { related_products, setValue } = props;

  const [RelatedProductValue, setRelatedProductValue] = useState(true);

  const ToggleRelatedProductValue = () => {
    setRelatedProductValue(!RelatedProductValue);
  };

  const slider = useRef(null);

  return (
    <>
      <div>
        <h1 id="product_title">{trans("Related Products")}</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      ></div>
      <Row style={{ justifyContent: "center", marginTop: 20 }}>
        {screenWidth > 767 && related_products && related_products.length > 8 && (
          <Col
            sm={1}
            md={1}
            xs={1}
            style={{
              padding: 0,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "-2%",
            }}
          >
            <ArrowBack
              style={{ marginTop: "15%", color: "#f73164", cursor: "pointer" }}
              onClick={() => slider.current.slickPrev()}
            />
          </Col>
        )}

        <Col sm={12} md={12} xs={12}>
          <Slider ref={slider} {...settings}>
            {related_products.map(
              (item, index) =>
                item.id != props?.ProductDescription.id && (
                  <RelatedProductList.Provider
                    value={{ RelatedProductValue, ToggleRelatedProductValue }}
                  >
                    <ProductCard
                      key={index + item.id}
                      product={item}
                      CustomizedButton={CustomButton}
                      setValue={setValue}
                      setOpenItemAddedAlert={props.setOpenItemAddedAlert}
                    />
                  </RelatedProductList.Provider>
                )
            )}
          </Slider>
        </Col>
        {screenWidth > 767 && related_products && related_products.length > 8 && (
          <Col
            sm={1}
            md={1}
            xs={1}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "-2%",
              padding: 0,
            }}
          >
            <ArrowForward
              style={{ marginTop: "15%", color: "#f73164", cursor: "pointer" }}
              onClick={() => slider.current.slickNext()}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

export default RelatedProducts;
