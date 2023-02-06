/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    COUPONS_LIST,
    COUPON_IS_ACTIVE,
    COUPON_DELETE,
    COUPONS_BULK_DELETE,
    COUPON_CREATE,
    COUPON_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const CouponsListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/coupon`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: COUPONS_LIST,
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
                type: COUPONS_LIST,
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

export const HandleCouponIsActiveAction = (prodId, message) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        axios({
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
            url: `${URL}/category/status/${prodId}`,
            // data: "",
        }).then((response) => {
            if (response.data.success === true) {
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: COUPON_IS_ACTIVE,
                    payload: {
                        prodId,
                        response,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            }
        }).catch((error) => {
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: COUPON_IS_ACTIVE,
                payload: {
                    prodId,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const DeleteCouponAction = (id, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/coupon/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: COUPON_DELETE,
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
                type: COUPON_DELETE,
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

export const CouponsBulkDeleteAction = (bulkIds, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "POST",
            url: `${URL}/coupon_bulk_delete`,
            data: { ids: JSON.stringify(bulkIds) },
        }).then((response) => {
            SweetAlert.fire({
                icon: "success",
                title: trans("Deleted"),
                text: trans("Your selected items has been deleted"),
                confirmButtonText: trans("OK"),
            });

            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: COUPONS_BULK_DELETE,
                payload: {
                    bulkIds,
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
                type: COUPONS_BULK_DELETE,
                payload: {
                    bulkIds,
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        })
    }
};

export const CouponCreateAction = (formData, trans, setError) => {
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
            url: `${URL}/coupon`,
            data: formData,
        }).then((response) => {
            toast.success(trans("successfull"), {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: COUPON_CREATE,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            if (Object.keys(error.response.data.errors)[0] == "code") {
                const value = Object.keys(error.response.data.errors)[0];
                setError(
                    "code",
                    {
                        type: "string",
                        message: trans("Code_Taken"),
                    },
                    {
                        shouldFocus: true,
                    }
                );
                toast.error(trans("Code_Taken"), {
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
                type: COUPON_CREATE,
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

export const CouponEditAction = (formData, id, trans, setError) => {
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
            url: `${URL}/coupon/${id}`,
            data: formData,
        }).then((response) => {
            toast.success(trans("successfull"), {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: COUPON_EDIT,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            if (Object.keys(error.response.data.errors)[0] == "code") {
                const value = Object.keys(error.response.data.errors)[0];
                setError(
                    "code",
                    {
                        type: "string",
                        message: trans("Code_Taken"),
                    },
                    {
                        shouldFocus: true,
                    }
                );
                toast.error(trans("Code_Taken"), {
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
                type: COUPON_EDIT,
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
