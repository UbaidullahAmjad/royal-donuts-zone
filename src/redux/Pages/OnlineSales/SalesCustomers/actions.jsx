/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    SALES_CUSTOMERS_LIST,
    SALES_CUSTOMER_DELETE,
    SALES_ORDER_CREATE,
    SALES_ORDER_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const SalesCustomersListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/eccom-user`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SALES_CUSTOMERS_LIST,
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
                type: SALES_CUSTOMERS_LIST,
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

export const DeleteSalesCustomerAction = (id, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(
            `${URL}/eccom-user-delete`,
            { params: { id: id } },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            }
        ).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SALES_CUSTOMER_DELETE,
                payload: {
                    prodId: id,
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
                type: SALES_CUSTOMER_DELETE,
                payload: {
                    prodId: id,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const SalesCustomerCreateAction = (formData, trans, setError) => {
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
            url: `${URL}/eccom-new-user`,
            data: formData,
        }).then((response) => {
            if (response.data.success === true) {
                toast.success(trans("successfull"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: SALES_ORDER_CREATE,
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
            if (error?.response?.data?.message == "Email Already Exists") {
                setError(
                    "email",
                    {
                        type: "string",
                        message: trans("Email_Taken"),
                    },
                    {
                        shouldFocus: true,
                    }
                );
                toast.error(trans("Email_Taken"), {
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
                type: SALES_ORDER_CREATE,
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

export const SalesCustomerEditAction = (formData, trans, setError) => {
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
            url: `${URL}/eccom-user-update`,
            data: formData,
        }).then((response) => {
            if (response.data.success === true) {
                toast.success(trans("successfull"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: SALES_ORDER_EDIT,
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
            if (error?.response?.data?.message == "Email Already Exists") {
                setError(
                    "email",
                    {
                        type: "string",
                        message: trans("Email_Taken"),
                    },
                    {
                        shouldFocus: true,
                    }
                );
                toast.error(trans("Email_Taken"), {
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
                type: SALES_ORDER_EDIT,
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