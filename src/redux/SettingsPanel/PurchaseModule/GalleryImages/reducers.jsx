/* eslint-disable no-unused-vars */
import {
    GALLERY_IMAGES_GET_DATA,
    GALLERY_IMAGES_DATA_DELETE,
    GALLERY_IMAGES_SUBMIT_LOADING,
    GALLERY_IMAGES_SAVE_DATA,
} from "../../../actionTypes";

const initialState = {
    galleryImages: null,
    method: "create",
    galleryImagesLength: 1,
    tempArrLength: 0,
    response: null,
    submitLoading: false,
    loading: true,
    isError: false,
    errorMessage: null,
    files: null,
}

const GalleryImagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GALLERY_IMAGES_GET_DATA: {
            let galleryImagesData = "";
            if (payload.response != null) {
                galleryImagesData = payload.response.csv_gallery_images;
                state.tempArrLength = 1;
            }
            state.submitLoading = false;
            return {
                ...state,
                galleryImages: galleryImagesData,
                galleryImagesLength: 1,
                method: payload.method,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case GALLERY_IMAGES_DATA_DELETE: {
            let newTempArrLength = state.galleryImagesLength;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            state.submitLoading = false;
            return {
                ...state,
                ...state,
                galleryImages: state.galleryImages,
                galleryImagesLength: 1,
                method: state.method,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case GALLERY_IMAGES_SUBMIT_LOADING: {
            return {
                ...state,
                submitLoading: true,
            }
        }
        case GALLERY_IMAGES_SAVE_DATA: {
            let newTempArrLength = state.galleryImagesLength;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            state.submitLoading = false;
            return {
                ...state,
                galleryImages: state.galleryImages,
                galleryImagesLength: 1,
                method: state.method,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        default: {
            return state;
        }
    }
}

export default GalleryImagesReducer;