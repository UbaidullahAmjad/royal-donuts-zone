import axios from "axios";
import { URL } from "../../env";
import * as actionTypes from "../types";


export const storeListGet = () => {
  return async (dispatch) => {
    await axios.get(`${URL}/get_stores`)
      .then((response) => {
        dispatch({
          type: actionTypes.STORELIST,
          data: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.STORELIST,
          error: error
        })
      })

  }
}

