/* eslint-disable no-unused-vars */
import { TOKEN_EXPIRY_TIME } from '../types'
import { Redirect } from "react-router-dom";

const initialState = 0;

const tokenExpiry = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_EXPIRY_TIME:
      // token_expiry_time
      localStorage.setItem("token_expiry_time", action.payload);
      const tokenExpirStorage = action.payload;
      // console.log("redux-token_expiry_time: " + tokenExpirStorage);
      return {
        ...(state !== 0
          ? {
              ...state,
              expire_time:
                tokenExpirStorage === undefined ||
                tokenExpirStorage === null ||
                tokenExpirStorage === "null" ||
                tokenExpirStorage === "" ||
                tokenExpirStorage === "[object Object]" ||
                tokenExpirStorage === "undefined"
                  ? (true,
                    localStorage.removeItem("user_id"),
                    localStorage.removeItem("token"),
                    localStorage.removeItem("token_expiry_time"))
                  :  //Date().toLocaleString() > tokenExpirStorage
                  new Date(Date().toLocaleString()) > new Date(tokenExpirStorage)
                  ? (true,
                    localStorage.removeItem("user_id"),
                    localStorage.removeItem("token"),
                    localStorage.removeItem("token_expiry_time"))
                  : 
                    false,
            }
          : 0),
      };
    // return tokenExpirStorage;
    default:
      return state;
  }
};

export default tokenExpiry;
