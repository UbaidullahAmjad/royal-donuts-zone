/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { GET_CATEGORIES } from "../types";
import { URL } from "../../env";

const categoriesAction = () => {
  return async (dispatch) => {
    var categoriesList = [];
    var loading = false;
    var isError = false;
    var errorMessage = null;

    axios
      .get(`${URL}/get_category`, {
        // headers: {
        //     Authorization: "Bearer " + localStorage.getItem("token123"),
        // },
      })
      .then((response) => {
        isError = false;
        categoriesList = response.data;
        dispatch({
          type: GET_CATEGORIES,
          payload: {
            categoriesList,
            loading,
            isError,
            errorMessage,
          },
        });
      })
      .catch((error) => {
        isError = true;
        errorMessage = error.response;
        dispatch({
          type: GET_CATEGORIES,
          payload: {
            categoriesList,
            loading,
            isError,
            errorMessage,
          },
        });
      });
  };
};

export default categoriesAction;
