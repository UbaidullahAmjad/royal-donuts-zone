/* eslint-disable no-unused-vars */
import {
  CHECKOUT_FORM_DATA,
  CHECKOUT_FORM_SUBMIT,
  CHECKOUT_FORM_PUSHED_DATA,
  CHECKOUT_FORM_SUBMIT_FORMDATA,
  CHECKOUT_FORM_USER_DATA,
  CHECKOUT_FORM_SUBMITTED_DATA,
  CHECKOUT_FORM_STORE_DATA,
  CHECKOUT_GUEST_FORM_FILLED,
  CHECKOUT_FORM_USER_DATA_CLEAR,
  CHECKOUT_FORM_DATA_CLEAR,
} from "../types";

const initialState = {
  handle_submit: null,
  user_data: null,
  store: null,
  formData: {
    // isDefaultValues: true,
    // contact: "",
    // id: null,
    // isSignup: false,
    // country: "",
    // firstName: "",
    // lastName: "",
    // email: "",
    // user_type: null,
    // address: "",
    // date: null,
    // postalCode: "",
    // city: "",
    // phone: "",
    // code: "",
    // checked: false,
    // delivery_method: "",
  },
  formDataPushed: {
    user_id: null,
    coupon_code: "empty",
    couponCodeAmount: 0,
    couponCodeSymbol: "",
    date: null,
    date_time: null,
    delivery_time: "",
    delivery_method: "",
    delivery_info: "",
    totalPayPrice: "0",
  },
  form_submitted_data: null,
};

const checkoutFormReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHECKOUT_FORM_USER_DATA:
      return {
        ...state,
        user_data: payload,
      };

    case CHECKOUT_FORM_DATA:
      // const { name, value, checked, type } = payload.target;
      const name = payload.target.name;
      const value = payload.target.value;
      const checked_target = payload.target.checked;
      const type_target = payload.target.type;
      // console.log("CHECKOUT_FORM_DATA ----- Reducer-Form: ", state.formData);
      if (type_target == "checkbox") {
        return {
          ...state,
          formData: {
            ...state.formData,
            [name]: checked_target,
          },
        };
      } else {
        return {
          ...state,
          formData: {
            ...state.formData,
            [name]: value,
          },
        };
      }
    case CHECKOUT_FORM_USER_DATA_CLEAR: return {
      ...state,
      user_data: null,
    }
    case CHECKOUT_FORM_STORE_DATA: return {
      ...state,
      store: payload ? payload : null,
    }
    case CHECKOUT_FORM_PUSHED_DATA:
      return {
        ...state,
        ...(state.formDataPushed[payload.key] = payload.value),
      };
    case CHECKOUT_FORM_SUBMIT:
      return {
        ...state,
        handle_submit: payload,
      };
    case CHECKOUT_FORM_SUBMIT_FORMDATA:
      return {
        ...state,
        formData: payload,
      };

    case CHECKOUT_FORM_SUBMITTED_DATA: {
      if (payload.type == "guest") {
        state.formDataPushed["user_id"] = null;
      }
      return {
        ...state,
        form_submitted_data: payload,
      };
    }
    case CHECKOUT_FORM_DATA_CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default checkoutFormReducer;
