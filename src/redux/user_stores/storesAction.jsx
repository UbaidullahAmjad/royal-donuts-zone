import * as actionTypes from "../actionTypes";

export const setStores = (data) => {
  return {
    type: actionTypes.GET_STORES,
    payload: { data: data },
  };
};