import axios from "axios";
import { URL } from "../../env";
import * as actionTypes from "../types";

export const getStore = (id) => {
  return async (dispatch) => {

    var storeContentData = null;
    var url_field = "";
    var loading = false;
    var isError = false;
    var errorMessage = null

    await axios
      .get(`${URL}/get_store/${id}`)
      .then((response) => {
        storeContentData = response.data
        isError = false;
        dispatch({
          type: actionTypes.SINGLE_STORE,
          // data: response.data,
          payload: {
            storeContentData,
            url_field: id,
            loading,
            isError,
            errorMessage
          }
        });
      }).catch((error) => {
        isError = true;
        errorMessage = error.response;
        dispatch({
          type: actionTypes.SINGLE_STORE,
          // error: error,
          payload: {
            storeContentData,
            url_field,
            loading,
            isError,
            errorMessage,
            error: error,
          }
        });
      });
  };
};


