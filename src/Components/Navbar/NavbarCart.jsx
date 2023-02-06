/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useTranslation, } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.webp";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { removeItemFromCart } from "../../redux/CartPage/myCartAction";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NavbarCartBox = styled("div")`
  background-color: #ffffff;
  position: absolute;
  width: 400px;
  top: 45px;
  left: 0;
  transform: translateX(-86%);
  padding: 1rem 0.75rem;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  border: 1px solid #00000010;
  cursor: default !important;
  z-index: 99999;
  opacity: ${(props) => props.opacity};
  transition: all 1.25s ease-in-out;

  & > strong {
    color: red;
  }
  & > p {
    font-family: Poppins;
    font-size: 15px;
  }
  & > .nav_sub_total {
    display: flex;
    justify-content: space-between;
    padding: 15px 4px;
  }
  & > .nav_sub_total p {
    margin-bottom: 0px;
    color: #000000;
    font-family: Poppins;
  }
  & > .nav_sub_total p:nth-child(1) {
    font-size: 15px;
    font-weight: 600;
  }
  & > .nav_sub_total p:nth-child(2) {
    font-size: 17px;
    font-weight: 700;
  }
  & > .navcart_buttons_wrapper {
    padding: 0px 4px;
    display: flex;
    justify-content: space-between;
  }
  & > .navcart_buttons_wrapper button {
    border-radius: 30px;
    font-family: JellyDonuts;
    border: none;
    box-shadow: none;
    outline-color: none;
    padding-top: -4px;
    font-size: 12px;
    padding-left: 6px !important;
    padding-right: 6px !important;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  & > .navcart_buttons_wrapper button:first-child {
    margin-right: 3px;
  }
  & > .navcart_buttons_wrapper button:last-child {
    margin-left: 3px;
  }
  @media (max-width: 991.98px) {
    /* transform: translateX(-45%); */
    transform: translateX(-85%);
    top: 40px;
  }
  @media (max-width: 800px) {
    top: auto;
    bottom: 66px;
    transform: translateX(-82%);
  }
  @media (max-width: 444px) {
    width: 300px;
    transform: translateX(-78%);
    & > .navcart_buttons_wrapper button {
      line-height: 1.6 !important;
      font-size: 14px !important;
      margin-left: 2px;
      margin-right: 2px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
  @media (max-width: 325px) {
    width: 270px;
    transform: translateX(-78%);
  }

  @media (max-width: 290px) {
    width: 260px;
    transform: translateX(-75%);
  }
`;

const NavbarCartItemWrapper = styled("div")`
  width: 100%;
  max-height: ${(props) => (props.productLength > 3 ? "250px" : "auto")};
  overflow-y: ${(props) => (props.productLength > 3 ? "scroll" : "initial")};
  ::-webkit-scrollbar {
    width: 5px !important;
    height: 3px;
  }
`;

const NavbarCartItem = styled("div")`
  border-bottom: 1px solid rgb(255, 98, 149);
  padding: 8px 0px;
  display: flex;
  width: 100%;
  align-items: center;

  & > .cart_detail_wrapper {
    width: 100%;
    font-family: Poppins;
    font-size: 14px;
    display: flex;
    align-items: center;
    position: relative;
  }
  & > .cart_detail_wrapper img {
    width: 60px;
    height: 60px;
  }
  & > .cart_detail_wrapper .cart_detail {
    padding-left: 6px;
    padding-right: 8px;
  }
  & > .cart_detail_wrapper .cart_detail h6:nth-child(1) {
    color: rgb(255, 98, 149);
    font-size: 14px;
    font-family: "Poppins-Bold";
    margin-right: 15px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  & > .cart_detail_wrapper .cart_detail h6:nth-child(2) {
    color: #000000;
    font-family: "Poppins";
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 0;
  }
  & > .cart_detail_wrapper .item_cancel_btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px !important;
    color: rgb(255, 98, 149) !important;
    cursor: pointer;
    z-index: 999999 !important;
  }
`;

//Small Mobile Device = 576;

const NavbarCart = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { screenWidth, deviceType, productLength, opacity } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let products = useSelector((state) => state?.myProductsCart?.cartItems);
  const [grandTotal, setGrandTotal] = useState(0);

  const triggerRemove = (id) => {
    dispatch(removeItemFromCart(id));

  };

  useEffect(() => {
    let totalPerItem = [];
    let totalSumPrice = 0;
    products.length > 0
      ? products.map((item) => {
        totalSumPrice = item.quantity * item.price + totalSumPrice;
      })
      : (totalSumPrice = 0);
    setGrandTotal(totalSumPrice.toFixed(2));
  }, [products]);

  return productLength > 0 ? (
    <NavbarCartBox
      opacity={opacity ? opacity : 0}
      screenWidth={screenWidth}
      deviceType={deviceType}
    >
      <NavbarCartItemWrapper productLength={productLength}>
        {products.map((product) => {
          return (
            <NavbarCartItem>
              <div className="cart_detail_wrapper">
                {product.product_detail?.image == "undefined" ||
                  product.product_detail?.image == null ? (
                  <div
                    className="product_image_wrapper"
                    style={{ position: "relative", width: 60 }}
                  >
                    <img
                      className="product_image"
                      src={
                        product.image == "undefined" || product.image == null
                          ? logo
                          : product.image
                      }
                      alt={`insta_1.png`}
                    />
                    {product.glaze?.length > 0 && (
                      <img
                        className="glaze_layer"
                        src={product.glaze[0].image}
                        alt=""
                      />
                    )}
                    {product.sauce?.length > 0 && (
                      <img
                        className="topping_layer"
                        src={product.sauce[0].image}
                        alt=""
                      />
                    )}
                    {product.topping?.length > 0 &&
                      product.topping.map((top, i) => {
                        if (i == 0) {
                          return (
                            <img
                              className="topping_layer"
                              src={top.image1}
                              alt=""
                            />
                          );
                        }
                        if (i == 1) {
                          return (
                            <img
                              className="topping_layer"
                              src={top.image2}
                              alt=""
                            />
                          );
                        }
                        if (i == 2) {
                          return (
                            <img
                              className="topping_layer"
                              src={top.image3}
                              alt=""
                            />
                          );
                        }
                      })}
                    {product.filling?.length > 0 && (
                      <img
                        className="topping_layer"
                        src={product.filling[0].image}
                        alt=""
                      />
                    )}
                  </div>
                ) : (
                  <img
                    className="product_image"
                    src={`https://ecco.royaldonuts.xyz/images/Product/${product.product_detail?.image}`}
                    alt={``}
                  />
                )}
                <div className="cart_detail">
                  <h6>
                    {product.product_detail != undefined
                      ? product.product_detail?.name_fr
                      : product.donutType == "Customized donut" &&
                      trans("Customized donut")}
                  </h6>
                  <h6>
                    {product.quantity}
                    {" x €"}
                    {product.product_detail
                      ? product.product_detail.price_euro.toString().split(".")
                        .length > 1
                        ? product.product_detail.price_euro
                          .toString()
                          .split(".")[0] +
                        trans("dot") +
                        product.product_detail.price_euro
                          .toString()
                          .split(".")[1]
                        : product.product_detail.price_euro
                          .toString()
                          .split(".")[0]
                      : product.price.toString().split(".")?.length > 1
                        ? product.price.toString().split(".")[0] +
                        trans("dot") +
                        product.price.toString().split(".")[1]
                        : product.price.toString().split(".")[0]}
                  </h6>
                </div>
                <CancelIcon
                  className="item_cancel_btn"
                  onClick={() =>
                    triggerRemove(
                      product.product_detail
                        ? product.product_detail.id
                        : product.id
                    )
                  }
                />
              </div>
            </NavbarCartItem>
          );
        })}
      </NavbarCartItemWrapper>
      <div className="nav_sub_total">
        <p>{trans("Subtotal")}:</p>
        <p>
          €
          {grandTotal.toString().split(".").length > 1
            ? grandTotal.toString().split(".")[0] +
            trans("dot") +
            grandTotal.toString().split(".")[1]
            : grandTotal.toString().split(".")[0]}
        </p>
      </div>
      <div className="navcart_buttons_wrapper">
        <Button
          onClick={() =>
            navigate(`${process.env.PUBLIC_URL}/produits`, {
              state: { navCartClicked: true },
            })
          }
          style={{ padding: screenWidth < 450 ? "6px" : "0px" }}
        >
          {screenWidth < 450 ? (
            <ArrowBackIcon style={{ fontSize: 30 }} />
          ) : (
            trans("Continue Shopping")
          )}
        </Button>
        <Button
          onClick={() =>
            navigate(`${process.env.PUBLIC_URL}/cart`, {
              state: { navCartClicked: true },
            })
          }
          style={{ padding: screenWidth < 450 ? "6px" : "" }}
        >
          {screenWidth < 450 ? (
            <ShoppingCartCheckoutIcon style={{ fontSize: 30 }} />
          ) : (
            trans("View Shopping Cart")
          )}
        </Button>
      </div>
    </NavbarCartBox>
  ) : (
    <NavbarCartBox
      opacity={opacity ? opacity : 0}
      screenWidth={screenWidth}
      deviceType={deviceType}
    >
      <p>{trans("No products are available in your shopping cart")}.</p>
      <div className="navcart_buttons_wrapper">
        <span></span>
        <Button onClick={() => navigate(`${process.env.PUBLIC_URL}/produits`)}>
          {trans("Shop Now")}
        </Button>
      </div>
    </NavbarCartBox>
  );
};

export default NavbarCart;
