/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../../env"

export const ConfirmRectifyOrderAction = async (user_id, order_id, CommentData) => {
    let confirmRectifyOrderResponse = null;

    try {
        confirmRectifyOrderResponse = await axios
            .get(URL + `/confirm_rectify_orders`, {
                params: { user_id: user_id, order_id: order_id, message: CommentData },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token123"),
                },
            });
    }
    catch (error) {
        confirmRectifyOrderResponse = error.response;
    }

    return confirmRectifyOrderResponse;
};

