import { CardContent, Card } from "@mui/material";
import React, { useContext, } from "react";
import "../ProductCard.css";
import { ProductList } from "../../../Pages/ProductList/main";
import { HomeProductList } from "../../../Pages/HomePage/Contents/Products/products";

import logo from "../../../assets/logo.webp";
import { RelatedProductList } from "../../../Pages/ProductDetail/RelatedProducts";
import { SIMPLE_URL } from "../../../env";

const URL_ProductImage = `${SIMPLE_URL}/images/Product`;

const ImageCardContent = (props) => {
  const product_list_page = useContext(ProductList);
  const home_product_list_page = useContext(HomeProductList);

  const related_product_list_page = useContext(RelatedProductList);

  return (
    <div className="productcart_content_wrapper">
      {(product_list_page != undefined ||
        home_product_list_page != undefined ||
        related_product_list_page != undefined) &&
        product_list_page?.ProductListState ? (
        <div className="productcart_image_card_wrapped">
          <div
            className="productcart_image_card"
            style={{
              borderRadius: 20,
              marginTop: 20,
            }}
          >
            <img
              className="productcart_image_card_image"
              src={
                props.product.image == "undefined" || props.product.image == null
                  ? logo
                  : URL_ProductImage + "/" + props.product.image
              }
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = logo;
              }}
            />
          </div>
        </div>
      ) : (
        (related_product_list_page?.RelatedProductValue ||
          home_product_list_page?.HomeProductPage) && (
          <Card
            className="productlist_card_image_wrap"
            id="product_card"
            style={{
              // padding: "45px 5px",
              // width: "100%",
              // minHeight: "363px",
              // maxHeight: "363px",
              // background: "#e8e8e8",
              // marginRight: "2px",
              borderRadius: 20,
              marginTop: 20,
            }}
          >
            <CardContent className="productlist_card_image_box">
              <img
                // src={urlb + "/images/Product/" + props.product.image}
                className="productcartlist_card_image"
                src={
                  props.product.image == "undefined" ||
                    props.product.image == null
                    ? logo
                    : URL_ProductImage + "/" + props.product.image
                }
                // style={{
                //   height: "100%",
                //   width: "100%",
                //   minHeight: "233px",
                //   maxHeight: "233px",
                //   borderRadius: "50%",
                // }}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = logo;
                }}
              />
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default ImageCardContent;
