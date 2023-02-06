/* eslint-disable no-unused-vars */
import {  TOKEN_EXPIRY_TIME } from '../types'

export const isTokenExpiryTime = () => {
  return {
    type: TOKEN_EXPIRY_TIME,
    // payload: localStorage.setItem("token_expiry_time", expiryTime),
    payload: localStorage.getItem("token_expiry_time"),
  };
}
