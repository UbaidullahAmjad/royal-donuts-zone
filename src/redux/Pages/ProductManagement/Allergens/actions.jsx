/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    ALLERGENS_LIST,
    ALLERGEN_IS_ACTIVE,
    ALLERGEN_DELETE,
    ALLERGENS_BULK_DELETE,
    ALLERGEN_CREATE,
    ALLERGEN_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";


export const AllergensListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = false;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/allergen`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: ALLERGENS_LIST,
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
                type: ALLERGENS_LIST,
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

export const HandleAllergenIsActiveAction = (prodId, message) => {
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
            url: `${URL}/allergen/status/${prodId}`,
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
                    type: ALLERGEN_IS_ACTIVE,
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
                type: ALLERGEN_IS_ACTIVE,
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

export const DeleteAllergenAction = (id, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/allergen/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: ALLERGEN_DELETE,
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
                type: ALLERGEN_DELETE,
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

export const AllergensBulkDeleteAction = (bulkIds, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios({
            method: "POST",
            url: `${URL}/allergen_bulk_delete`,
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
                type: ALLERGENS_BULK_DELETE,
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
                type: ALLERGENS_BULK_DELETE,
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

export const AllergenCreateAction = (formData, trans) => {
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
            url: `${URL}/allergen`,
            data: formData,
        }).then((response) => {
            if (response.data.success == true) {
                toast.success(trans("successfull"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loading = false;
                isError = false;
                response = response.data
                dispatch({
                    type: ALLERGEN_CREATE,
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
            toast.error(trans("failed"), {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ALLERGEN_CREATE,
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

export const AllergenEditAction = (formData, id, trans) => {
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
            url: `${URL}/allergen/${id}`,
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
                    type: ALLERGEN_EDIT,
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
            toast.error(trans("failed"), {
                position: toast.POSITION.TOP_RIGHT,
            });
            loading = false;
            isError = true;
            errorMessage = error.response;
            dispatch({
                type: ALLERGEN_EDIT,
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


