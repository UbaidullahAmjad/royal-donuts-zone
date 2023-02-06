/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TOKEN_SET } from "../../actionTypes";

const initialState = 0;

const tokenAvailable = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_SET:
      // return localStorage.setItem("token", action.payload) !== null
      //   ? true
      //   : false;
      localStorage.setItem("token123", action.payload);
      const tokenStorage = action.payload;
      // console.warn("redux-token123: " + tokenStorage);
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
