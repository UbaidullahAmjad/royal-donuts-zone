/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TOKEN_SET } from '../types'

const initialState = 0;

const tokenAvailable = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_SET:
      localStorage.setItem("token", action.payload);
      const tokenStorage = action.payload;
      return tokenStorage === undefined ||
        tokenStorage === null ||
        tokenStorage === "null" ||
        tokenStorage === "" ||
        tokenStorage === "[object Object]"
        ? false
        : true;
    // return {state, tokenStorage};
    default:
      return state;
  }
};

export default tokenAvailable;
