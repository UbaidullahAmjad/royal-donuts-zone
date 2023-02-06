/* eslint-disable no-unused-vars */
import {
    SUPPLIER_ORDER_TOKEN_VERIFICATION,
    SUPPLIER_ORDER_ITEM_MODIFY,
    SUPPLIER_ORDER_ITEM_REMOVE,
    SUPPLIER_ORDER_TOKEN_VERIFICATION_CLEAR
} from "../../../../actionTypes";


const initialState = {
    SupplierOrderVerificationData: null,
    order: null,
    order_items: null,
    user: null,
    store: null,
    timeline: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SupplierOrderModifiyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SUPPLIER_ORDER_TOKEN_VERIFICATION: {
            const orderData = payload.SupplierOrderVerificationData?.order ?? null
            const orderItemsData = payload.SupplierOrderVerificationData?.order_items ?? null
            const userData = payload.SupplierOrderVerificationData?.user ?? null
            const storeData = payload.SupplierOrderVerificationData?.store ?? null
            const timelineData = payload.SupplierOrderVerificationData?.order ?? null

            return {
                ...state,
                SupplierOrderVerificationData: payload.SupplierOrderVerificationData,
                order: orderData,
                order_items: orderItemsData,
                user: userData,
                store: storeData,
                timeline: timelineData,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case SUPPLIER_ORDER_ITEM_MODIFY: {
            let new_order_items = state.order_items;
            new_order_items = new_order_items.map((item) => item.id == payload.cur_order_id ? { ...item, quantity: item.quantity - 1 } : { ...item })
            return {
                ...state,
                order_items: new_order_items,
            }
        }
        case SUPPLIER_ORDER_ITEM_REMOVE: {
            let removed_order_items = state.order_items;
            // removed_order_items = removed_order_items.filter((item) => item.id != payload.cur_order_id)
            removed_order_items = removed_order_items.map((item) => item.id == payload.cur_order_id ? { ...item, quantity: 0 } : { ...item })
            return {
                ...state,
                order_items: removed_order_items,
            }
        }
        default: {
            return state;
        }
    }
}

export default SupplierOrderModifiyReducer;