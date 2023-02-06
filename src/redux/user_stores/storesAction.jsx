import * as actionTypes from "../actionTypes";

export const setStores = (data) => {
  console.log("DATAAAAAA OF STORE", data);
  return {
    type: actionTypes.GET_STORES,
    payload: { data: data },
  };
};