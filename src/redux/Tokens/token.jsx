/* eslint-disable no-unused-vars */
import { TOKEN_SET } from '../types';

export const isTokenAvailable = () => {
  return {
    type: TOKEN_SET,
    // payload: localStorage.setItem("token", token),
    payload: localStorage.getItem("token"),
  };
};
