/* eslint-disable no-unused-vars */
import {
    PAYPAL_PAYMENT_GET_DATA,
    PAYPAL_PAYMENT_SAVE_DATA,
} from "../../../actionTypes";

const initialState = {
    paypalPayment: null,
    paypalPaymentLength: 1,
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const PaypalPaymentReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case PAYPAL_PAYMENT_GET_DATA: {
            let paypalPaymentData = "";
            if (payload.response != null) {
                paypalPaymentData = payload.response.data;
                state.tempArrLength = 1;
            }
            return {
                ...state,
                paypalPayment: paypalPaymentData,
                paypalPaymentLength: 1,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case PAYPAL_PAYMENT_SAVE_DATA: {
            let newTempArrLength = state.paypalPaymentLength;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                paypalPayment: state.paypalPayment,
                paypalPaymentLength: 1,
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

export default PaypalPaymentReducer;