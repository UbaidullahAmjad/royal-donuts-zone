import { ADD_CART_ITEM, INCREMENT_ITEM_QUANTITY, DECREMENT_ITEM_QUANTITY, REMOVE_CART_ITEM, DELETE_TOTAL_CART } from '../types'

export const addItemToCart = (formData) => {
    return (dispatch) => {
        dispatch({
            type: ADD_CART_ITEM,
            payload: formData
        })
    }
}

export const incrementItemQuantity = (formData) => {
    return (dispatch) => {
        dispatch({
            type: INCREMENT_ITEM_QUANTITY,
            payload: formData
        })
    }
}

export const decrementItemQuantity = (formData) => {
    return (dispatch) => {
        dispatch({
            type: DECREMENT_ITEM_QUANTITY,
            payload: formData
        })
    }
}

export const removeItemFromCart = (id) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id
        })
    }
}

export const deleteFullCart = () => {
    return (dispatch) => {
        dispatch({
            type: DELETE_TOTAL_CART,
        })
    }
}



