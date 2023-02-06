import * as actionType from "../actionTypes";

const initialState = {
  cartTotal: 0,
  RectifyTotal: 0,
};

const supplier_customer_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.supplier_customer_cart: {
      //   console.log("ACTIONNNNN ---- ", action.payload);
      return {
        ...state,
        cartTotal: action.payload.count_cart,
      };
    }
    case actionType.supplier_customer_rectify_order: {
      return {
        ...state,
        RectifyTotal: action.payload.rectify_count,
      };
    }
    default: {
      return state;
    }
  }
};
export default supplier_customer_reducer;
