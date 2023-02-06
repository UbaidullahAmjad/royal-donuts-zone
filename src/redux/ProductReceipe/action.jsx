import axios from "axios";
import * as actionType from "../actionTypes";

import { URL } from "../../env";

export const GetProducts = () => {
  console.log("PRODUCTS --------- 0900000000");
  return async (dispatch) => {
    let products = await axios
      .get(`${URL}/product`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token123"),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    const { status, data } = products;
    if (status == 200) {
      dispatch({
        type: actionType.GET_PRODUCTS,
        payload: { products: data.products },
      });
    }
  };
};

export const GetIngredients = () => {
  return async (dispatch) => {
    let ingredients = await axios
      .get(`${URL}/supplier_product`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    const { status, data } = ingredients;
    if (status == 200) {
      dispatch({
        type: actionType.GET_INGREDIENTS,
        payload: { ingredients: data.products },
      });
    }
  };
};

export const AddIngredients = (Ingredients) => {
  console.log("sdfghjk", Ingredients);
  return (dispatch) => {
    dispatch({
      type: actionType.AddedIngredients,
      payload: { added_ingredients: Ingredients },
    });
  };
};

export const DeleteIngredient = (DeletedIngredient) => {
  return (dispatch) => {
    dispatch({
      type: actionType.DeletedIngredient,
      payload: { deleted_ingredient: DeletedIngredient },
    });
  };
};

export const RemoveAllAddedIngredients = () => {
  return (dispatch) => {
    dispatch({ type: actionType.RemoveAllAddedIngredients });
  };
};
