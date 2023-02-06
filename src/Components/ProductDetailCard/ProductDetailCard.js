/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/first */
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";
import { useTranslation, } from "react-i18next";



import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import axios from "axios";
import { SIMPLE_URL } from "../../env";

// const urlb = "https://mughees-ecommerce.royaldonuts.xyz/public";
const URL_ProductImage = `${SIMPLE_URL}/images/Product`;

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
  padding: 4px 30px;
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

const ProductListCard = (props) => {
  const { t } = useTranslation();
  const trans = t;

  return (
    <div id="product_card1">
      <a href={`${props.product.id}`} style={{ textDecoration: "none" }}>
        {props.CustomizedButton ? (
          <props.CustomizedButton id="product_tag">
            {trans("New")}
          </props.CustomizedButton>
        ) : (
          ""
        )}
        <Card
          style={{
            padding: "45px 5px",
            width: "100%",
            background: "#e8e8e8",
            borderRadius: 20,
            marginTop: 20,
          }}
        >
          <CardContent>
            <div>
              <img
                src={SIMPLE_URL + "/images/Product/" + props.product.image}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
          </CardContent>
        </Card>
        <div>
          <h1 id="product_name" style={{ color: "#000" }}>
            {props.product.name_fr}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 7,
          }}
        >
          <h1 id="product_price">
            €{" "}
            {props.product.price_euro.toString().split(".").length > 1
              ? props.product.price_euro.toString().split(".")[0] +
              trans("dot") +
              props.product.price_euro.toString().split(".")[1]
              : props.product.price_euro.toString().split(".")[0]}
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 5,
              marginLeft: 20,
            }}
          >
            {/* {Array.from({ length: 5 }, (i) => (
              <img src="/images/product_star.webp" height={15} key={i} />
            ))} */}
          </div>
        </div>
        <div>
          <CustomButton>{trans("Order Now")}</CustomButton>
        </div>
      </a>
    </div>
  );
};

export default ProductListCard;
