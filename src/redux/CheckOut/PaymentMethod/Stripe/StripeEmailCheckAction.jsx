/* eslint-disable no-unused-vars */
import { STRIPE_EMAIL_CHECK, STRIPE_EMAIL_CHECK_CLEAR } from "../../../types";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../../../env"

export const StripeEmailCheckAction = async (email_ckeck) => {
    let stripeEmailCheckResponse = null;
    try{

     stripeEmailCheckResponse = await axios.post(`${URL}/check_email`, {
        email: email_ckeck,
    });
    }
    catch(error){
        stripeEmailCheckResponse = error.response;
    }

    return stripeEmailCheckResponse;
};


export const ClearStripeEmailCheckAction = () => {
    return (dispatch) => {
        dispatch({ type: STRIPE_EMAIL_CHECK_CLEAR, });
    };
};


