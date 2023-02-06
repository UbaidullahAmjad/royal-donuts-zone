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
      if (state.products.length == 0) {
        return {
          ...state,
          products: action.payload.products,
        };
      }
    case actionType.GET_INGREDIENTS:
      if (state.ingredients.length == 0) {
        console.log(
          "all_ingredientsall_ingredients ---------",
          action.payload.ingredients
        );
        return {
          ...state,
          ingredients: action.payload.ingredients,
          all_ingredients: action.payload.ingredients,
        };
      }
    case actionType.AddedIngredients:
      // console.log(
      //   "State.added_ingredients ----------",
      //   state.added_ingredients,
      //   "--------------",
      //   action.payload.added_ingredients,
      //   "----------- 12345 ------------",
      //   state.added_ingredients.concat(action.payload.added_ingredients)
      // );
      console.log("INGREDIENTS REDUCER ---------", state.ingredients);
      console.log(
        "ADDED INGREDIENTS ------------",
        action.payload.added_ingredients
      );
      return {
        ...state,
        added_ingredients: state.added_ingredients.concat(
          action.payload.added_ingredients
        ),
        ingredients:
          state.ingredients.length > 0 &&
          state.ingredients.filter(
            (item) => !action.payload.added_ingredients.includes(item)
          ),
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
      // console.log("RemoveAllAddedIngredients -----------------");
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
