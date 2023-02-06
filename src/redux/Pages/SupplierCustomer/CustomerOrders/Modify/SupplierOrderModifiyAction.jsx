/* eslint-disable no-unused-vars */
import {
    SUPPLIER_ORDER_TOKEN_VERIFICATION,
    SUPPLIER_ORDER_ITEM_MODIFY,
    SUPPLIER_ORDER_ITEM_REMOVE,
    SUPPLIER_ORDER_TOKEN_VERIFICATION_CLEAR
} from "../../../../actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../../../../env"
import SweetAlert from "sweetalert2";

export const SupplierOrderVerificationAction = (formData) => {

    return async (dispatch) => {
        var SupplierOrderVerificationData = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "post",
            url: `${URL}/verifySupplierCustomerOrder`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            data: formData,
        }).then((response) => {
            if (response.data?.succes == true) {
                isError = false;
                dispatch({
                    type: SUPPLIER_ORDER_TOKEN_VERIFICATION,
                    payload: {
                        SupplierOrderVerificationData: response.data,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            } else {
                // if (response?.data?.error == true) {
                //     toast.error(response?.data?.message, {
                //         position: toast.POSITION.TOP_RIGHT,
                //     });
                // }
                isError = false;
                dispatch({
                    type: SUPPLIER_ORDER_TOKEN_VERIFICATION,
                    payload: {
                        SupplierOrderVerificationData,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            }
        }).catch((error) => {
            // if (error.response?.data?.message) {
            //     toast.error(error.response?.data?.message, {
            //         position: toast.POSITION.TOP_RIGHT,
            //     });
            // } else {
            //     toast.error("Failed!", {
            //         position: toast.POSITION.TOP_RIGHT,
            //     });
            // }
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SUPPLIER_ORDER_TOKEN_VERIFICATION,
                payload: {
                    SupplierOrderVerificationData,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const SupplierOrderItemModifyAction = (cur_order_id) => {
    return (dispatch) => {
        dispatch({
            type: SUPPLIER_ORDER_ITEM_MODIFY,
            payload: { cur_order_id },
        })
    }
}

export const SupplierOrderItemRemoveAction = (cur_order_id) => {
    return (dispatch) => {
        dispatch({
            type: SUPPLIER_ORDER_ITEM_REMOVE,
            payload: { cur_order_id },
        })
    }
}

export const SubmitModifiedSupplierOrderItemAction = (formData) => {

    return async (dispatch) => {

        axios({
            method: "post",
            url: `${URL}/UpdateSupplierCustomerOrder`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            data: formData,
        }).then((response) => {
            if (response.data?.success == true || response.data?.success == "true") {
                SweetAlert.fire({
                    title: "Order Modified",
                    text: response.data?.message ?? "Order Updated Successfully",
                    icon: "success",
                    showCancelButton: false,
                    cancelButtonText: "Cancel",
                    confirmButtonText: "OK",
                    reverseButtons: true,
                }).then((result) => {
                    if (result.value) {

                    }
                });
            } else {
                if (response?.data?.error == true) {
                    if (response?.data?.message) {
                        toast.error(response?.data?.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                }
            }
        }).catch((error) => {
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error("failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        })
    }
};

