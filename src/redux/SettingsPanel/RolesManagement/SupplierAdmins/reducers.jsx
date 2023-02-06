/* eslint-disable no-unused-vars */
import {
    ADMINS_LIST,
    ADMIN_DELETE,
    ADMIN_CREATE,
    ADMIN_EDIT,
} from "../../../actionTypes";

const initialState = {
    adminsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SupplierAdminsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADMINS_LIST: {
            let allAdmins = [];
            if (payload.response != null) {
                if (payload.isError == false) {
                    allAdmins = payload.response.admins;
                    allAdmins.map((item, index) => (item["index"] = index + 1));
                } else {
                    allAdmins = state.adminsList;
                }
                state.tempArrLength = allAdmins.length;
            }
            return {
                ...state,
                adminsList: allAdmins,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case ADMIN_DELETE: {
            let deleted_category = state.adminsList
            if (payload.prodId) {
                if (state.adminsList.length > 0 && payload.isError == false) {
                    deleted_category = state.adminsList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                adminsList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ADMIN_CREATE: {
            let newTempArrLength = state.adminsList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                adminsList: state.adminsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ADMIN_EDIT: {
            let newTempArrLength = state.adminsList.length;
            if (state.adminsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                adminsList: state.adminsList,
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

export default SupplierAdminsReducer;