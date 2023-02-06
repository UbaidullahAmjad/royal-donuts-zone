import * as actionType from "../actionTypes";

const initialState = {
  products: [],
  ingredients: [],
  all_ingredients: [],
  added_ingredients: [],
};

const ProductRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS:
      // if (state.products.length == 0) {
      return {
        ...state,
        products: action.payload.products,
      };
    // }
    case actionType.GET_INGREDIENTS:
      if (state.ingredients.length == 0) {
       
        return {
          ...state,
          ingredients: action.payload.ingredients,
          all_ingredients: action.payload.ingredients,
        };
      }
    case actionType.AddedIngredients:
      var added_ingredients_product = null;
      if (
        state.ingredients.length > 0 &&
        action.payload.added_ingredients != undefined
      ) {
        added_ingredients_product = state.ingredients.filter(
          (item) => !action.payload.added_ingredients.includes(item)
        );
      }
      return {
        ...state,
        added_ingredients:
          action.payload.added_ingredients != undefined &&
          action.payload.added_ingredients != null
            ? state.added_ingredients.concat(action.payload.added_ingredients)
            : [],
        ingredients:
          added_ingredients_product != null ? added_ingredients_product : [],
      };
    case actionType.DeletedIngredient:
      state.ingredients.unshift(action.payload.deleted_ingredient); // result -- array_length
      return {
        ...state,
        added_ingredients: state.added_ingredients.filter(
          (item) => item.id != action.payload.deleted_ingredient.id
        ),
        ingredients: state.ingredients,
      };
    case actionType.RemoveAllAddedIngredients:
      return {
        ...state,
        added_ingredients: [],
        ingredients: state.all_ingredients,
      };
    default:
      return state;
  }
};

export default ProductRecipeReducer;
