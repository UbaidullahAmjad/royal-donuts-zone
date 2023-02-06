/* eslint-disable no-unused-vars */
import "./ProdCartListItem.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  removeItemFromCart,
} from "../../../redux/CartPage/myCartAction";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/logo.webp";
import { useTranslation, } from "react-i18next";
import { SIMPLE_URL } from "../../../env";

<ToastContainer position="top-center" autoClose={3000} />;

const CartPageItem = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { product_info } = props;
  const [product, setProduct] = useState(product_info?.product_detail);
  const dispatch = useDispatch();

  const decreaseQty = (id) => {
    if (product_info.quantity > 1) {
      let formData = {
        id: id,
        quantity: product_info.quantity - 1,
        price: product_info.price,
      };
      dispatch(decrementItemQuantity(formData));
    } else {
      triggerRemove(id);
    }
  };

  const increaseQty = (id) => {
    if (product_info.quantity > 0) {
      let formData = {
        id: id,
        quantity: product_info.quantity + 1,
        incremented_quantity: 1,
        price: product_info.price,
      };
      dispatch(incrementItemQuantity(formData));
    }
  };

  const triggerRemove = (id) => {
    if (product_info.quantity > 0) {
      dispatch(removeItemFromCart(id));

      toast.success(trans("Item Deleted"), {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="prod_cartlist_item">
      <div className="prod_cartlist_item_image">
        {product_info.product_detail && (
          <img
            className="img-fluid"
            src={
              product_info.product_detail?.image == "undefined" ||
                product_info.product_detail?.image == null
                ? logo
                : `${SIMPLE_URL}/images/Product/${product_info.product_detail?.image}`
            }
            alt={`insta_1.png`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = logo;
            }}
          />
        )}
        {product_info.image && (
          <>
            <img
              className="img-fluid"
              src={
                product_info.image == "undefined" || product_info.image == null
                  ? logo
                  : product_info.image
              }
              alt={`insta_1.png`}
            />
            {product_info.glaze?.length > 0 && (
              <img
                className="img-fluid glaze_layer"
                src={product_info.glaze[0].image}
                alt={product_info.glaze[0].image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = logo;
                }}
              />
            )}
            {product_info.sauce?.length > 0 && (
              <img
                className="img-fluid topping_layer"
                src={product_info.sauce[0].image}
                alt={product_info.sauce[0].image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = logo;
                }}
              />
            )}
            {product_info.topping?.length > 0 &&
              product_info.topping.map((top, i) => {
                if (i == 0) {
                  return (
                    <img className="img-fluid topping_layer" src={top.image1} alt="" />
                  );
                }
                if (i == 1) {
                  return (
                    <img className="img-fluid topping_layer" src={top.image2} alt="" />
                  );
                }
                if (i == 2) {
                  return (
                    <img className="img-fluid topping_layer" src={top.image3} alt="" />
                  );
                }
              })}
            {product_info.filling?.length > 0 && (
              <img
                className="img-fluid topping_layer"
                src={product_info.filling[0].image}
                alt=""
              />
            )}
          </>
        )}
      </div>
      <div className="prod_cartlist_item_info d-flex align-items-start justify-content-center flex-column">
        <div
          className="d-flex align-items-center mb-2"
          style={{ width: "100%" }}
        >
          <p className="prod_cartlist_item_name mb-0 me-2">
            {product_info.product_detail
              ? product_info.product_detail.name_fr
              : product_info.donutType == "Customized donut" &&
              trans("Customized donut")}
          </p>
          <div className="prod_inner ms-auto mb-auto">
            <p className="prod_cartlist_item_total_price mb-0">
              {product_info?.itemQtyTotal.toString().split(".").length > 1
                ? product_info?.itemQtyTotal.toString().split(".")[0] +
                trans("dot") +
                product_info?.itemQtyTotal.toString().split(".")[1]
                : product_info?.itemQtyTotal.toString().split(".")[0]}
            </p>
          </div>
        </div>
        <div className="prod_item_change d-flex">
          <RemoveCircleOutlineIcon
            className="m_btn"
            onClick={() =>
              decreaseQty(
                product_info.product_detail
                  ? product_info.product_detail.id
                  : product_info.id
              )
            }
          />
          <span className="prod_item_num">{product_info?.quantity}</span>
          <AddCircleOutlineIcon
            className="m_btn"
            onClick={() =>
              increaseQty(
                product_info.product_detail
                  ? product_info.product_detail.id
                  : product_info.id
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CartPageItem;
