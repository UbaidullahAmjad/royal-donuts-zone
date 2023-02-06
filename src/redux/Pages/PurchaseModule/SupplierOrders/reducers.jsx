/* eslint-disable no-unused-vars */
import {
    SUPPLIERS_ORDERS_LIST,
} from "../../../actionTypes";

const initialState = {
    suppliersOrdersList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SuppliersOrdersReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SUPPLIERS_ORDERS_LIST: {
            let AllsuppliersOrders = [];
            if (payload.response != null) {
                AllsuppliersOrders = payload.response.order;
                AllsuppliersOrders.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = AllsuppliersOrders.length;
            }
            return {
                ...state,
                suppliersOrdersList: AllsuppliersOrders,
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

export default SuppliersOrdersReducer;