/* eslint-disable no-unused-vars */
import {
    SUPPLIER_CUSTOMER_CART_DATA,
    SUPPLIER_CUSTOMER_CART_ITEM_DELETE,
    SUPPLIER_CUSTOMER_CART_DATA_CLEAR,
} from "../../../../actionTypes";

const initialState = {
    cartPageList: [],
    CartDeliveryCompany: null,
    loading: true,
    isError: false,
    errorMessage: null,
}

const SuppllierCustomerCartReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SUPPLIER_CUSTOMER_CART_DATA: {
            let allCarts = [];
            let delivery_company_duplication_state = null;
            if (payload.cartPageList != null) {
                allCarts = payload.cartPageList;
                allCarts.map((item, index) => (item["index"] = index + 1));

                const delivery_companies_id = allCarts.map(
                    (item) =>
                        item.delivery_company != null &&
                        item.delivery_company.delivery_company_id
                );
                delivery_company_duplication_state =
                    delivery_companies_id.map(
                        (item, index) => delivery_companies_id.indexOf(item) != index
                    );
            }
            return {
                ...state,
                cartPageList: allCarts,
                CartDeliveryCompany: delivery_company_duplication_state,
                loading: payload.loading,
                isError: payload.isError,
                errorMessage: payload.errorMessage,
            };
        }
        case SUPPLIER_CUSTOMER_CART_ITEM_DELETE: {
            const deleted_cart_product = state.cartPageList;
            const find_cart_array = deleted_cart_product.find(
                (item) => item.cart.id == payload.row.cart_id
            );
            const find_cart_array_index = deleted_cart_product.findIndex(
                (item) => item.cart.id == payload.row.cart_id
            );
            if (deleted_cart_product[find_cart_array_index].cart_items.length > 1) {
                const find_delete_cart_item = deleted_cart_product[
                    find_cart_array_index
                ].cart_items.find((item) => item.id == payload.row.id);
                deleted_cart_product[find_cart_array_index].cart.total =
                    deleted_cart_product[find_cart_array_index].cart.total -
                    parseFloat(find_delete_cart_item.quantity) *
                    parseFloat(find_delete_cart_item.unit_price);
                const delete_cart_item = deleted_cart_product[
                    find_cart_array_index
                ].cart_items.filter((item) => item.id != payload.row.id);
                deleted_cart_product[find_cart_array_index].cart_items = delete_cart_item;
            } else {
                deleted_cart_product.splice(find_cart_array_index, 1);
            }
            const delivery_companies_id = deleted_cart_product.map(
                (item) =>
                    item.delivery_company != null &&
                    item.delivery_company.delivery_company_id
            );
            const delivery_company_duplication_state = delivery_companies_id.map(
                (item, index) => delivery_companies_id.indexOf(item) != index
            );
            return {
                ...state,
                cartPageList: deleted_cart_product,
                CartDeliveryCompany: delivery_company_duplication_state,
            }
        }
        default: {
            return state;
        }
    }
}

export default SuppllierCustomerCartReducer;