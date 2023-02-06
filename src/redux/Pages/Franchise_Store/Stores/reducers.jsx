/* eslint-disable no-unused-vars */
import {
    STORES_LIST,
    STORE_DELETE,
    STORE_CREATE,
    STORE_EDIT,
} from "../../../actionTypes";

const initialState = {
    storesList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const StoresReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case STORES_LIST: {
            let allstores = [];
            if (payload.response != null) {
                allstores = payload.response.stores;
                allstores.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allstores.length;
            }
            return {
                ...state,
                storesList: allstores,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case STORE_DELETE: {
            let deleted_data = state.storesList
            if (payload.prodId) {
                if (state.storesList.length > 0 && payload.isError == false) {
                    deleted_data = state.storesList.filter((item) => item.id != payload.prodId);
                    deleted_data.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                storesList: deleted_data,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case STORE_CREATE: {
            let newTempArrLength = state.storesList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                storesList: state.storesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case STORE_EDIT: {
            let newTempArrLength = state.storesList.length;
            if (state.storesList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                storesList: state.storesList,
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

export default StoresReducer;