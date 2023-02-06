import * as actionTypes from "../actionTypes";

const initialState = {
  user_role: null,
  user_permission: null,
};

const LoginUserData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.user_role_permission: {
      console.log("PAYLOADDDD", action.payload);
      //   throw new Error("HERE WE STOP");
      return {
        ...state,
        user_role: action.payload.data.role,
        user_permission: action.payload.data.permissions,
      };
    }
    default:
      return state;
  }
};

export default LoginUserData;
