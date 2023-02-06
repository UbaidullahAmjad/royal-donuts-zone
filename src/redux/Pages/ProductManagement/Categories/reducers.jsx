/* eslint-disable no-unused-vars */
import {
    PRODUCT_CATEGORIES_LIST,
    PRODUCT_CATEGORIES_IS_ACTIVE,
    PRODUCT_CATEGORIES_DELETE,
    PRODUCT_CATEGORIES_BULK_DELETE,
    PRODUCT_CATEGORIES_CREATE,
    PRODUCT_CATEGORIES_EDIT,
} from "../../../actionTypes";

const initialState = {
    categoriesList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const CategoriesReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case PRODUCT_CATEGORIES_LIST: {
            let allCategories = [];
            if (payload.response != null) {
                allCategories = payload.response.categories;
                allCategories.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allCategories.length;
            }
            return {
                ...state,
                categoriesList: allCategories,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case PRODUCT_CATEGORIES_IS_ACTIVE: {
            if (payload.prodId) {
                if (state.categoriesList.length > 0 && payload.isError == false) {
                    state.categoriesList.filter((item) => item.id == payload.prodId && (item.isActive == "0" ? item.isActive = "1" : item.isActive = "0"))
                }
            }
            return {
                ...state,
                categoriesList: state.categoriesList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_CATEGORIES_DELETE: {
            let deleted_category = state.categoriesList
            if (payload.prodId) {
                if (state.categoriesList.length > 0 && payload.isError == false) {
                    deleted_category = state.categoriesList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                categoriesList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_CATEGORIES_BULK_DELETE: {
            let bulk_deleted_items = state.categoriesList
            if (payload.bulkIds) {
                if (state.categoriesList.length > 0 && payload.isError == false) {
                    bulk_deleted_items = state.categoriesList.filter(
                        (item) => !payload.bulkIds.includes(item.id)
                    )
                    bulk_deleted_items.map((item, index) => (item["index"] = index + 1));

                    state.tempArrLength = state.tempArrLength - payload.bulkIds.length;
                }
            }
            return {
                ...state,
                categoriesList: bulk_deleted_items,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_CATEGORIES_CREATE: {
            let newTempArrLength = state.categoriesList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                categoriesList: state.categoriesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case PRODUCT_CATEGORIES_EDIT: {
            let newTempArrLength = state.categoriesList.length;
            if (state.categoriesList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                categoriesList: state.categoriesList,
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

export default CategoriesReducer;