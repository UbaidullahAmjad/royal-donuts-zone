/* eslint-disable no-unused-vars */
import {
    STORES_REVENUE_LIST,
    LEAD_DELETE,
    LEAD_CREATE,
    LEAD_EDIT,
} from "../../../actionTypes";

const initialState = {
    storesRevenueList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const StoresRevenueReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case STORES_REVENUE_LIST: {
            let allStoresRevenue = [];
            if (payload.response != null) {
                allStoresRevenue = payload.response.stores_data;
                allStoresRevenue.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allStoresRevenue.length;
            }
            return {
                ...state,
                storesRevenueList: allStoresRevenue,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        default: {
            return state;
        }
    }
}

export default StoresRevenueReducer;