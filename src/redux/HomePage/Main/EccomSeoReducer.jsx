/* eslint-disable no-unused-vars */
import { EccomSEO_GET_DATA } from '../../types';

const initialState = {
    eccomSeoData: null,
    loading: true,
    isError: false,
    errorMessage: null
}

const EccomSeoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case EccomSEO_GET_DATA:
            return {
                ...state,
                eccomSeoData: payload.eccomSeoData.data,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        default: {
            return state
        }
    }
}

export default EccomSeoReducer
