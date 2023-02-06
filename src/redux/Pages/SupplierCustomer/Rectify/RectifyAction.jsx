/* eslint-disable no-unused-vars */
import {
    RECTIFY_ORDER_DATA,
    RECTIFY_ORDER_DELETE,
    RECTIFY_ORDER_DATA_CLEAR
} from "../../../actionTypes";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env"

export const RectifyOrderDataAction = () => {
    return async (dispatch) => {
        var rectifyOrderList = null;
        var loading = false;
        var isError = false;
        var errorMessage = null;

        await axios.get(URL + "/rectify", {
            params: {
                user_id: atob(localStorage.getItem("user_id")),
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            },
        }).then((response) => {
            if (response.data?.success == true) {

                isError = false;
                dispatch({
                    type: RECTIFY_ORDER_DATA,
                    payload: {
                        rectifyOrderList: response.data.all_data,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            } else {
                if (response?.data?.message) {
                    toast.error(response?.data?.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast.error("failed");
                }
                isError = true;
                dispatch({
                    type: RECTIFY_ORDER_DATA,
                    payload: {
                        rectifyOrderList,
                        loading,
                        isError,
                        errorMessage
                    }
                })
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
            isError = true;
            dispatch({
                type: RECTIFY_ORDER_DATA,
                payload: {
                    rectifyOrderList,
                    loading,
                    isError,
                    errorMessage: error.response
                }
            })
        })
    }
};


export const DeleteRectifyOrderAction = (row) => {
    return (dispatch) => {
        dispatch({
            type: RECTIFY_ORDER_DELETE,
            payload: { row },
        })
    }
}
