/* eslint-disable no-unused-vars */
import { GET_CATEGORIES_PRODUCTS } from "../types";

const initialState = {
  categoriesProds: [],
  loading: true,
  isError: false,
  errorMessage: null,
};

const categoriesProdsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES_PRODUCTS: {
      return {
        ...state,
        categoriesProds: payload.categoriesProds,
        loading: payload.loading,
        isError: payload.isError,
        errorMessage: payload.errorMessage,
      };
    }
    default: {
      return state;
    }
  }
};

export default categoriesProdsReducer;
