/* eslint-disable no-unused-vars */
import { PAYPAL_GET_ECCOM_CART, PAYPAL_GO_TO_INVOICE, PAYPAL_INVOICE_DATA_CLEAR } from "../../../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../../env"

export const getPaypalEccomCartAction = () => {
    return async (dispatch) => {

        var eccomCartData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "get",
            url: `${URL}/eccom_cart`,
        }).then((response) => {
            const cart_items = response.data.products;
            if (cart_items) {
                eccomCartData = cart_items;
                isError = false;
                dispatch({
                    type: PAYPAL_GET_ECCOM_CART,
                    payload: {
                        eccomCartData,
                        loading,
                        isError,
                        errorMessage
                    }
                });
            } else {
                // toast.error(trans("Your Cart List is Empty !!"));
                toast.error("Your Cart List is Empty !!");
            }
        }).catch((error) => {
            // toast.error(trans("Your Cart List is Empty !!"));
            toast.error("Your Cart List is Empty !!");
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: PAYPAL_GET_ECCOM_CART,
                payload: {
                    eccomCartData,
                    loading,
                    isError,
                    errorMessage,
                    error: error,
                }
            });
        });
    };
};

export const PaypalPaymentInvoiceAction = (allData, cardData) => {
    return async (dispatch) => {
        var paypalInvoiceData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "post",
            url: `${URL}/placeorder`,
            data: allData,
        }).then((response) => {
            if (response.data.order != null) {
                const temapInvoiceData = {
                    ...response.data,
                    cardData,
                    allData,
                }
                paypalInvoiceData = response.data;
                isError = false;
                dispatch({
                    type: PAYPAL_GO_TO_INVOICE,
                    payload: {
                        paypalInvoiceData: temapInvoiceData,
                        loading,
                        isError,
                        errorMessage
                    }
                });
            } else {
                toast.error("Sorry! No order Found", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        }).catch((error) => {
            toast.error("Failed to Proceed Invoice");
        });
    };
};

export const ClearPaypalPaymentInvoiceAction = () => {
    return (dispatch) => {
        dispatch({ type: PAYPAL_INVOICE_DATA_CLEAR, });
    };
};


