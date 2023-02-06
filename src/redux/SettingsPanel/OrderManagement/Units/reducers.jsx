/* eslint-disable no-unused-vars */
import {
    UNITS_LIST,
    UNIT_IS_ACTIVE,
    UNIT_DELETE,
    UNIT_CREATE,
    UNIT_EDIT,
} from "../../../actionTypes";

const initialState = {
    unitsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const UnitsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case UNITS_LIST: {
            let allUnits = [];
            if (payload.response != null) {
                if (payload.isError == false) {
                    allUnits = payload.response.units;
                    allUnits.map((item, index) => (item["index"] = index + 1));
                } else {
                    allUnits = state.unitsList;
                }
                state.tempArrLength = allUnits.length;
            }
            return {
                ...state,
                unitsList: allUnits,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case UNIT_IS_ACTIVE: {
            if (payload.prodId) {
                if (state.unitsList.length > 0 && payload.isError == false) {
                    state.unitsList.filter((item) => item.id == payload.prodId && (item.isActive == "0" ? item.isActive = "1" : item.isActive = "0"))
                }
            }
            return {
                ...state,
                unitsList: state.unitsList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case UNIT_DELETE: {
            let deleted_category = state.unitsList
            if (payload.prodId) {
                if (state.unitsList.length > 0 && payload.isError == false) {
                    deleted_category = state.unitsList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                unitsList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case UNIT_CREATE: {
            let newTempArrLength = state.unitsList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                unitsList: state.unitsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case UNIT_EDIT: {
            let newTempArrLength = state.unitsList.length;
            if (state.unitsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                unitsList: state.unitsList,
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

export default UnitsReducer;