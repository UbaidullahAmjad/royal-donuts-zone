/* eslint-disable no-unused-vars */
import { TOKEN_EXPIRY_TIME } from "../../actionTypes";

const initialState = 0;

const tokenExpiry = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_EXPIRY_TIME:
      // token_expiry_time
      const PasswordRemember = localStorage.getItem("passwordremember");
      if (PasswordRemember && JSON.parse(PasswordRemember) == true) {
        localStorage.setItem("token_expiry_time", action.payload);
        const tokenExpirStorage = action.payload;
        console.warn("redux-token_expiry_time: " + tokenExpirStorage);
        return {
          ...(state !== 0
            ? {
              ...state,
              expire_time:
                tokenExpirStorage == undefined ||
                  tokenExpirStorage == null ||
                  tokenExpirStorage == "null" ||
                  tokenExpirStorage == "" ||
                  tokenExpirStorage == "[object Object]" ||
                  tokenExpirStorage == "undefined" ||
                  tokenExpirStorage == ".."
                  ? (true,
                    localStorage.removeItem("profileURL"),
                    localStorage.removeItem("Name"),
                    localStorage.removeItem("user_id"),
                    localStorage.removeItem("role"),
                    localStorage.removeItem("auth-token"),
                    localStorage.removeItem("permissions"),
                    localStorage.removeItem("token123"),
                    localStorage.removeItem("token_expiry_time"))
                  : // (window.location.href = `${process.env.PUBLIC_URL}/login`)
                  new Date(Date().toLocaleString()) > new Date(tokenExpirStorage)
                    ? (true,
                      localStorage.removeItem("profileURL"),
                      localStorage.removeItem("Name"),
                      localStorage.removeItem("user_id"),
                      localStorage.removeItem("role"),
                      localStorage.removeItem("auth-token"),
                      localStorage.removeItem("permissions"),
                      localStorage.removeItem("token123"),
                      localStorage.removeItem("token_expiry_time"))
                    : // <Redirect to={`${process.env.PUBLIC_URL}/login`} />
                    false,
            }
            : 0),
        };
      } else {
        return state;
      }
    // return tokenExpirStorage;
    default:
      return state;
  }
};

export default tokenExpiry;
