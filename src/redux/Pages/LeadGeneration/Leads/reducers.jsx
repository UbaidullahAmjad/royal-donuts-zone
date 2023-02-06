/* eslint-disable no-unused-vars */
import {
    LEADS_LIST,
    LEAD_DELETE,
    LEAD_CREATE,
    LEAD_EDIT,
} from "../../../actionTypes";

const initialState = {
    leadsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const LeadsReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case LEADS_LIST: {
            let allLeads = [];
            if (payload.response != null) {
                allLeads = payload.response.leads;
                allLeads.map((item, index) => (item["index_no"] = index + 1));
                allLeads.map((item) => {
                    if (item.stage != null) {
                        item["stage_name"] = item.stage.name;
                    } else {
                        item["stage_name"] = " ";
                    }
                });
                state.tempArrLength = allLeads.length;
            }
            return {
                ...state,
                leadsList: allLeads,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case LEAD_DELETE: {
            let deleted_data = state.leadsList
            if (payload.ID) {
                if (state.leadsList.length > 0 && payload.isError == false) {
                    deleted_data = state.leadsList.filter((item) => item.lead.id != payload.ID);
                    deleted_data.map((item, index) => (item["index_no"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                leadsList: deleted_data,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case LEAD_CREATE: {
            let newTempArrLength = state.leadsList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                leadsList: state.leadsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case LEAD_EDIT: {
            let newTempArrLength = state.leadsList.length;
            if (state.leadsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                leadsList: state.leadsList,
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

export default LeadsReducer;