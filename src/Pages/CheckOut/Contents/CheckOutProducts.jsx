/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./CheckOutProducts.css";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  removeItemFromCart,
} from "../../../redux/CartPage/myCartAction";
import { ToastContainer, toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/logo.webp";
import { useTranslation, } from "react-i18next";
import SweetAlert from "sweetalert2";
import { SIMPLE_URL } from "../../../env";

<ToastContainer position="top-center" autoClose={3000} />;

const CheckOutProducts = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const { product, prod_id, quantity, itemQtyTotal } = props;

  const dispatch = useDispatch();

  const decreaseQty = (id) => {
    if (quantity > 1) {
      let formData = {
        id: id,
        quantity: quantity - 1,
        price: product?.price_euro,
      };
      dispatch(decrementItemQuantity(formData));
    } else {
      triggerRemove(id);
    }
  };

  const increaseQty = (id) => {
    if (quantity > 0) {
      let formData = {
        id: id,
        quantity: quantity + 1,
        incremented_quantity: product.quantity + 1,
        price: product?.price_euro,
      };
      dispatch(incrementItemQuantity(formData));
    }
  };

  const triggerRemove = (id) => {
    if (quantity > 0) {
      SweetAlert.fire({
        title: trans("Are you sure?"),
        text: trans("Do you want to remove the Item from Cart?"),
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: trans("Cancel"),
        confirmButtonText: trans("Delete"),
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          console.log("result value", id);

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
    <div className="checkout_products_item">
      <div className="checkout_products_item_image">
        <img
          className="img-fluid"
          src={
            product?.image == undefined || product?.image == null
              ? logo
              : `${SIMPLE_URL}/images/Product/${product?.image}`
          }
          alt={`${product?.image}`}
        />
      </div>
      <div className="checkout_products_item_info d-flex align-items-start flex-column">
        <p className="checkout_products_item_name mb-0">{product?.name_fr}</p>
        <p className="checkout_products_item_price mb-auto">
          {product?.price_euro}
        </p>
        <button
          className="checkout_products_item_remove_btn mt-auto_"
          onClick={() => triggerRemove(prod_id)}
        >
          <DeleteOutlineIcon className="ico" />
          <span>{trans("Remove")}</span>
        </button>
      </div>
      <div className="checkout_products_item_add ms-auto d-flex align-items-center">
        <div className="inner">
          <div className="cart_item_change">
            <RemoveCircleOutlineIcon
              className="m_btn"
              onClick={() => decreaseQty(prod_id)}
            />
            <span className="cart_item_num">{quantity}</span>
            <AddCircleOutlineIcon
              className="m_btn"
              onClick={() => increaseQty(prod_id)}
            />
          </div>
          <p className="checkout_products_item_total_price mb-0">
            {itemQtyTotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckOutProducts;
