/* eslint-disable no-unused-vars */
import { CHECKOUT_GET_USER_DATA, CHECKOUT_GET_USER_DATA_CLEAR } from "../../types";

const initialState = {
    checkoutUserData: localStorage.getItem("user_temp") ? localStorage.getItem("user_temp") : "",
    loading: true,
    isError: false,
    errorMessage: null
};

const CheckoutGetUserReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHECKOUT_GET_USER_DATA: {
            return {
                ...state,
                checkoutUserData: payload.checkoutUserData,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case CHECKOUT_GET_USER_DATA_CLEAR:
            return initialState
        default:
            return state;
    }
};

export default CheckoutGetUserReducer;
