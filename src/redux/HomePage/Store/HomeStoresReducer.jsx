/* eslint-disable no-unused-vars */
import { HomeStores_GET_DATA } from '../../types';

const initialState = {
    homeStoreData: null,
    loading: true,
    isError: false,
    errorMessage: null
}

const HomeStoresReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case HomeStores_GET_DATA:
            return {
                ...state,
                homeStoreData: payload.homeStoreData?.findstore ?? null,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        default: {
            return state
        }
    }
}

export default HomeStoresReducer
