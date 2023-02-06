/* eslint-disable no-lone-blocks */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from "react";
import "./ProductCard.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/CartPage/myCartAction";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import logo from "../../assets/logo.webp";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  removeItemFromCart,
} from "../../redux/CartPage/myCartAction";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ImageCardContent from "./ImageCardContent/ImageCardContent";
import { HomeProductList } from "../../Pages/HomePage/Contents/Products/products";
import { ProductList } from "../../Pages/ProductList/main";
import { RelatedProductList } from "../../Pages/ProductDetail/RelatedProducts";
import { ShoppingBasket } from "@material-ui/icons";
import { SIMPLE_URL } from "../../env";

// const urlb = "https://mughees-ecommerce.royaldonuts.xyz/public";
const URL_ProductImage = `${SIMPLE_URL}/images/Product`;

const ProductCard = (props) => {
  const { t } = useTranslation();
const trans = t;

  const { product, setValue } = props;
  const product_id = props.product.id ? props.product.id : 0;
  const product_detail = props.product ? props.product : null;
  const [formData, setFormData] = useState(null);

  const disptach = useDispatch();

  let cartItemQuantity = useSelector(
    (state) =>
      state.myProductsCart.cartItems.filter((cart) => cart.id == product_id)[0]
        ?.quantity
  );
  const [cartItem, setCartItem] = useState(1);

  useEffect(() => {
    setFormData({
      id: product_id,
      quantity: cartItem,
      price: product_detail.price_euro,
      product_detail: product_detail,
    });
  }, [cartItem]);

  const navigate = useNavigate();

  const Msg = () => {
    const handleClick = () => {
      navigate("/cart");
    };
    return (
      <div className="d-flex justify-content-between">
        {trans("Item added to cart")}
        <ShoppingBasket
          style={{ color: "#ff6295", marginRight: "30px", cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
    );
  };

  const setCartItemIncrement = () => {
    if (cartItem < 999) {
      setCartItem(cartItem + 1);
    }
    if (cartItem >= 999) {
      toast.warn(trans("Please add items to cart first"));
    }
  };

  const addedState = () => {
    if (cartItemQuantity == undefined) {
      if (cartItem > 0) {
        if (formData != null) {
          disptach(addItemToCart(formData));
        } else {
          const data = {
            id: product_id,
            quantity: cartItem,
            price: product_detail.price_euro,
            product_detail: product_detail,
          };
          disptach(addItemToCart(data));
        }

        {
          (props?.page == "ProductList" || props?.page == "Homepage") &&
            toast.success(<Msg />, {
              position: "top-right",
              autoClose: 10000,
            });
        }
        props?.setOpenItemAddedAlert != false &&
          props?.setOpenItemAddedAlert(true);

        setFormData(null);
        // setCartItem(0);
      } else if (cartItem == 0) {
        toast.warn(trans("select atleast 1 item"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      if (cartItem > 0) {
        incrementQuantity();
      } else if (cartItem == 0) {
        toast.warn(trans("select atleast 1 item"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const decrementQuantity = () => {
    if (cartItemQuantity != undefined) {
      if (cartItemQuantity > 1) {
        disptach(
          decrementItemQuantity({
            id: product_id,
            quantity: cartItemQuantity - 1,
            price: product_detail.price_euro,
          })
        );
      } else {
        disptach(removeItemFromCart(product_id));
        toast.success(trans("Item Deleted"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      cartItem > 0 && setCartItem(cartItem - 1);
    }
  };

  const incrementQuantity = () => {
    if (cartItemQuantity != undefined) {
      if (cartItemQuantity > 0) {
        disptach(
          incrementItemQuantity({
            id: product_id,
            quantity: cartItemQuantity + cartItem,
            incremented_quantity: cartItem,
            price: product_detail.price_euro,
          })
        );
      }
      props?.setOpenItemAddedAlert != false &&
        props?.setOpenItemAddedAlert(true);
      {
        (props?.page == "ProductList" || props?.page == "Homepage") &&
          toast.success(<Msg />, {
            position: "top-right",
            autoClose: 10000,
          });
      }
    } else {
      setCartItem(cartItem + 1);
    }
  };

  const [prodName, setProdName] = useState(props.product.name_fr);
  const productNameTransform = (str) => {
    str = str.replace(/\s+/g, "-").toLowerCase();
    return str;
  };

  const HomeProductListPage = useContext(HomeProductList);
  const ProductListPage = useContext(ProductList);

  const RelatedProductListPage = useContext(RelatedProductList);

  useEffect(() => {
    if (ProductListPage == true) {
      HomeProductListPage.ToggleHomeProductPage;
    }
    if (HomeProductListPage == true) {
      ProductListPage.ToggleProductListPage;
    }
  }, [ProductListPage, HomeProductListPage]);

  return (
    <div className="product_card_box" id="product_card">
      {props.product.isSpecial == 1 && (
        <button
          id="product_tag"
          onClick={() =>
            navigate("/produit/" + props.product.slug, {
              state: { id: props.product.id, slug: props.product.slug },
            })
          }
        >
          <span className="m-1">{trans("Special")}</span>
        </button>
      )}
      <div style={{ height: 35 }} />
      <div
        style={
          HomeProductListPage?.HomeProductPage == false ||
            ProductListPage?.ProductListState == true ||
            RelatedProductList?.RelatedProductValue
            ? { backgroundColor: "white", marginBottom: 10 }
            : {}
        }
      >
        <Link
          to={"/produit/" + props.product.slug}
          style={{ textDecoration: "none", color: "#000" }}
          state={{ id: props.product.id, slug: props.product.slug }}
          onClick={() => setValue && setValue(1)}
        >
          <ImageCardContent product={props.product}></ImageCardContent>
        </Link>
        <div
          style={{
            display: "flex",
            height: "75px",
            maxHeight: "75px",
            padding: "0px 5px",
          }}
        >
          <div style={{ width: "65%" }}>
            <h1 id="product_name">{props.product.name_fr}</h1>
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
              €{" "}
              {props.product.price_euro.toString().split(".").length > 1
                ? props.product.price_euro.toString().split(".")[0] +
                trans("dot") +
                props.product.price_euro.toString().split(".")[1]
                : props.product.price_euro.toString().split(".")[0]}
            </h1>
          </div>
          {/* {Array.from({ length: 5 }, (i) => (
              <img src="/images/product_star.webp" height={15} key={i} />
            ))} */}
        </div>
        <div className="prod_cart_option d-flex justify-content-between mb-3 pb-2">
          <div className="buttons_opt">
            <RemoveCircleOutlineIcon
              className="m_btn"
              onClick={() => cartItem > 0 && setCartItem(cartItem - 1)}
            // onClick={decrementQuantity}
            />
            {/* <span className="cart_item">{cartItem}</span> */}
            <span className="cart_item">
              {cartItem}
            </span>
            <AddCircleOutlineIcon
              className="m_btn"
              onClick={() => setCartItem(cartItem + 1)}
            // onClick={incrementQuantity}
            />
          </div>
          <div className="cart_btn_div">
            <span className={"btn cart_btn"} onClick={() => addedState()}>
              {" "}
              {trans("Add To Cart")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
