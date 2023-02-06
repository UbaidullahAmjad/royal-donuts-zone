/* eslint-disable no-unused-vars */
import {
    INGREDIENT_CATEGORIES_LIST,
    INGREDIENT_CATEGORIES_IS_ACTIVE,
    INGREDIENT_CATEGORIES_DELETE,
    INGREDIENT_CATEGORIES_BULK_DELETE,
    INGREDIENT_CATEGORIES_CREATE,
    INGREDIENT_CATEGORIES_EDIT,
} from "../../../actionTypes";


const initialState = {
    ingredientCategoriesList: [],
    tempArrLength: 0,
    response: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const IngredientsCategoriesReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case INGREDIENT_CATEGORIES_LIST: {
            let allIngredientsCategories = [];
            if (payload.response != null) {
                allIngredientsCategories = payload.response.categories;
                allIngredientsCategories.map((item, index) => (item["index"] = index + 1));
                state.tempArrLength = allIngredientsCategories.length;
            }
            return {
                ...state,
                ingredientCategoriesList: allIngredientsCategories,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case INGREDIENT_CATEGORIES_IS_ACTIVE: {
            if (payload.prodId) {
                if (state.ingredientCategoriesList.length > 0 && payload.isError == false) {
                    state.ingredientCategoriesList.filter((item) => item.id == payload.prodId && (item.isActive == "0" ? item.isActive = "1" : item.isActive = "0"))
                }
            }
            return {
                ...state,
                ingredientCategoriesList: state.ingredientCategoriesList,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case INGREDIENT_CATEGORIES_DELETE: {
            let deleted_category = state.ingredientCategoriesList
            if (payload.prodId) {
                if (state.ingredientCategoriesList.length > 0 && payload.isError == false) {
                    deleted_category = state.ingredientCategoriesList.filter((item) => item.id != payload.prodId);
                    deleted_category.map((item, index) => (item["index"] = index + 1));
                    state.tempArrLength = state.tempArrLength - 1;
                }
            }
            return {
                ...state,
                ingredientCategoriesList: deleted_category,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case INGREDIENT_CATEGORIES_BULK_DELETE: {
            let bulk_deleted_items = state.ingredientCategoriesList
            if (payload.bulkIds) {
                if (state.ingredientCategoriesList.length > 0 && payload.isError == false) {
                    bulk_deleted_items = state.ingredientCategoriesList.filter(
                        (item) => !payload.bulkIds.includes(item.id)
                    )
                    bulk_deleted_items.map((item, index) => (item["index"] = index + 1));

                    state.tempArrLength = state.tempArrLength - payload.bulkIds.length;
                }
            }
            return {
                ...state,
                ingredientCategoriesList: bulk_deleted_items,
                tempArrLength: state.tempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case INGREDIENT_CATEGORIES_CREATE: {
            let newTempArrLength = state.ingredientCategoriesList.length;
            newTempArrLength = newTempArrLength + 1;
            return {
                ...state,
                ingredientCategoriesList: state.ingredientCategoriesList,
                tempArrLength: newTempArrLength,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            }
        }
        case INGREDIENT_CATEGORIES_EDIT: {
            let newTempArrLength = state.ingredientCategoriesList.length;
            if (state.ingredientCategoriesList.length > 0 && payload.isError == false) {
                newTempArrLength = newTempArrLength + 1;
            }
            return {
                ...state,
                ingredientCategoriesList: state.ingredientCategoriesList,
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

export default IngredientsCategoriesReducer