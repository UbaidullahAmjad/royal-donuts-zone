/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env";
import {
    GALLERY_IMAGES_GET_DATA,
    GALLERY_IMAGES_DATA_DELETE,
    GALLERY_IMAGES_SUBMIT_LOADING,
    GALLERY_IMAGES_SAVE_DATA,
    GALLERY_FILES_SAVING,
} from "../../../actionTypes";
import SweetAlert from "sweetalert2";

export const GalleryImagesGetDataAction = () => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null;
        var method = "create";

        await axios.get(`${URL}/csv_gallery_images`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token123"),
            },
        }).then((response) => {
            loading = false;
            isError = false;
            response = response.data
            dispatch({
                type: GALLERY_IMAGES_GET_DATA,
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
                type: GALLERY_IMAGES_GET_DATA,
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



export const Delete_GalleryImagesDataAction = (id, trans) => {
    return async (dispatch) => {
        var response = null;
        var loading = true;
        var isError = false;
        var errorMessage = null

        await axios
            .delete(`${URL}/csv_gallery_images/${id}`, {
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
                response = response.data
                dispatch({
                    type: GALLERY_IMAGES_DATA_DELETE,
                    payload: {
                        response,
                        loading,
                        isError,
                        errorMessage
                    }
                })
            }).catch((error) => {
                const error_message = error.response.data.message;
                if (error_message) {
                    toast.error(error_message, {
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
                    type: GALLERY_IMAGES_DATA_DELETE,
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

export const GalleryImages_SubmitLoading = () => {
    return (dispatch) => {
        dispatch({
            type: GALLERY_IMAGES_SUBMIT_LOADING,
        });
    }
}

export const GalleryImagesSaveDataAction = (formData, AllFiles, trans) => {
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
            url: `${URL}/csv_gallery_images`,
            data: formData,
        }).then((response) => {
            if (response.data.success === true) {
                toast.success(trans("successfull"), {
                    position: toast.POSITION.TOP_RIGHT,
                });
                AllFiles.forEach((f) => f.remove());

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
                type: GALLERY_IMAGES_SAVE_DATA,
                payload: {
                    response,
                    loading,
                    isError,
                    errorMessage
                }
            })
        }).catch((error) => {
            const error_message = error.response.data.message;
            if (error_message) {
                toast.error(error_message, {
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
                type: GALLERY_IMAGES_SAVE_DATA,
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
