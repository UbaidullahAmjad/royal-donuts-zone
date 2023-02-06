/* eslint-disable no-unused-vars */
import {
    SALES_CUSTOMERS_LIST,
    SALES_CUSTOMER_DELETE,
    SALES_ORDER_CREATE,
    SALES_ORDER_EDIT,
} from "../../../actionTypes";

const initialState = {
    salesCustomersList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SalesCustomersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SALES_CUSTOMERS_LIST: {
            let allSalesCustomers = [];
            if (payload.response != null) {
                allSalesCustomers = payload.response.user;
                allSalesCustomers.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allSalesCustomers.length;
            }
            return {
                ...state,
                salesCustomersList: allSalesCustomers,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case SALES_CUSTOMER_DELETE: {
            let deleted_data = state.salesCustomersList
            if (payload.prodId) {
                if (state.salesCustomersList.length > 0 && payload.isError == false) {
                    deleted_data = state.salesCustomersList.filter((item) => item.id != payload.prodId);
                    deleted_data.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                salesCustomersList: deleted_data,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SALES_ORDER_CREATE: {
            let newTempArrLength = state.salesCustomersList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                salesCustomersList: state.salesCustomersList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SALES_ORDER_EDIT: {
            let newTempArrLength = state.salesCustomersList.length;
            if (state.salesCustomersList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                salesCustomersList: state.salesCustomersList,
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

export default SalesCustomersReducer;