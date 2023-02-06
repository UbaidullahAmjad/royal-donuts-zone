import axios from "axios";
import { URL } from "../../env";
import * as actionTypes from "../types";

export const getSettings = () => {
  return async (dispatch) => {
    await axios
      .post(`${URL}/general_home_setting`)
      .then((response) => {
        document.documentElement.style.setProperty(
          "--button_background_color",
          response.data?.setting?.button_color ?? "#e41157"
        );
        document.documentElement.style.setProperty(
          "--slider_btn_background_color",
          response.data?.setting?.background_color ?? "#e41157"
        );
        dispatch({
          type: actionTypes.GET_SETTINGS,
          data: response.data.setting,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_SETTINGS,
          error: error,
        });
      });
  };
};