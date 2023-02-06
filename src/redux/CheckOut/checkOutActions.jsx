import axios from "axios";
import { URL } from "../../env";
import * as actionTypes from "../types";


export const getSummary = () => {
  return async (dispatch) => {
    await axios.get(`${URL}/eccom_cart`)
      .then((res) => {
        dispatch({
          type: actionTypes.GUEST_SUMMARY,
          data: res.data
        })
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GUEST_SUMMARY,
          error: error
        })
      })  
  }
}

export const Loading = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
  }
}

export const getDeliveryMethod = (method) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_DELIVERY_METHOD,
      data: method
    });
  }
}

export const getCouponData = (params) => {
  return async (dispatch) => {
    await axios.get(`${URL}/checkcoupon`,
      { params: { id: params.id, coupon: params.coupon } })
      .then((response) => {
        dispatch({
          type: actionTypes.GET_COUPON,
          data: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_COUPON,
          error: error
        })
      })

  }
}

export const applyCoupon = (params) => async (dispatch) => {
  dispatch({
    type: actionTypes.APPLY_COUPON,
  })
}

export const close = (params) => async (dispatch) => {
  dispatch({
    type: actionTypes.CLOSE_NOTIFICATION,
  })
}

export const setDiscountValue = (value) => async (dispatch) => {
  dispatch({
    type: actionTypes.DISCOUNT_SET,
    data: value
  })
}

export const setHandleValues = (name, value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HANDLE_VALUES,
      name: name,
      value: value
    })
  }
}
export const setHandleChecked = (value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HANDLE_CHECKED,
      data: value
    })
  }
}



