/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../../env"
import { useDispatch } from "react-redux";
import { SupplierCustomerCartTotal } from "../../../../supplier_customer/actions"

export const SuppllierCustomer_CartItemRemoveAction = async (cart_id, product_id) => {
    let cartItemRemoveResponse = null;

    try {
        cartItemRemoveResponse = await axios
            .get(URL + `/cart/item/remove/${cart_id}/${product_id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            });
        // getSupplierCustomerCartTotalAction()
    }
    catch (error) {
        cartItemRemoveResponse = error.response;
    }

    return cartItemRemoveResponse;
};

export const getSupplierCustomerCartTotalAction = async () => {
    let cartLength = null;
    try {
        cartLength = await axios
            .get(URL + "/cart", {
                params: {
                    user_id: atob(localStorage.getItem("user_id"))
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            });
    }
    catch (error) {
        cartLength = error.response;
    }

    return cartLength;
}

