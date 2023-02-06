/* eslint-disable no-unused-vars */
import {
    SALES_ORDERS_LIST,
    SALES_ORDER_CHANGE_STATUS,
    SALES_ORDER_CHANGE_STATUS_CHECK,
    SALES_ORDER_CREATE,
    SALES_ORDER_EDIT,
} from "../../../actionTypes";

const initialState = {
    salesOrdersList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SalesOrdersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SALES_ORDERS_LIST: {
            let allSalesOrders = [];
            if (payload.response != null) {
                allSalesOrders = payload.response.order;
                allSalesOrders.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allSalesOrders.length;
            }
            return {
                ...state,
                salesOrdersList: allSalesOrders,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case SALES_ORDER_CHANGE_STATUS: {
            let payload_id = payload.id;
            let payload_value = payload.value;
            let sales_order_list = state.salesOrdersList;
            let new_objects_arr = [];
            if (payload_id) {
                if (state.salesOrdersList.length > 0 && payload.isError == false) {
                    // state.tempArrLength = state.tempArrLength - 1;

                    const get_order_status = sales_order_list.findIndex((item) => item.id == payload_id);
                    sales_order_list[get_order_status].order_status = payload_value.toString();
                    new_objects_arr = [...sales_order_list];
                }
            }
            return {
                ...state,
                salesOrdersList: state.salesOrdersList.length > 0 && payload.isError ? new_objects_arr : state.salesOrdersList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SALES_ORDER_CHANGE_STATUS_CHECK: {
            let newTempArrLength = state.salesOrdersList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                salesOrdersList: state.salesOrdersList,
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

export default SalesOrdersReducer;