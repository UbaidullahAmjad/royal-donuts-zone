/* eslint-disable no-unused-vars */
import { STRIPE_EMAIL_CHECK, STRIPE_EMAIL_CHECK_CLEAR } from "../../../types";

const initialState = {
    stripeEmailCheckResponse: null,
};

const StripeEmailCheckReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case STRIPE_EMAIL_CHECK: {
            return {
                ...state,
                stripeEmailCheckResponse: payload.stripeEmailCheckResponse,
            }
        }
        case STRIPE_EMAIL_CHECK_CLEAR:
            return initialState
        default:
            return state;
    }
};

export default StripeEmailCheckReducer;
