/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    SUPPLIERS_LIST,
    SUPPLIER_DELETE,
    SUPPLIER_CREATE,
    SUPPLIER_EDIT,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const SuppliersListAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.get(`${URL}/supplier_supplier`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SUPPLIERS_LIST,
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
                type: SUPPLIERS_LIST,
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

export const DeleteSupplierAction = (id, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios.delete(`${URL}/supplier_supplier/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            SweetAlert.fire({
                icon: "success",
                title: trans("Deleted"),
                text: trans("Your item has been deleted."),
                confirmButtonText: trans("OK"),
            });
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: SUPPLIER_DELETE,
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
                type: SUPPLIER_DELETE,
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

export const SupplierCreateAction = (formData, trans, setError) => {
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
            url: `${URL}/supplier_supplier`,
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
                // errors.showMessages(); //from 'react-hook-form'
            }
            loading = false;
            response = response.data
            dispatch({
                type: SUPPLIER_CREATE,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            if (Object.keys(error.response.data.errors)[0] == "abbrivation") {
                const value = Object.keys(error.response.data.errors)[0];
                setError(
                  "abbrivation",
                  {
                    type: "string",
                    message: trans("The abbrivation has already been taken"),
                  },
                  {
                    shouldFocus: true,
                  }
                );
                toast.error(trans("The abbrivation has already been taken"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else if (Object.keys(error.response.data.errors)[0] == "email") {
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
                type: SUPPLIER_CREATE,
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

export const SupplierEditAction = (formData, id, trans, setError) => {
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
            url: `${URL}/supplier_supplier/${id}`,
            data: formData,
        }).then((response) => {
            if (response.data.success == true) {
                toast.success(trans("successfull"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
                isError = false;
            } else {
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
                isError = true;
            }
            loading = false;
            response = response.data
            dispatch({
                type: SUPPLIER_EDIT,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            const error_message = error.response.data.message;
            if (Object.keys(error.response.data.errors)[0] == "abbrivation") {
                const value = Object.keys(error.response.data.errors)[0];
                setError(
                  "abbrivation",
                  {
                    type: "string",
                    message: trans("The abbrivation has already been taken"),
                  },
                  {
                    shouldFocus: true,
                  }
                );
                toast.error(trans("The abbrivation has already been taken"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else if (Object.keys(error.response.data.errors)[0] == "email") {
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
                type: SUPPLIER_EDIT,
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
