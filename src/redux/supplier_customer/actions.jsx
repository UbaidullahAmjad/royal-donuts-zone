import axios from "axios";
import * as actionType from "../actionTypes";

export const SupplierCustomerCartTotal = (CartData) => {
  console.log("ACTION CART DATAA ---- ", CartData);
  return {
    type: actionType.supplier_customer_cart,
    payload: { count_cart: CartData },
  };
};

export const SupplierCustomerRectifyCartTotal = (RectifyCartData) => {
  console.log("ACTION CART DATAA ---- ", RectifyCartData);
  return {
    type: actionType.supplier_customer_rectify_order,
    payload: { rectify_count: RectifyCartData },
  };
};
