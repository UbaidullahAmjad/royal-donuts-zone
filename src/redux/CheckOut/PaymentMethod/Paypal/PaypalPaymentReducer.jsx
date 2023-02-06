/* eslint-disable no-unused-vars */
import { PAYPAL_GET_ECCOM_CART, PAYPAL_GO_TO_INVOICE, PAYPAL_INVOICE_DATA_CLEAR } from "../../../types";

const initialState = {
    eccomCartData: null,
    paypalInvoiceData: null,
    loading: true,
    isError: false,
    errorMessage: null
};

const PaypalPaymentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PAYPAL_GET_ECCOM_CART: {
            return {
                ...state,
                eccomCartData: payload.eccomCartData,
                paypalInvoiceData: state.paypalInvoiceData,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PAYPAL_GO_TO_INVOICE: {
            return {
                ...state,
                eccomCartData: state.eccomCartData,
                paypalInvoiceData: payload.paypalInvoiceData,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PAYPAL_INVOICE_DATA_CLEAR:
            return initialState
        default:
            return state;
    }
};

export default PaypalPaymentReducer;
