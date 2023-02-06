/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env"

export const RemoveRectifyAction = async (order_id, product_id) => {
    let removeRectifyResponse = null;

    try {
        removeRectifyResponse = await axios
            .get(URL + `/removerectify/${order_id}/${product_id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            });
    }
    catch (error) {
        removeRectifyResponse = error.response;
    }

    return removeRectifyResponse;
};

