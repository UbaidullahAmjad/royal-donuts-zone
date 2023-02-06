/* eslint-disable no-unused-vars */
import {
    SUPPLIER_CUSTOMERS_LIST,
    SUPPLIER_CUSTOMER_DELETE,
    SUPPLIER_CUSTOMER_CREATE,
    SUPPLIER_CUSTOMER_EDIT,
} from "../../../actionTypes";

const initialState = {
    supplierCustomersList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SupplierCustomersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SUPPLIER_CUSTOMERS_LIST: {
            let allSupplierCustomers = [];
            if (payload.response != null) {
                allSupplierCustomers = payload.response.customers;
                allSupplierCustomers.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allSupplierCustomers.length;
            }
            return {
                ...state,
                supplierCustomersList: allSupplierCustomers,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case SUPPLIER_CUSTOMER_DELETE: {
            let deleted_data = state.supplierCustomersList
            if (payload.prodId) {
                if (state.supplierCustomersList.length > 0 && payload.isError == false) {
                    deleted_data = state.supplierCustomersList.filter((item) => item.id != payload.prodId);
                    deleted_data.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                supplierCustomersList: deleted_data,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SUPPLIER_CUSTOMER_CREATE: {
            let newTempArrLength = state.supplierCustomersList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                supplierCustomersList: state.supplierCustomersList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case SUPPLIER_CUSTOMER_EDIT: {
            let newTempArrLength = state.supplierCustomersList.length;
            if (state.supplierCustomersList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                supplierCustomersList: state.supplierCustomersList,
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

export default SupplierCustomersReducer;