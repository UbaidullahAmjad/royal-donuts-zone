/* eslint-disable no-unused-vars */
import {
  CHECKOUT_FORM_DATA,
  CHECKOUT_FORM_PUSHED_DATA,
  CHECKOUT_FORM_SUBMIT,
  CHECKOUT_FORM_SUBMIT_FORMDATA,
  CHECKOUT_FORM_USER_DATA,
  CHECKOUT_FORM_USER_DATA_CLEAR,
  CHECKOUT_FORM_SUBMITTED_DATA,
  CHECKOUT_FORM_STORE_DATA,
  CHECKOUT_GUEST_FORM_FILLED,
  CHECKOUT_FORM_DATA_CLEAR,
} from "../types";

export const checkoutFormUserData = (data) => {
  return (dispatch) => {
    dispatch({ type: CHECKOUT_FORM_USER_DATA, payload: data });
  };
};

export const checkoutFormUserData_Clear = () => {
  return (dispatch) => {
    dispatch({ type: CHECKOUT_FORM_USER_DATA_CLEAR, });
  };
};

export const checkoutFormFill = (data) => {
  const { name, value, type, checked } = data.target;
  return (dispatch) => {
    dispatch({
      type: CHECKOUT_FORM_DATA,
      payload: data,
    });
  };
};

export const checkoutFormFill_Clear = () => {
  return (dispatch) => {
    dispatch({ type: CHECKOUT_FORM_DATA_CLEAR, });
  };
};

export const checkoutFormStoreData = (data) => {
  return (dispatch) => {
    dispatch({ type: CHECKOUT_FORM_STORE_DATA, payload: data });
  };
};


export const checkoutFormPushData = (dataObject) => {
  return (dispatch) => {
    dispatch({
      type: CHECKOUT_FORM_PUSHED_DATA,
      payload: dataObject,
    });
  };
};

export const checkoutFormSubmit = (onSubmit, errors) => {
  return (dispatch) => {
    dispatch({
      type: CHECKOUT_FORM_SUBMIT,
      payload: onSubmit,
    });
  };
};

export const checkoutFormSubmit_FormData = (data) => {
  return (dispatch) => {
    dispatch({
      type: CHECKOUT_FORM_SUBMIT_FORMDATA,
      payload: data,
    });
  };
};

export const checkoutFormSubmittedData = (data) => {
  return (dispatch) => {
    dispatch({ type: CHECKOUT_FORM_SUBMITTED_DATA, payload: data });
  };
};
