/* eslint-disable no-unused-vars */
import { STRIPE_GO_TO_INVOICE, STRIPE_INVOICE_DATA_CLEAR } from "../../../types";

const initialState = {
    stripeInvoiceData: null,
    stripeAllData: null,
    isZeltyInvoice: false,
    zelty_res_data: null,
    loading: true,
    isError: false,
    errorMessage: null
};

const StripePaymentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case STRIPE_GO_TO_INVOICE: {
            return {
                ...state,
                stripeInvoiceData: payload.stripeInvoiceData,
                stripeAllData: payload.stripeAllData,
                isZeltyInvoice: payload.isZeltyInvoice,
                zelty_res_data: payload.zelty_res_data,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case STRIPE_INVOICE_DATA_CLEAR:
            return initialState
        default:
            return state;
    }
};

export default StripePaymentReducer;
