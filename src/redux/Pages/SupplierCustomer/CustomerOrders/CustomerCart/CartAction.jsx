/* eslint-disable no-unused-vars */
import {
    SUPPLIER_CUSTOMER_CART_DATA,
    SUPPLIER_CUSTOMER_CART_ITEM_DELETE,
    SUPPLIER_CUSTOMER_CART_DATA_CLEAR,
} from "../../../../actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../../../../env"

export const SuppllierCustomerCartDataAction = () => {
    return async (dispatch) => {
        var cartPageList = [];
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios
            .get(URL + "/cart", {
                params: {
                    user_id: atob(localStorage.getItem("user_id"))
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            }).then((response) => {
                isError = false;
                cartPageList = response.data.cart_page_array
                dispatch({
                    type: SUPPLIER_CUSTOMER_CART_DATA,
                    payload: {
                        cartPageList,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            }).catch((error) => {
                isError = true;
                errorMessage = error.response;
                dispatch({
                    type: SUPPLIER_CUSTOMER_CART_DATA,
                    payload: {
                        cartPageList,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            })
    }
};

export const DeleteSuppllierCustomerCartItemAction = (row) => {
    return (dispatch) => {
        dispatch({
            type: SUPPLIER_CUSTOMER_CART_ITEM_DELETE,
            payload: { row },
        })
    }
}

