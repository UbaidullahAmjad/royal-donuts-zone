/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    LEADS_LIST,
    LEAD_DELETE,
    LEAD_CREATE,
    LEAD_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const LeadsListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/leadss`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            dispatch({
                type: LEADS_LIST,
                payload: {
                    response: response.data,
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
                type: LEADS_LIST,
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

export const DeleteLeadAction = (id, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/leadss/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: LEAD_DELETE,
                payload: {
                    ID: id,
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
                type: LEAD_DELETE,
                payload: {
                    ID: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const LeadCreateAction = (formData, trans) => {
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
            url: `${URL}/leadss`,
            data: formData,
        }).then((response) => {
            if (response.data.success === true) {
                toast.success(
                    `${trans("Lead")} ${trans("created")} ${trans("successfully")}`,
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
                // toast.success("Lead created successfully", {
                //     position: toast.POSITION.TOP_RIGHT,
                // });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: LEAD_CREATE,
                    payload: {
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
            }
        }).catch((error) => {
            const err_msg = "" + error.response.data.errors.email;
            if (err_msg) {
                toast.error(err_msg, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error(trans("failed"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: LEAD_CREATE,
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

export const LeadEditAction = (formData, id, trans) => {
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
            url: `${URL}/leadss/${id}`,
            data: formData,
        }).then((response) => {
            if (response.data.success === true) {
                toast.success(
                    `${trans("Lead")} ${trans("updated")} ${trans("successfully")}!!`,
                    {
                        position: toast.POSITION.TOP_RIGHT,
                    }
                );
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: LEAD_EDIT,
                    payload: {
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
            }
        }).catch((error) => {
            const error_msg = error.response?.data?.message;
            if (error_msg) {
                toast.error(error_msg, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error(trans("failed"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: LEAD_EDIT,
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
