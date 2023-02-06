/* eslint-disable no-unused-vars */
import {
    PRODUCTS_LIST,
    PRODUCTS_IS_BOX,
    PRODUCTS_IS_SPECIAL,
    PRODUCTS_IS_ACTIVE,
    PRODUCT_DELETE,
    PRODUCTS_BULK_DELETE,
    PRODUCT_CREATE,
    PRODUCT_EDIT
} from "../../../actionTypes";


const initialState = {
    productsList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const ProductsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PRODUCTS_LIST: {
            let allProducts = [];
            if (payload.response != null) {
                allProducts = payload.response.products;
                allProducts.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allProducts.length;
            }
            return {
                ...state,
                productsList: allProducts,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case PRODUCTS_IS_BOX: {
            if (payload.prodId) {
                if (state.productsList.length > 0 && payload.isError == false) {
                    state.productsList.filter((item) => item.id == payload.prodId && (item.isBox == "0" ? item.isBox = "1" : item.isBox = "0"))
                }
            }
            return {
                ...state,
                productsList: state.productsList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCTS_IS_SPECIAL: {
            if (payload.prodId) {
                if (state.productsList.length > 0 && payload.isError == false) {
                    state.productsList.filter((item) => item.id == payload.prodId && (item.isSpecial == "0" ? item.isSpecial = "1" : item.isSpecial = "0"))
                }
            }
            return {
                ...state,
                productsList: state.productsList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCTS_IS_ACTIVE: {
            if (payload.prodId) {
                if (state.productsList.length > 0 && payload.isError == false) {
                    state.productsList.filter((item) => item.id == payload.prodId && (item.isActive == "0" ? item.isActive = "1" : item.isActive = "0"))
                }
            }
            return {
                ...state,
                productsList: state.productsList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_DELETE: {
            let deleted_product = state.productsList
            if (payload.prodId) {
                if (state.productsList.length > 0 && payload.isError == false) {
                    deleted_product = state.productsList.filter((item) => item.id != payload.prodId);
                    deleted_product.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                productsList: deleted_product,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCTS_BULK_DELETE: {
            let bulk_deleted_products = state.productsList
            if (payload.bulkIds) {
                if (state.productsList.length > 0 && payload.isError == false) {
                    bulk_deleted_products = state.productsList.filter(
                        (item) => !payload.bulkIds.includes(item.id)
                    )
                    bulk_deleted_products.map((item, index) => (item["index"] = index + 1));

                    state.tempArrLength = state.tempArrLength - payload.bulkIds.length;
                }
            }
            return {
                ...state,
                productsList: bulk_deleted_products,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_CREATE: {
            let newTempArrLength = state.productsList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                productsList: state.productsList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_EDIT: {
            let newTempArrLength = state.productsList.length;
            if (state.productsList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                productsList: state.productsList,
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

export default ProductsReducer;
