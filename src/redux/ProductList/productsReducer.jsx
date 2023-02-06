/* eslint-disable no-unused-vars */
import { GET_PRODUCT_LIST } from '../types';

const initialState = {
    productsList: null,
    loading: true,
    isError: false,
    errorMessage: null
}

const productsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCT_LIST:
            return {
                ...state,
                productsList: payload.productsList,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        default: {
            return state
        }
    }
}

export default productsReducer
