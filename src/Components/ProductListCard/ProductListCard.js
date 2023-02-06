/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const ProductListCard = (props) => {

  return (
    <div id="product_card1">
      {props.CustomizedButton ? (
        <props.CustomizedButton id="product_tag">New</props.CustomizedButton>
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
              src={props.product.image}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </div>
        </CardContent>
      </Card>
      <div>
        <h1 id="product_name">{props.product.name_fr}</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 7,
        }}
      >
        <h1 id="product_price">{props.product.price_euro} €</h1>
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
    </div>
  );
};

export default ProductListCard;
