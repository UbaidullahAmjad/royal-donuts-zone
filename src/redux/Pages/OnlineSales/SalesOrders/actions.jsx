/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    SALES_ORDERS_LIST,
    SALES_ORDER_CHANGE_STATUS,
    SALES_ORDER_CHANGE_STATUS_CHECK,
    SALES_ORDER_CREATE,
    SALES_ORDER_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const SalesOrdersListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/eccom-all-orders`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SALES_ORDERS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SALES_ORDERS_LIST,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const getChangeOrderStatus = (id, value, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/statuschange/${id}/${value}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            if (response.data.success == true) {
                SweetAlert.fire({
                    icon: "success",
                    title: trans("Order") + " " + trans("Status"),
                    text:
                        trans("Order") +
                        " " +
                        trans("Status") +
                        " " +
                        trans("Changed") +
                        " " +
                        trans("Successfully") +
                        " !!",
                    confirmButtonText: trans("OK"),
                });

                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: SALES_ORDER_CHANGE_STATUS,
                    payload: {
                        id,
                        value,
                        response,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            } else {
                toast.error(trans("failed"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = true;
                errorMessage = response;
                dispatch({
                    type: SALES_ORDER_CHANGE_STATUS,
                    payload: {
                        id,
                        value,
                        response,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            }
        }).catch((error) => {
            toast.error(trans("failed"), {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: SALES_ORDER_CHANGE_STATUS,
                payload: {
                    id,
                    value,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const StatusChangeCheckAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        dispatch({
            type: SALES_ORDER_CHANGE_STATUS_CHECK,
            payload: {
                response,
                loading,
                isError,
                errorMessage
            }
        })
    }
}
