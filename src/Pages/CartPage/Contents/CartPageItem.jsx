/* eslint-disable no-unused-vars */
import "./CartPageItem.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation, } from "react-i18next";
import logo from "../../../assets/logo.webp";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  removeItemFromCart,
} from "../../../redux/CartPage/myCartAction";
import SweetAlert from "sweetalert2";
import { SIMPLE_URL } from "../../../env";

const CartPageItem = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { product } = props;

  const dispatch = useDispatch();

  const decreaseQty = (id) => {
    if (product.quantity > 1) {
      let formData = {
        id: id,
        quantity: product.quantity - 1,
        price: product.product_detail
          ? product.product_detail.price_euro
          : product.price,
      };
      dispatch(decrementItemQuantity(formData));
    } else {
      triggerRemove(id);
    }
  };

  const increaseQty = (id) => {
    if (product.quantity > 0) {
      let formData = {
        id: id,
        quantity: product.quantity + 1,
        incremented_quantity: 1,
        price: product.product_detail
          ? product.product_detail.price_euro
          : product.price,
      };
      dispatch(incrementItemQuantity(formData));
    }
  };

  const triggerRemove = (id) => {
    if (product.quantity > 0) {
      SweetAlert.fire({
        title: trans("Are you sure ?"),
        text: trans("Do you want to remove the Item from Cart?"),
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: trans("Cancel"),
        confirmButtonText: trans("Delete"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          dispatch(removeItemFromCart(id));

          toast.success(trans("Item Deleted"), {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
    }
  };

  return (
    <div className="cartpage_cart_data cartpage_cart_body">
      <div className="product_item">
        <div className="product_img_name">
          {product.product_detail && (
            <div className="product_image_wrapper">
              <img
                className="product_image"
                src={
                  product.product_detail?.image == "undefined" ||
                    product.product_detail?.image == null
                    ? logo
                    : `${SIMPLE_URL}/images/Product/${product.product_detail?.image}`
                }
                alt={``}
              />
            </div>
          )}
          {product.image && (
            <>
              <div
                className="product_image_wrapper"
                style={{ position: "relative" }}
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
                    className="cart_glaze_layer"
                    src={product.glaze[0].image}
                    alt=""
                  />
                )}
                {product.sauce?.length > 0 && (
                  <img
                    className="cart_topping_layer"
                    src={product.sauce[0].image}
                    alt=""
                  />
                )}
                {product.topping?.length > 0 &&
                  product.topping.map((top, i) => {
                    if (i == 0) {
                      return (
                        <img
                          className="cart_topping_layer"
                          src={top.image1}
                          alt=""
                        />
                      );
                    }
                    if (i == 1) {
                      return (
                        <img
                          className="cart_topping_layer"
                          src={top.image2}
                          alt=""
                        />
                      );
                    }
                    if (i == 2) {
                      return (
                        <img
                          className="cart_topping_layer"
                          src={top.image3}
                          alt=""
                        />
                      );
                    }
                  })}
                {product.filling?.length > 0 && (
                  <img
                    className="cart_topping_layer"
                    src={product.filling[0].image}
                    alt=""
                  />
                )}
              </div>
            </>
          )}
          <div className="cart_page_item_detail_box_wrapper">
            <div className="cart_page_item_detail_box">
              {product.donutType ? (
                <>
                  <p className="cartpage_item_name mb-0">
                    {product.product_detail
                      ? product.product_detail.name_fr
                      : product.donutType == "Customized donut" &&
                      trans("Customized donut")}
                  </p>
                  <p className="mb-0">
                    <b>{trans(`Ingredients`)}: </b>
                  </p>
                  <div className="d-flex_ Ingredients_div">
                    <span className="cart_page_topping">
                      {product.glaze.length > 0 && product.glaze[0].name}
                      {product.topping.length > 0 && `,`}
                    </span>
                    {product.topping.length > 0 &&
                      product.topping.map((top) => {
                        return (
                          <span className="cart_page_topping">
                            {top.name}
                            {product.sauce.length > 0 && `,`}
                          </span>
                        );
                      })}
                    <span className="cart_page_topping">
                      {product.sauce.length > 0 && product.sauce[0].name}
                      {product.filling.length > 0 && `,`}
                    </span>
                    <span className="cart_page_topping">
                      {product.filling.length > 0 && product.filling[0].name}
                    </span>
                  </div>
                </>
              ) : (
                <p className="cartpage_item_name mb-0 12">
                  {product.product_detail
                    ? product.product_detail.name_fr
                    : product.donutType == "Customized donut" &&
                    trans("Customized donut")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="item_price">
        <p className="cartpage_item_price mb-auto">
          {product.product_detail
            ? product.product_detail.price_euro.toString().split(".").length > 1
              ? product.product_detail.price_euro.toString().split(".")[0] +
              trans("dot") +
              product.product_detail.price_euro.toString().split(".")[1]
              : product.product_detail.price_euro.toString().split(".")[0]
            : product.price.toString().split(".")?.length > 1
              ? product.price.toString().split(".")[0] +
              trans("dot") +
              product.price.toString().split(".")[1]
              : product.price.toString().split(".")[0]}
        </p>
      </div>
      <div className="quantity">
        <div className="inner">
          <div className="cart_item_qty_change">
            <RemoveCircleOutlineIcon
              className="m_btn"
              onClick={() =>
                decreaseQty(
                  product.product_detail
                    ? product.product_detail.id
                    : product.id
                )
              }
            />
            <span className="cart_item_num">{product.quantity}</span>
            <AddCircleOutlineIcon
              className="m_btn"
              onClick={() =>
                increaseQty(
                  product.product_detail
                    ? product.product_detail.id
                    : product.id
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="subtotal">
        {" "}
        <p className="cartpage_item_total_price mb-0">
          {product.itemQtyTotal.toString().split(".").length > 1
            ? product.itemQtyTotal.toString().split(".")[0] +
            trans("dot") +
            product.itemQtyTotal.toString().split(".")[1]
            : product.itemQtyTotal.toString().split(".")[0]}
        </p>
      </div>
      <div className="delete">
        <button
          className="cartpage_item_remove_btn"
          onClick={() =>
            triggerRemove(
              product.product_detail ? product.product_detail.id : product.id
            )
          }
        >
          <HighlightOffIcon className="ico" />
        </button>
      </div>
    </div>
  );
};

export default CartPageItem;
