/* eslint-disable no-unused-vars */
import { HomeSpecialProducts_GET_DATA } from '../../types';

const initialState = {
    specialProductsList: [],
    loading: true,
    isError: false,
    errorMessage: null
}

const SpecialProductsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case HomeSpecialProducts_GET_DATA:
            return {
                ...state,
                specialProductsList: payload.specialProductsList?.products ?? [],
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        default: {
            return state
        }
    }
}

export default SpecialProductsReducer
