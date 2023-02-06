/* eslint-disable no-unused-vars */
import {
    ROLES_LIST,
    ROLE_DELETE,
    ROLE_CREATE,
    ROLE_EDIT,
} from "../../../actionTypes";

const initialState = {
    rolesList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const RolesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ROLES_LIST: {
            let allRoles = [];
            if (payload.response != null) {
                if (payload.isError == false) {
                    allRoles = payload.response.message.data;
                    allRoles.map((item, index) => (item["index"] = index + 1));
                } else {
                    allRoles = state.rolesList;
                }
                state.tempArrLength = allRoles.length;
            }
            return {
                ...state,
                rolesList: allRoles,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case ROLE_DELETE: {
            let deleted_category = state.rolesList
            if (payload.prodId) {
                if (state.rolesList.length > 0 && payload.isError == false) {
                    deleted_category = state.rolesList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                rolesList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ROLE_CREATE: {
            let newTempArrLength = state.rolesList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                rolesList: state.rolesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case ROLE_EDIT: {
            let newTempArrLength = state.rolesList.length;
            if (state.rolesList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                rolesList: state.rolesList,
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

export default RolesReducer;