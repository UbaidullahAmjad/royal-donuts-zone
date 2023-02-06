/* eslint-disable no-unused-vars */
import {
    STRIPE_PAYMENT_GET_DATA,
    STRIPE_PAYMENT_SAVE_DATA,
} from "../../../actionTypes";

const initialState = {
    stripePayment: null,
    stripePaymentLength: 1,
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const StripePaymentReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case STRIPE_PAYMENT_GET_DATA: {
            let stripePaymentData = "";
            if (payload.response != null) {
                stripePaymentData = payload.response.data;
                state.tempArrLength = 1;
            }
            return {
                ...state,
                stripePayment: stripePaymentData,
                stripePaymentLength: 1,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case STRIPE_PAYMENT_SAVE_DATA: {
            let newTempArrLength = state.stripePaymentLength;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                stripePayment: state.stripePayment,
                stripePaymentLength: 1,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        default: {
            return state;
        }
    }
}

export default StripePaymentReducer;