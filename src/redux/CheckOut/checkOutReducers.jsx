/* eslint-disable no-fallthrough */
/* eslint-disable eqeqeq */
import * as actionTypes from "../types";

const initialState = {
  cart_id: "",
  item_count: "",
  total: "",
  products: [],
  loading: false,
  coupon_code: 0,
  is_open: false,
  message: "",
  formData: {
    checked: false,
  },
  errorMessage: null,
};

const summaryData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case actionTypes.APPLY_COUPON: {
      return {
        ...state,
        discount: "",
        coupon_code: 0,
      };
    }
    case actionTypes.DISCOUNT_SET: {
      return {
        ...state,
        discount: action.data,
      };
    }
    case actionTypes.CLOSE_NOTIFICATION: {
      return {
        ...state,
        is_open: false,
      };
    }
    case actionTypes.GUEST_SUMMARY: {
      if (action.data) {
        return {
          ...state,
          products: action.data.products,
          cart_id: action.data.cart.id,
          item_count: action.data.cart.item_count,
          total: action.data.cart.total,
          formData: { ...state.formData, id: action.data.cart.id },
          totalPayPrice: action.data.cart.total,
        };
      } else if (action.error) {
        return {
          ...state,
          errorMessage: action.error,
        };
      }
    }
    case actionTypes.GET_COUPON: {
      if (action.data) {
        if (action.data.code == "1") {
          state.loading = false;
          state.coupon_code = action.data.discount;
        } else if (action.data.code == "2") {
          state.loading = false;
          state.coupon_code = 0;
        } else if (action.data.code == "3") {
          state.loading = false;
          state.coupon_code = 0;
        }

        return {
          ...state,
          is_open: true,
          message: action.data.message,
        };
      } else if (action.error) {
        return {
          ...state,
          error: action.error,
        };
      }
    }
    case actionTypes.HANDLE_VALUES: {
      return {
        ...state,
        formData: { ...state.formData, [action.name]: action.value },
      };
    }
    case actionTypes.SET_DELIVERY_METHOD: {
      return {
        ...state,
        formData: { ...state.formData, delivery_method: action.data},
      };
    }
    case actionTypes.HANDLE_CHECKED: {
      return {
        ...state,
        formData: { ...state.formData, checked: action.data },
      };
    }
    default:
      return state;
  }
};

export default summaryData;
