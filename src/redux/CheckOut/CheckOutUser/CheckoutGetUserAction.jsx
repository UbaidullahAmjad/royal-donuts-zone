/* eslint-disable no-unused-vars */
import { CHECKOUT_GET_USER_DATA, CHECKOUT_GET_USER_DATA_CLEAR } from "../../types";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../../env"

var CryptoJS = require("crypto-js");

export const CheckoutGetUserDataAction = (original_id) => {
    return async (dispatch) => {

        var checkoutUserData = localStorage.getItem("user_temp") ? localStorage.getItem("user_temp") : "";
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.post(`${URL}/getuser`, {
            id: parseInt(original_id != null && original_id),
        }).then((response) => {
            const user_data = response.data.data;
            const encrypted_user_data = CryptoJS.AES.encrypt(JSON.stringify(user_data), "_userInfo_").toString()

            isError = false;
            dispatch({
                type: CHECKOUT_GET_USER_DATA,
                payload: {
                    checkoutUserData: encrypted_user_data,
                    loading,
                    isError,
                    errorMessage
                }
            });
        }).catch((error) => {
            toast.error("Failed to get data");
            errorMessage = error.response;
            dispatch({
                type: CHECKOUT_GET_USER_DATA,
                payload: {
                    checkoutUserData,
                    loading,
                    isError,
                    errorMessage,
                    error: error,
                }
            });
        });
    };
};

export const ClearCheckoutGetUserDataAction = () => {
    return (dispatch) => {
        dispatch({ type: CHECKOUT_GET_USER_DATA_CLEAR, });
    };
};


