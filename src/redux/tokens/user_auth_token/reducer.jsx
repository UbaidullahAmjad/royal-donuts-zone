import { USER_AUTH_TOKEN } from "../../actionTypes";

const initialState = {
  store_user_token: null,
};

const AUTH_USER_TOKEN = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH_TOKEN: {
      console.log("REDUCER USER TOKEN --- ", action.payload);
      return {
        ...state,
        store_user_token: action.payload,
      };
    }
    default:
      return state;
  }
};

export default AUTH_USER_TOKEN;
