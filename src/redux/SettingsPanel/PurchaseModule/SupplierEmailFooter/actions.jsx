/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    FOOTER_SIGNATURE_GET_DATA,
    FOOTER_SIGNATURE_SAVE_DATA,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const SupplierEmailFooterGetDataAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null;
        var method = "create";

        await axios.get(`${URL}/footer`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            if (response.data.setting != null || response.data.setting != undefined) {
                method = "update";
            } else {
                method = "create";
            }
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: FOOTER_SIGNATURE_GET_DATA,
                payload: {
                    response,
                    method,
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
                type: FOOTER_SIGNATURE_GET_DATA,
                payload: {
                    response,
                    method,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const SupplierEmailFooterSaveDataAction = (formData, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            url: `${URL}/footerupdate`,
            data: formData,
        }).then((response) => {
            if (response.data.success === true) {
                toast.success(trans("successfull"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
                isError = false;
            } else {
                toast.error(trans("failed"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
                isError = true;
            }
            loading = false;
            response = response.data
            dispatch({
                type: FOOTER_SIGNATURE_SAVE_DATA,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            toast.error(trans("failed"), {
                position: toast.POSITION.TOP_RIGHT,
            });

            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: FOOTER_SIGNATURE_SAVE_DATA,
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
