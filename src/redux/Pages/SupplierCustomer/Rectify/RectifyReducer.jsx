/* eslint-disable no-unused-vars */
import {
    RECTIFY_ORDER_DATA,
    RECTIFY_ORDER_DELETE,
    RECTIFY_ORDER_DATA_CLEAR
} from "../../../actionTypes";

const initialState = {
    rectifyOrderList: [],
    loading: true,
    isError: false,
    errorMessage: null,
}

const RectifyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case RECTIFY_ORDER_DATA: {
            const rectifyList = payload.rectifyOrderList
            if (rectifyList.length > 0) {
                rectifyList.map(
                    (item, index) => (item["index"] = index + 1)
                );
            }
            return {
                ...state,
                rectifyOrderList: rectifyList,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case RECTIFY_ORDER_DELETE: {
            const deleted_order_product = [...state.rectifyOrderList];
            const find_order_array_index = deleted_order_product.findIndex(
                (item) => item.order.id == payload.row.order_id
            );
            if (deleted_order_product[find_order_array_index].order_items.length > 1) {
                const find_delete_cart_item = deleted_order_product[
                    find_order_array_index
                ].order_items.find((item) => item.id == payload.row.id);
                deleted_order_product[find_order_array_index].order.total =
                    deleted_order_product[find_order_array_index].order.total -
                    parseFloat(find_delete_cart_item.quantity) *
                    parseFloat(find_delete_cart_item.unit_price);
                deleted_order_product[find_order_array_index].order.grand_total =
                    deleted_order_product[find_order_array_index].order.grand_total -
                    parseFloat(find_delete_cart_item.quantity) *
                    parseFloat(find_delete_cart_item.unit_price);
                const delete_cart_item = deleted_order_product[
                    find_order_array_index
                ].order_items.filter((item) => item.id != payload.row.id);
                deleted_order_product[find_order_array_index].order_items =
                    delete_cart_item;
            } else {
                deleted_order_product.splice(find_order_array_index, 1);
            }
            return {
                ...state,
                rectifyOrderList: deleted_order_product,
            }
        }
        case RECTIFY_ORDER_DATA_CLEAR: {
            return initialState
        }
        default: {
            return state;
        }
    }
}

export default RectifyReducer;