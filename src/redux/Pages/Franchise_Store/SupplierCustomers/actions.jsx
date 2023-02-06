/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    SUPPLIER_CUSTOMERS_LIST,
    SUPPLIER_CUSTOMER_DELETE,
    SUPPLIER_CUSTOMER_CREATE,
    SUPPLIER_CUSTOMER_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const SupplierCustomersListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/supplier_customer`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SUPPLIER_CUSTOMERS_LIST,
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
                type: SUPPLIER_CUSTOMERS_LIST,
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

export const DeleteSupplierCustomerAction = (id, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/supplier_customer/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SUPPLIER_CUSTOMER_DELETE,
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
                type: SUPPLIER_CUSTOMER_DELETE,
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

export const SupplierCustomerCreateAction = (formData, trans, setError) => {
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
            url: `${URL}/supplier_customer`,
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
                    type: SUPPLIER_CUSTOMER_CREATE,
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
            if (Object.keys(error.response.data.errors)[0] == "email") {
                const value = Object.keys(error.response.data.errors)[0];
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
                type: SUPPLIER_CUSTOMER_CREATE,
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

export const SupplierCustomerEditAction = (formData, id, trans, setError) => {
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
            url: `${URL}/supplier_customer/${id}`,
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
                    type: SUPPLIER_CUSTOMER_EDIT,
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
            const error_message = error.response.data.message;
            if (response.data.type == "email") {
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
                type: SUPPLIER_CUSTOMER_EDIT,
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

