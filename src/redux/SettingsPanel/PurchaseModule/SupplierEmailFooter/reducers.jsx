/* eslint-disable no-unused-vars */
import {
    FOOTER_SIGNATURE_GET_DATA,
    FOOTER_SIGNATURE_SAVE_DATA,
} from "../../../actionTypes";

const initialState = {
    supplierFooter: null,
    method: "create",
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SupplierEmailFooterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FOOTER_SIGNATURE_GET_DATA: {
            let footerContent = "";
            if (payload.response != null) {
                footerContent = payload.response.setting;
                state.tempArrLength = 1;
            }
            return {
                ...state,
                supplierFooter: footerContent,
                supplierFooterLength: 1,
                method: payload.method,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case FOOTER_SIGNATURE_SAVE_DATA: {
            let newTempArrLength = state.supplierFooter.length;
            if (payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                supplierFooter: state.supplierFooter,
                supplierFooterLength: 1,
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

export default SupplierEmailFooterReducer;