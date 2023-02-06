/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import logo from "../../assets/logo.webp";
import Skeleton from '@mui/material/Skeleton';

const ProductCardSkeleton = () => {

  return (
    <div id="product_card">
      <div>
        <Skeleton
          animation="wave"
          id="product_card"
          variant="rectangular"
          style={{
            padding: "45px 5px",
            width: "100%",
            minHeight: '363px',
            maxHeight: '363px',
            background: "#e8e8e8",
            marginRight: '2px',
            borderRadius: 20,
            marginTop: 20,
          }}
        />
        <div style={{ display: "flex", height: '75px', maxHeight: '75px' }}>
          <div style={{ width: "65%" }}>
            <h1 id="product_name">
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "auto",
              marginTop: 14,
              paddingLeft: 5,
            }}
          >
            <h1
              id="product_price"
              style={{ width: "100%", marginLeft: "auto" }}
            >
              <Skeleton animation="wave" variant="text" />
            </h1>
          </div>
        </div>
      </div>
      <div className="prod_cart_option d-flex justify-content-between">
          <Skeleton animation="wave" className="buttons_opt_skeleton" variant="rectangular" width={100} height={30} />
        <div className="cart_btn_div">
          <Skeleton animation="wave" className="cart_btn_skeleton" variant="rectangular" width={100} height={30} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
