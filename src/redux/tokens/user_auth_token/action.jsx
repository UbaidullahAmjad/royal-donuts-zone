/* eslint-disable no-unused-vars */
import { USER_AUTH_TOKEN } from "../../actionTypes";

export const User_Auth_Token = (user_token) => {
  console.log("ACTION USER TOKEN --- ", user_token);
  return {
    type: USER_AUTH_TOKEN,
    // payload: localStorage.setItem("token123", token),
    payload: user_token,
  };
};
