/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import "./products.css";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import axios from "axios";
import Slider from "react-slick";
import { Container } from "@mui/material";
// import { ArrowForward, ArrowBack } from "@material-ui/icons";
import ArrowBack from "@mui/icons-material/ArrowBackIos";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../../../../Components/ProductCard/ProductCard";
import ProductCardSkeleton from "../../../../Components/ProductCard/ProductCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import getWindowDimensions from "../../../../Components/Hooks/useWindowDimensions";
import { URL } from "../../../../env";
import { SpecialProductsAction } from "../../../../redux/HomePage/Products/SpecialProductsAction"

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 3,
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

export const HomeProductList = createContext();

const products = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { screenWidth } = getWindowDimensions();
  const dispatch = useDispatch();
  const slider = useRef(null);
  const ListSpecialProducts = useSelector((state) => state.getSpecialProducts?.specialProductsList ?? []);
  const ListSpecialProductsSkeleton = [1, 2, 3];

  const [HomeProductPage, setHomeProductPage] = useState(true);

  const urlb = "https://mughees-ecommerce.royaldonuts.xyz/public";

  useEffect(() => {
    if (ListSpecialProducts.length == 0) {
      dispatch(SpecialProductsAction())
    }
  }, []);

  const ToggleHomeProductPage = () => {
    setHomeProductPage(false);
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <img src="/images/product_left_design.webp" height={20} />
        <h1 id="trending_title">{trans("Our Tendencies")}</h1>
        <img src="/images/product_right_design.webp" height={20} />
      </div>
      <div>
        <h1 id="product_title">{trans("Products")}</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
      </div>
      <Container>
        <Row
          style={{ justifyContent: "center", marginTop: 20 }}
          id="product_row"
        >
          {screenWidth > 767 && (
            <Col
              sm={1}
              md={1}
              xs={1}
              style={{
                padding: 0,
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginTop: "-12%",
              }}
            >
              <ArrowBack
                style={{
                  marginTop: "15%",
                  color: "#f73164",
                  cursor: "pointer",
                }}
                onClick={() => slider.current.slickPrev()}
              />
            </Col>
          )}
          <Col sm={12} md={10} xs={12}>
            <div id="product_homepage">
              <Slider ref={slider} {...settings}>
                {ListSpecialProducts && ListSpecialProducts.length > 0
                  ? ListSpecialProducts.map((item, index) => (
                    <div key={index + 1}>
                      <HomeProductList.Provider
                        value={{ HomeProductPage, ToggleHomeProductPage }}
                      >
                        <div key={index + 1}>
                          <ProductCard
                            key={index + item.id}
                            product={item}
                            CustomizedButton={CustomButton}
                            page={"Homepage"}
                            setOpenItemAddedAlert={false}
                          />
                        </div>
                      </HomeProductList.Provider>
                    </div>
                  ))
                  : ListSpecialProductsSkeleton.map((num, index) => (
                    <div key={index + 1}>
                      <div key={index + 1}>
                        <ProductCardSkeleton />
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </Col>
          {screenWidth > 767 && (
            <Col
              sm={1}
              md={1}
              xs={1}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "-12%",
                padding: 0,
              }}
            >
              <ArrowForward
                style={{
                  marginTop: "15%",
                  color: "#f73164",
                  cursor: "pointer",
                }}
                onClick={() => slider.current.slickNext()}
              />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default products;
